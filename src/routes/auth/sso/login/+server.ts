import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import jwt from 'jsonwebtoken';

const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
const JWT_SECRET = import.meta.env.JWT_SECRET || '0a4533bf6076eeb08c9f73b30f3d3c04b0bc4278b35f88b1fb48112a3b04e931';
const JWT_ISSUER = import.meta.env.JWT_ISSUER || 'https://ndz.ng';

export const GET: RequestHandler = async ({ url, cookies, fetch, request }) => {
	// Get return URL from Flarum (where to redirect after SSO)
	const returnUrl = url.searchParams.get('return') || `${FLARUM_URL}/`;
	
	// Check if user is already authenticated on dev.ndz.ng (has Flarum session)
	const sessionCookie = cookies.get('flarum_session');
	
	if (!sessionCookie) {
		// User not authenticated - redirect to Flarum login first
		// After they log in on Flarum, they'll be redirected back here
		const vaultUrl = new URL(request.url).origin;
		const ssoReturnUrl = `${vaultUrl}/auth/sso/login?return=${encodeURIComponent(returnUrl)}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(ssoReturnUrl)}`);
	}

	try {
		// Get user info from Flarum API using the session cookie
		const cookieHeader = request.headers.get('cookie') || '';
		
		const response = await fetch(`${FLARUM_URL}/api`, {
			headers: {
				'Cookie': cookieHeader,
				'Accept': 'application/json'
			}
		});

		if (!response.ok) {
			// Invalid session - redirect to Flarum login
			const vaultUrl = new URL(request.url).origin;
			const ssoReturnUrl = `${vaultUrl}/auth/sso/login?return=${encodeURIComponent(returnUrl)}`;
			throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(ssoReturnUrl)}`);
		}

		const data = await response.json();
		const userData = data.data;

		if (!userData || !userData.id) {
			throw error(401, 'No user data');
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

		// Generate JWT token with user information
		const tokenPayload = {
			iat: Math.floor(Date.now() / 1000), // Issued at
			exp: Math.floor(Date.now() / 1000) + 300, // Expires in 5 minutes
			iss: JWT_ISSUER, // Issuer
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
		// Flarum SSO extension will validate the token and create a session
		const redirectUrl = new URL(returnUrl);
		redirectUrl.searchParams.set('token', token);
		
		throw redirect(302, redirectUrl.toString());
	} catch (err) {
		// If it's already a redirect, re-throw it
		if (err instanceof Response && err.status === 302) {
			throw err;
		}
		
		// Otherwise, redirect to Flarum login
		const vaultUrl = new URL(request.url).origin;
		const ssoReturnUrl = `${vaultUrl}/auth/sso/login?return=${encodeURIComponent(returnUrl)}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(ssoReturnUrl)}`);
	}
};

