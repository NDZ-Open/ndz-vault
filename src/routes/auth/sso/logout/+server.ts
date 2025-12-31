import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url, cookies }) => {
	// Get environment variables at runtime (not inlined at build time)
	const FLARUM_URL = env.FLARUM_URL || 'https://ndz.ng';
	
	// Get return URL from Flarum (where to redirect after logout)
	const returnUrl = url.searchParams.get('return') || `${FLARUM_URL}/`;
	
	// Clear Flarum session cookies
	cookies.delete('flarum_session', { path: '/' });
	cookies.delete('flarum_remember', { path: '/' });
	
	// Redirect to Flarum logout, which will handle the full logout process
	// Flarum will then redirect back to the return URL
	const logoutUrl = new URL(`${FLARUM_URL}/logout`);
	logoutUrl.searchParams.set('return', returnUrl);
	
	throw redirect(302, logoutUrl.toString());
};

