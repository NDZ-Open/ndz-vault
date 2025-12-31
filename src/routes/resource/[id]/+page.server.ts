import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check if user is logged in by calling Flarum API directly
	let user = null;
	const sessionCookie = cookies.get('flarum_session');
	const rememberCookie = cookies.get('flarum_remember');
	
	// Debug: log cookie status
	console.log('Session cookie present:', !!sessionCookie);
	console.log('Remember cookie present:', !!rememberCookie);
	
	if (sessionCookie) {
		try {
			const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
			const cookieHeader = `flarum_session=${sessionCookie}${rememberCookie ? `; flarum_remember=${rememberCookie}` : ''}`;
			
			console.log('Calling Flarum API:', `${FLARUM_URL}/api`);
			
			const response = await fetch(`${FLARUM_URL}/api`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json'
				},
				credentials: 'include'
			});

			console.log('Flarum API response status:', response.status);

			if (response.ok) {
				const data = await response.json();
				console.log('Flarum API data:', data);
				
				if (data.data && data.data.id) {
					user = {
						id: data.data.id,
						username: data.data.attributes.username,
						displayName: data.data.attributes.displayName,
						email: data.data.attributes.email,
						avatarUrl: data.data.attributes.avatarUrl
					};
					console.log('User authenticated:', user.displayName);
				} else {
					console.log('No user data in response');
				}
			} else {
				console.log('Flarum API returned error:', response.status, response.statusText);
			}
		} catch (err) {
			// User not logged in, that's fine - page is still accessible
			console.error('Authentication error:', err);
		}
	} else {
		console.log('No session cookie found');
	}
	
	return {
		resource,
		category,
		user
	};
};

