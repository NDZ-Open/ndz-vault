import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check if user is logged in by checking session cookie and verifying with Flarum API
	let user = null;
	const sessionCookie = cookies.get('flarum_session');
	const rememberCookie = cookies.get('flarum_remember');
	
	if (sessionCookie) {
		try {
			const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
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
				
				if (data.data && data.data.id && data.data.attributes && data.data.attributes.username) {
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
			// User not logged in, that's fine - page is still accessible
		}
	}
	
	return {
		resource,
		category,
		user
	};
};

