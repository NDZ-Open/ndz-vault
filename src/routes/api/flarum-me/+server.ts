import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	const sessionCookie = cookies.get('flarum_session');
	const rememberCookie = cookies.get('flarum_remember');
	
	if (!sessionCookie) {
		throw error(401, 'Not authenticated');
	}

	try {
		const response = await fetch(`${FLARUM_URL}/api`, {
			headers: {
				'Cookie': `flarum_session=${sessionCookie}${rememberCookie ? `; flarum_remember=${rememberCookie}` : ''}`,
				'Accept': 'application/json'
			},
			credentials: 'include'
		});

		if (!response.ok) {
			throw error(401, 'Invalid session');
		}

		const data = await response.json();
		
		if (!data.data || !data.data.id) {
			throw error(401, 'No user data');
		}

		return json({
			id: data.data.id,
			username: data.data.attributes.username,
			email: data.data.attributes.email,
			displayName: data.data.attributes.displayName,
			avatarUrl: data.data.attributes.avatarUrl
		});
		
	} catch (err) {
		console.error('Flarum auth check failed:', err);
		throw error(401, 'Authentication failed');
	}
};

