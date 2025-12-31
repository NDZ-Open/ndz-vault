import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';
import { verifyToken } from '$lib/server/auth';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ params, cookies, fetch, request }) => {
	const FORUM_URL = env.FLARUM_URL || 'https://ndz.ng';
	const JWT_SECRET = env.JWT_SECRET;
	
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check for auth token first
	let token = cookies.get('auth_token');
	let user = token ? verifyToken(token) : null;
	
	// If no vault token, check Flarum session
	if (!user) {
		const flarumSession = cookies.get('flarum_session');
		if (flarumSession && JWT_SECRET) {
			try {
				const cookieHeader = request.headers.get('cookie') || '';
				const res = await fetch(`${FORUM_URL}/api`, {
					headers: { 
						'Cookie': cookieHeader,
						'Accept': 'application/json'
					}
				});
				
				if (res.ok) {
					const data = await res.json();
					const userData = data.data;
					
					if (userData?.id) {
						const attrs = userData.attributes;
						const username = attrs?.username?.trim() || '';
						const email = attrs?.email?.trim() || '';
						const userId = userData.id;
						
						// Validate user is actually authenticated (not a guest)
						if (
							userId &&
							typeof userId === 'number' &&
							userId > 1 &&
							username !== '' &&
							username.toLowerCase() !== 'guest' &&
							username.toLowerCase() !== 'anonymous' &&
							email !== '' &&
							email.includes('@')
						) {
							user = { 
								id: userId, 
								username: username,
								email: email,
								displayName: attrs.displayName || username
							};
							
							// Create vault token for future requests
							const vaultToken = jwt.sign(
								{ id: user.id, username: user.username, email: user.email, displayName: user.displayName },
								JWT_SECRET,
								{ expiresIn: '30d' }
							);
							
							cookies.set('auth_token', vaultToken, { 
								path: '/', 
								httpOnly: true,
								secure: true,
								sameSite: 'lax',
								maxAge: 60*60*24*30 
							});
						}
					}
				}
			} catch (err) {
				// Flarum session check failed - silently continue
			}
		}
	}
	
	return {
		resource,
		category,
		user,
		isAuthenticated: !!user
	};
};
