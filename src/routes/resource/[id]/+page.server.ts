import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';
import { getUser } from '$lib/server/auth';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check for OAuth access token
	const token = cookies.get('access_token');
	const user = token ? await getUser(token) : null;
	
	return {
		resource,
		category,
		user: user ? { authenticated: true, ...user } : null,
		isAuthenticated: !!user
	};
};
