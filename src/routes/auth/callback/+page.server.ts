import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

// Get current host dynamically (works for both localhost and production)
function getVaultUrl(request: Request): string {
	const url = new URL(request.url);
	return `${url.protocol}//${url.host}`;
}

export const load: PageServerLoad = async ({ url, cookies, fetch, request }) => {
	// Get environment variables at runtime (not inlined at build time)
	const FORUM_URL = env.FLARUM_URL || 'https://ndz.ng';
	
	// Get current vault URL dynamically
	const VAULT_URL = getVaultUrl(request);
	
	// Get the return URL from query params or default to home
	const returnTo = url.searchParams.get('return') || url.searchParams.get('redirect') || '/';
	const returnUrl = `${VAULT_URL}${returnTo}`;
	
	// Check if we have a session cookie
	const sessionCookie = cookies.get('flarum_session');
	
	// If no session cookie, redirect to Flarum login
	if (!sessionCookie) {
		const callbackUrl = `${VAULT_URL}/auth/callback?return=${encodeURIComponent(returnTo)}`;
		throw redirect(302, `${FORUM_URL}/login?return=${encodeURIComponent(callbackUrl)}`);
	}

	// Verify the session is valid by checking Flarum API
	try {
		// Forward ALL cookies from the browser request to Flarum
		const cookieHeader = request.headers.get('cookie') || '';
		
		const response = await fetch(`${FORUM_URL}/api`, {
			headers: {
				'Cookie': cookieHeader,
				'Accept': 'application/json'
			}
		});

		if (!response.ok) {
			// Invalid session, redirect to login
			const callbackUrl = `${VAULT_URL}/auth/callback?return=${encodeURIComponent(returnTo)}`;
			throw redirect(302, `${FORUM_URL}/login?return=${encodeURIComponent(callbackUrl)}`);
		}
		
		// Session is valid - redirect to the requested page
		throw redirect(302, returnTo);
	} catch (err) {
		// If it's already a redirect, re-throw it
		if (err instanceof Response && err.status === 302) {
			throw err;
		}
		
		// If verification fails, redirect to login
		const callbackUrl = `${VAULT_URL}/auth/callback?return=${encodeURIComponent(returnTo)}`;
		throw redirect(302, `${FORUM_URL}/login?return=${encodeURIComponent(callbackUrl)}`);
	}
};
