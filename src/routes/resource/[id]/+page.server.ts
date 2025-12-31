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
			// This is critical - server fetch needs explicit cookie header
			const cookieHeader = request.headers.get('cookie') || '';
			
			const response = await fetch(`${FLARUM_URL}/api`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json'
				}
				// Don't use credentials: 'include' in server-side fetch - it's ignored
			});

			// Explicitly check response status - treat non-200 as not authenticated
			if (response.ok) {
				const data = await response.json();
				
				// Check for valid user data
				if (data.data && data.data.id && data.data.attributes && data.data.attributes.username) {
					user = {
						id: data.data.id,
						username: data.data.attributes.username,
						displayName: data.data.attributes.displayName || data.data.attributes.username,
						email: data.data.attributes.email,
						avatarUrl: data.data.attributes.avatarUrl
					};
				}
			} else {
				// Non-200 response means not authenticated
				console.log('Flarum API returned:', response.status, response.statusText);
			}
		} catch (err) {
			// User not logged in or error - that's fine, page is still accessible
			console.error('Flarum auth check error:', err);
		}
	}
	
	return {
		resource,
		category,
		user
	};
};

