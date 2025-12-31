import type { Handle } from '@sveltejs/kit';

const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';

export const handle: Handle = async ({ event, resolve }) => {
	// Check for cookie AND validate it with Flarum
	const sessionCookie = event.cookies.get('flarum_session');
	
	event.locals.user = null;
	
	if (sessionCookie) {
		try {
			// Validate the cookie by calling Flarum's API
			// This ensures the cookie is actually valid, not just present
			const cookieHeader = event.request.headers.get('cookie') || '';
			
			const response = await event.fetch(`${FLARUM_URL}/api`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json'
				}
			});

			// Only authenticate if Flarum confirms the session is valid
			if (response.ok) {
				const data = await response.json();
				const userData = data.data;
				
				// Check if we got a real authenticated user (not anonymous/guest)
				if (userData?.id && userData.id > 1 && userData.attributes?.username) {
					event.locals.user = {
						authenticated: true
					};
				}
			}
		} catch (err) {
			// Validation failed - user stays null
		}
	}
	
	return resolve(event);
};

