import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
	const FORUM_URL = env.FLARUM_URL || 'https://ndz.ng';
	const OAUTH_CLIENT_ID = env.OAUTH_CLIENT_ID;
	const OAUTH_REDIRECT_URI = env.OAUTH_REDIRECT_URI || 'https://dev.ndz.ng/auth/callback';
	
	if (!OAUTH_CLIENT_ID) {
		throw new Error('OAUTH_CLIENT_ID not configured');
	}
	
	const returnTo = url.searchParams.get('return') || '/';
	
	const params = new URLSearchParams({
		client_id: OAUTH_CLIENT_ID,
		redirect_uri: OAUTH_REDIRECT_URI,
		response_type: 'code',
		scope: '',
		state: returnTo
	});
	
	throw redirect(302, `${FORUM_URL}/oauth/authorize?${params}`);
};

