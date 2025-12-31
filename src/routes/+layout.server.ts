import type { LayoutServerLoad } from './$types';
import { getUser } from '$lib/server/auth';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');
	const user = token ? await getUser(token) : null;
	
	return { user };
};

