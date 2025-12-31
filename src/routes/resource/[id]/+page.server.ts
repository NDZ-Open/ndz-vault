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
				// STRICT: Only authenticate if we have a valid user with ID > 0 AND username exists
				// Anonymous/guest users typically have ID 0, 1, or no username
				const userData = data.data;
				
				if (
					userData && 
					userData.id && 
					typeof userData.id === 'number' &&
					userData.id > 1 && // Most forums use ID 1 for admin, so > 1 is safer
					userData.attributes && 
					userData.attributes.username &&
					userData.attributes.username.trim() !== '' &&
					userData.attributes.username !== 'Guest' &&
					userData.attributes.username !== 'Anonymous'
				) {
					user = {
						id: userData.id,
						username: userData.attributes.username,
						displayName: userData.attributes.displayName || userData.attributes.username,
						email: userData.attributes.email,
						avatarUrl: userData.attributes.avatarUrl
					};
				}
				// If conditions not met, user stays null
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
