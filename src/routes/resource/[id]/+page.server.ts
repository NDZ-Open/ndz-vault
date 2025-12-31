import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';
import { verifyToken } from '$lib/server/auth';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check for auth token
	const token = cookies.get('auth_token');
	const user = token ? verifyToken(token) : null;
	
	return {
		resource,
		category,
		user,
		isAuthenticated: !!user
	};
};
