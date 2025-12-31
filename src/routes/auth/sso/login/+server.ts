import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import jwt from 'jsonwebtoken';

const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
const JWT_SECRET = import.meta.env.JWT_SECRET || '0a4533bf6076eeb08c9f73b30f3d3c04b0bc4278b35f88b1fb48112a3b04e931';
// JWT_ISSUER should be the domain that issues the token (dev.ndz.ng), not the consumer (ndz.ng)
const JWT_ISSUER = import.meta.env.JWT_ISSUER || 'https://dev.ndz.ng';

export const GET: RequestHandler = async ({ url, cookies, fetch, request }) => {
	// Get return URL from Flarum (where to redirect after SSO completes)
	const returnUrl = url.searchParams.get('return') || `${FLARUM_URL}/`;
	
	// When Flarum redirects here for SSO, we need to check if user has a valid Flarum session
	// The session cookie might be from ndz.ng (if domain is set to .ndz.ng)
	const sessionCookie = cookies.get('flarum_session');
	
	// Try to get user info from Flarum API
	// This will work if:
	// 1. User has a valid Flarum session cookie (from ndz.ng, accessible if domain is .ndz.ng)
	// 2. OR Flarum passes some auth info in the request
	let userData = null;
	
	if (sessionCookie) {
		try {
			// Try to validate the session with Flarum
			const cookieHeader = request.headers.get('cookie') || '';
			
			const response = await fetch(`${FLARUM_URL}/api`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();
				userData = data.data;
			}
		} catch (err) {
			// Session validation failed, continue to check for other auth methods
		}
	}

	// If we don't have user data, user needs to log in on Flarum first
	if (!userData || !userData.id) {
		// Redirect to Flarum login, then back here
		const vaultUrl = new URL(request.url).origin;
		const ssoReturnUrl = `${vaultUrl}/auth/sso/login?return=${encodeURIComponent(returnUrl)}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(ssoReturnUrl)}`);
	}

	// Validate user is actually authenticated (not a guest)
	const username = userData?.attributes?.username?.trim() || '';
	const email = userData?.attributes?.email?.trim() || '';
	const userId = userData.id;

	if (!userId || userId <= 1 || !username || !email || !email.includes('@')) {
		// Not a valid authenticated user - redirect to login
		const vaultUrl = new URL(request.url).origin;
		const ssoReturnUrl = `${vaultUrl}/auth/sso/login?return=${encodeURIComponent(returnUrl)}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(ssoReturnUrl)}`);
	}

	// Generate JWT token with user information for Flarum SSO
	// Use the current origin as issuer (dev.ndz.ng) since that's where we're generating the token
	const currentOrigin = new URL(request.url).origin;
	const tokenPayload = {
		iat: Math.floor(Date.now() / 1000), // Issued at
		exp: Math.floor(Date.now() / 1000) + 300, // Expires in 5 minutes
		iss: JWT_ISSUER || currentOrigin, // Issuer (should be dev.ndz.ng)
		sub: userId.toString(), // Subject (user ID)
		username: username,
		email: email,
		displayName: userData.attributes.displayName || username,
		avatarUrl: userData.attributes.avatarUrl || null
	};

	// Sign JWT with SHA256 (HS256 algorithm)
	const token = jwt.sign(tokenPayload, JWT_SECRET, {
		algorithm: 'HS256'
	});

	// Redirect back to Flarum with the JWT token
	// Flarum SSO extension will validate the token and set cookies with domain .ndz.ng
	// This allows both ndz.ng and dev.ndz.ng to access the session
	const redirectUrl = new URL(returnUrl);
	redirectUrl.searchParams.set('token', token);
	
	throw redirect(302, redirectUrl.toString());
};

