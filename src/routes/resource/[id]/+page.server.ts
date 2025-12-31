import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, locals, url }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Simple check: if cookie exists, user is authenticated
	const isAuthenticated = !!locals.user;
	
	// Check if we just came from Flarum (has return parameter)
	// This helps prevent redirect loops
	const fromFlarum = url.searchParams.has('return') || url.searchParams.has('token');
	
	return {
		resource,
		category,
		user: isAuthenticated ? { authenticated: true } : null,
		fromFlarum
	};
};
