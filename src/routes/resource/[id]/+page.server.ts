import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, cookies, fetch, request }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check if user is logged in by checking session cookie and verifying with Flarum API
	let user = null;
	const sessionCookie = cookies.get('flarum_session');
	
	if (sessionCookie) {
		try {
			const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
			
			// Forward ALL cookies from the browser request to Flarum
			const cookieHeader = request.headers.get('cookie') || '';
			
			console.log('[AUTH] Cookie header length:', cookieHeader.length);
			console.log('[AUTH] Has flarum_session:', cookieHeader.includes('flarum_session'));
			
			const response = await fetch(`${FLARUM_URL}/api`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json'
				}
			});

			console.log('[AUTH] Flarum API response status:', response.status);

			if (response.ok) {
				const data = await response.json();
				console.log('[AUTH] Response has data:', !!data.data);
				
				if (data.data && data.data.id && data.data.attributes && data.data.attributes.username) {
					user = {
						id: data.data.id,
						username: data.data.attributes.username,
						displayName: data.data.attributes.displayName || data.data.attributes.username,
						email: data.data.attributes.email,
						avatarUrl: data.data.attributes.avatarUrl
					};
					console.log('[AUTH] User authenticated:', user.username);
				} else {
					console.log('[AUTH] No valid user data. Data structure:', JSON.stringify(data).substring(0, 300));
				}
			} else {
				const text = await response.text();
				console.log('[AUTH] Flarum API error:', response.status, text.substring(0, 200));
			}
		} catch (err) {
			console.error('[AUTH] Error:', err);
		}
	} else {
		console.log('[AUTH] No session cookie found');
	}
	
	return {
		resource,
		category,
		user
	};
};

