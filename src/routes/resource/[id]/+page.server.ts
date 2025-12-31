import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, cookies, fetch, request }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Simple auth check: cookie exists AND Flarum API returns valid user
	let user = null;
	const sessionCookie = cookies.get('flarum_session');
	
	if (sessionCookie) {
		try {
			const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
			const cookieHeader = request.headers.get('cookie') || '';
			
			const response = await fetch(`${FLARUM_URL}/api`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();
				
				// Flarum returns user in data.data when authenticated
				// Anonymous users have ID 0 or negative, authenticated users have ID > 0
				if (data.data && data.data.id && data.data.id > 0 && data.data.attributes && data.data.attributes.username) {
					user = {
						id: data.data.id,
						username: data.data.attributes.username,
						displayName: data.data.attributes.displayName || data.data.attributes.username,
						email: data.data.attributes.email,
						avatarUrl: data.data.attributes.avatarUrl
					};
				}
			}
		} catch (err) {
			// Fail silently - user stays null
		}
	}
	
	return {
		resource,
		category,
		user
	};
};
