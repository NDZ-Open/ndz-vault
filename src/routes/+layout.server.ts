import type { LayoutServerLoad } from './$types';
import { verifyToken } from '$lib/server/auth';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('auth_token');
	const user = token ? verifyToken(token) : null;
	
	return { user };
};

