import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const FORUM_URL = env.FLARUM_URL || 'https://ndz.ng';
	const OAUTH_CLIENT_ID = env.OAUTH_CLIENT_ID;
	const OAUTH_CLIENT_SECRET = env.OAUTH_CLIENT_SECRET;
	const OAUTH_REDIRECT_URI = env.OAUTH_REDIRECT_URI || 'https://dev.ndz.ng/auth/callback';
	
	if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET) {
		throw error(500, 'OAuth not configured');
	}
	
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state') || '/';
	
	if (!code) {
		throw error(400, 'No authorization code');
	}

	try {
		const tokenRes = await fetch(`${FORUM_URL}/oauth/token`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				grant_type: 'authorization_code',
				client_id: OAUTH_CLIENT_ID,
				client_secret: OAUTH_CLIENT_SECRET,
				redirect_uri: OAUTH_REDIRECT_URI,
				code
			})
		});

		if (!tokenRes.ok) {
			throw error(401, 'Token exchange failed');
		}
		
		const { access_token } = await tokenRes.json();

		// Set access token cookie
		cookies.set('access_token', access_token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		throw redirect(302, state);
	} catch (err) {
		if (err instanceof Response) {
			throw err;
		}
		throw error(500, 'OAuth callback failed');
	}
};

