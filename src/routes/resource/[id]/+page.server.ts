import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, locals }) => {
	// Step 4: Check page locals user
	console.log('🟢 PAGE LOCALS USER:', locals.user ? `✅ ${locals.user.username}` : '❌ null');
	
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// User is already validated in hooks.server.ts
	const user = locals.user;
	
	return {
		resource,
		category,
		user
	};
};
