import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, locals }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Simple check: if cookie exists, user is authenticated
	const isAuthenticated = !!locals.user;
	
	return {
		resource,
		category,
		user: isAuthenticated ? { authenticated: true } : null
	};
};
