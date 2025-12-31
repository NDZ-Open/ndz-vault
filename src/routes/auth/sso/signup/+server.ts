import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import jwt from 'jsonwebtoken';

const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
const JWT_SECRET = import.meta.env.JWT_SECRET || '0a4533bf6076eeb08c9f73b30f3d3c04b0bc4278b35f88b1fb48112a3b04e931';
const JWT_ISSUER = import.meta.env.JWT_ISSUER || 'https://ndz.ng';

export const GET: RequestHandler = async ({ url, cookies, fetch, request }) => {
	// Get return URL from Flarum (where to redirect after SSO completes)
	const returnUrl = url.searchParams.get('return') || `${FLARUM_URL}/`;
	
	// When Flarum redirects here for SSO signup, check if user has a valid Flarum session
	const sessionCookie = cookies.get('flarum_session');
	
	// Try to get user info from Flarum API
	let userData = null;
	
	if (sessionCookie) {
		try {
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
			// Session validation failed
		}
	}

	// If we don't have user data, user needs to sign up on Flarum first
	if (!userData || !userData.id) {
		const vaultUrl = new URL(request.url).origin;
		const ssoReturnUrl = `${vaultUrl}/auth/sso/signup?return=${encodeURIComponent(returnUrl)}`;
		throw redirect(302, `${FLARUM_URL}/register?return=${encodeURIComponent(ssoReturnUrl)}`);
	}

	// Validate user is actually authenticated (not a guest)
	const username = userData?.attributes?.username?.trim() || '';
	const email = userData?.attributes?.email?.trim() || '';
	const userId = userData.id;

	if (!userId || userId <= 1 || !username || !email || !email.includes('@')) {
		const vaultUrl = new URL(request.url).origin;
		const ssoReturnUrl = `${vaultUrl}/auth/sso/signup?return=${encodeURIComponent(returnUrl)}`;
		throw redirect(302, `${FLARUM_URL}/register?return=${encodeURIComponent(ssoReturnUrl)}`);
	}

	// Generate JWT token with user information for Flarum SSO
	const tokenPayload = {
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + 300,
		iss: JWT_ISSUER,
		sub: userId.toString(),
		username: username,
		email: email,
		displayName: userData.attributes.displayName || username,
		avatarUrl: userData.attributes.avatarUrl || null
	};

	const token = jwt.sign(tokenPayload, JWT_SECRET, {
		algorithm: 'HS256'
	});

	// Redirect back to Flarum with the JWT token
	const redirectUrl = new URL(returnUrl);
	redirectUrl.searchParams.set('token', token);
	
	throw redirect(302, redirectUrl.toString());
};

