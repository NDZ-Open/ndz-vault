import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';

// Get current host dynamically (works for both localhost and production)
function getVaultUrl(request: Request): string {
	const url = new URL(request.url);
	return `${url.protocol}//${url.host}`;
}

export const load: LayoutServerLoad = async ({ cookies, fetch, url, request }) => {
	// Get current vault URL dynamically
	const VAULT_URL = getVaultUrl(request);
	
	const sessionCookie = cookies.get('flarum_session');
	const rememberCookie = cookies.get('flarum_remember');
	
	if (!sessionCookie) {
		const returnUrl = `${VAULT_URL}${url.pathname}${url.search}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
	}

	try {
		// Forward ALL cookies from the browser request to Flarum
		// This is critical - server fetch needs explicit cookie header
		const cookieHeader = request.headers.get('cookie') || '';
		
		const response = await fetch(`${FLARUM_URL}/api`, {
			headers: {
				'Cookie': cookieHeader,
				'Accept': 'application/json'
			}
			// Don't use credentials: 'include' in server-side fetch - it's ignored
		});

		if (!response.ok) {
			throw error(401, 'Invalid session');
		}

		const data = await response.json();
		
		if (!data.data || !data.data.id) {
			throw error(401, 'No user data');
		}

		return {
			user: {
				id: data.data.id,
				username: data.data.attributes.username,
				displayName: data.data.attributes.displayName,
				email: data.data.attributes.email,
				avatarUrl: data.data.attributes.avatarUrl
			}
		};
		
	} catch (err) {
		const returnUrl = `${VAULT_URL}${url.pathname}${url.search}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
	}
};

