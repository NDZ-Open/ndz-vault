import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Simple check: if flarum_session cookie exists, user is authenticated
	const sessionCookie = event.cookies.get('flarum_session');
	
	if (sessionCookie) {
		// Cookie exists = user is logged in on Flarum
		// Set a simple authenticated flag
		event.locals.user = {
			authenticated: true
		};
	} else {
		event.locals.user = null;
	}
	
	return resolve(event);
};

