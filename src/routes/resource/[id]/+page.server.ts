import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, locals }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// User is already validated in hooks.server.ts
	// Just use it directly - no need to check again
	const user = locals.user;
	
	return {
		resource,
		category,
		user
	};
};
