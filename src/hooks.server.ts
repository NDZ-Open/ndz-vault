import type { Handle } from '@sveltejs/kit';

const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';

export const handle: Handle = async ({ event, resolve }) => {
	// Step 1: Confirm hook is running
	console.log('🔵 HOOK RUNNING', event.url.pathname);
	
	// Step 2: Check if cookie is present
	const allCookies = event.cookies.getAll();
	console.log('🔵 COOKIES', allCookies.map(c => ({ name: c.name, value: c.value.substring(0, 20) + '...' })));
	
	const sessionCookie = event.cookies.get('flarum_session');
	console.log('🔵 SESSION COOKIE PRESENT:', !!sessionCookie);
	
	// Initialize user as null
	event.locals.user = null;
	
	// Step 3: Validate with Flarum API
	if (sessionCookie) {
		try {
			const cookieHeader = event.request.headers.get('cookie') || '';
			console.log('🔵 COOKIE HEADER LENGTH:', cookieHeader.length);
			console.log('🔵 CALLING FLARUM API:', `${FLARUM_URL}/api`);
			
			const response = await event.fetch(`${FLARUM_URL}/api`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json'
				}
			});

			console.log('🔵 FLARUM RESPONSE STATUS:', response.status);

			if (response.ok) {
				const data = await response.json();
				console.log('🔵 FLARUM RESPONSE DATA:', JSON.stringify(data, null, 2).substring(0, 500));
				
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
					console.log('🔵 ✅ USER AUTHENTICATED:', event.locals.user.username);
				} else {
					console.log('🔵 ❌ USER DATA FAILED VALIDATION. ID:', userData?.id, 'Username:', userData?.attributes?.username);
				}
			} else {
				const text = await response.text();
				console.log('🔵 ❌ FLARUM API ERROR:', response.status, text.substring(0, 200));
			}
		} catch (err: any) {
			console.error('🔵 ❌ EXCEPTION:', err.message);
		}
	} else {
		console.log('🔵 ❌ NO SESSION COOKIE');
	}
	
	console.log('🔵 LOCALS USER:', event.locals.user ? `✅ ${event.locals.user.username}` : '❌ null');
	
	return resolve(event);
};

