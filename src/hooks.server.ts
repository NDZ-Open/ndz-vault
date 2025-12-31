import type { Handle } from '@sveltejs/kit';

const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';

export const handle: Handle = async ({ event, resolve }) => {
	// Check for Flarum session cookie
	const sessionCookie = event.cookies.get('flarum_session');
	
	// Initialize user as null
	event.locals.user = null;
	
	// If we have a session cookie, validate it with Flarum
	if (sessionCookie) {
		try {
			// Forward ALL cookies from the browser request to Flarum
			const cookieHeader = event.request.headers.get('cookie') || '';
			
			const response = await event.fetch(`${FLARUM_URL}/api`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();
				
				// Only set user if we have valid authenticated user data
				// Anonymous/guest users have ID 0 or 1, real users have ID > 1
				const userData = data.data;
				
				if (
					userData && 
					userData.id && 
					typeof userData.id === 'number' &&
					userData.id > 1 &&
					userData.attributes && 
					userData.attributes.username &&
					userData.attributes.username.trim() !== '' &&
					userData.attributes.username !== 'Guest' &&
					userData.attributes.username !== 'Anonymous'
				) {
					event.locals.user = {
						id: userData.id,
						username: userData.attributes.username,
						displayName: userData.attributes.displayName || userData.attributes.username,
						email: userData.attributes.email,
						avatarUrl: userData.attributes.avatarUrl
					};
				}
			}
		} catch (err) {
			// Fail silently - user stays null
		}
	}
	
	return resolve(event);
};

