import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	const FORUM_URL = env.FLARUM_URL || 'https://ndz.ng';
	const JWT_SECRET = env.JWT_SECRET;
	
	if (!JWT_SECRET) {
		throw error(500, 'JWT_SECRET not configured');
	}

	const { username, password } = await request.json();

	if (!username || !password) {
		throw error(400, 'Username and password required');
	}

	try {
		const res = await fetch(`${FORUM_URL}/api/token`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ identification: username, password })
		});

		if (!res.ok) {
			throw error(401, 'Invalid credentials');
		}

		const { token: flarumToken, userId } = await res.json();

		// Get user details
		const userRes = await fetch(`${FORUM_URL}/api/users/${userId}`, {
			headers: { 'Authorization': `Token ${flarumToken}` }
		});

		if (!userRes.ok) {
			throw error(401, 'Failed to get user data');
		}

		const userData = await userRes.json();
		const user = userData.data.attributes;

		// Create our own JWT
		const token = jwt.sign(
			{ id: userId, username: user.username, email: user.email, displayName: user.displayName },
			JWT_SECRET,
			{ expiresIn: '30d' }
		);

		return json({ 
			token, 
			user: { 
				id: userId, 
				username: user.username, 
				displayName: user.displayName || user.username,
				email: user.email
			} 
		});
	} catch (err) {
		if (err instanceof Response) {
			throw err;
		}
		throw error(500, 'Login failed');
	}
};

