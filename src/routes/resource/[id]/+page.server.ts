import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, cookies, fetch, request, url, setHeaders }) => {
	// Prevent caching - ensure authentication is checked on every request
	setHeaders({
		'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
		'Pragma': 'no-cache',
		'Expires': '0'
	});
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check if user is logged in - REQUIRED to access resources
	const sessionCookie = cookies.get('flarum_session');
	const rememberCookie = cookies.get('flarum_remember');
	const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
	
	// Get current vault URL dynamically
	function getVaultUrl(): string {
		const urlObj = new URL(request.url);
		return `${urlObj.protocol}//${urlObj.host}`;
	}
	const VAULT_URL = getVaultUrl();
	
	if (!sessionCookie) {
		// Not logged in - redirect to Flarum login
		const returnUrl = `${VAULT_URL}${url.pathname}${url.search}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
	}
	
	// Verify session with Flarum API
	let user = null;
	try {
		const cookieHeader = `flarum_session=${sessionCookie}${rememberCookie ? `; flarum_remember=${rememberCookie}` : ''}`;
		const response = await fetch(`${FLARUM_URL}/api`, {
			headers: {
				'Cookie': cookieHeader,
				'Accept': 'application/json'
			},
			credentials: 'include'
		});

		if (response.ok) {
			const data = await response.json();
			
			// Strictly check if we got valid user data
			// When logged out, Flarum API might return empty data or different structure
			if (data.data && data.data.id && data.data.attributes && data.data.attributes.username) {
				user = {
					id: data.data.id,
					username: data.data.attributes.username,
					displayName: data.data.attributes.displayName || data.data.attributes.username,
					email: data.data.attributes.email,
					avatarUrl: data.data.attributes.avatarUrl
				};
			} else {
				// No valid user data - session is invalid (user logged out)
				const returnUrl = `${VAULT_URL}${url.pathname}${url.search}`;
				throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
			}
		} else {
			// API returned error (401, 403, etc.) - session is invalid
			const returnUrl = `${VAULT_URL}${url.pathname}${url.search}`;
			throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
		}
	} catch (err) {
		// If it's a redirect, re-throw it
		if (err && typeof err === 'object' && 'status' in err && err.status === 302) {
			throw err;
		}
		// Other errors - redirect to login
		const returnUrl = `${VAULT_URL}${url.pathname}${url.search}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
	}
	
	// User must be authenticated to reach here
	if (!user) {
		const returnUrl = `${VAULT_URL}${url.pathname}${url.search}`;
		throw redirect(302, `${FLARUM_URL}/login?return=${encodeURIComponent(returnUrl)}`);
	}
	
	return {
		resource,
		category,
		user
	};
};

