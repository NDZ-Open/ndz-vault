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
	const FLARUM_URL = env.FLARUM_URL || 'https://ndz.ng';
	
	// Get current vault URL dynamically
	const VAULT_URL = getVaultUrl(request);
	
	// Check if we have a session cookie
	const sessionCookie = cookies.get('flarum_session');
	const rememberCookie = cookies.get('flarum_remember');
	
	// If no session, redirect to Flarum login
	if (!sessionCookie) {
		// Get the return URL from query params or default to home
		const returnTo = url.searchParams.get('return') || url.searchParams.get('redirect') || '/';
		const returnUrl = `${VAULT_URL}${returnTo}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
	}

	// Verify the session is valid by checking Flarum API
	try {
		// Forward ALL cookies from the browser request to Flarum
		const cookieHeader = request.headers.get('cookie') || '';
		
		const response = await fetch(`${FLARUM_URL}/api`, {
			headers: {
				'Cookie': cookieHeader,
				'Accept': 'application/json'
			}
		});

		if (!response.ok) {
			// Invalid session, redirect to login
			const returnTo = url.searchParams.get('return') || url.searchParams.get('redirect') || '/';
			const returnUrl = `${VAULT_URL}${returnTo}`;
			throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
		}
	} catch (err) {
		// If verification fails, redirect to login
		const returnTo = url.searchParams.get('return') || url.searchParams.get('redirect') || '/';
		const returnUrl = `${VAULT_URL}${returnTo}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
	}

	// If we have a valid session, redirect to the requested page or home
	const returnTo = url.searchParams.get('return') || url.searchParams.get('redirect') || '/';
	throw redirect(302, returnTo);
};
