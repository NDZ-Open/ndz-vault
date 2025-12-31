import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check if user is logged in by checking for session cookie
	// Simple: if cookie exists, user is logged in
	const sessionCookie = cookies.get('flarum_session');
	const user = sessionCookie ? { authenticated: true } : null;
	
	return {
		resource,
		category,
		user
	};
};

