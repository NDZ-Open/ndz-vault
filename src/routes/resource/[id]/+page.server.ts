import type { PageServerLoad } from './$types';
import { getResourceById, categories } from '$lib/data/resources';

export const load: PageServerLoad = async ({ params, cookies, fetch, request }) => {
	const resource = getResourceById(params.id || '');
	const category = resource ? categories.find(c => c.id === resource.category) : null;
	
	// Check if user is logged in by checking session cookie and verifying with Flarum API
	let user = null;
	const sessionCookie = cookies.get('flarum_session');
	
	if (sessionCookie) {
		try {
			const FLARUM_URL = import.meta.env.FLARUM_URL || 'https://ndz.ng';
			
			// Forward ALL cookies from the browser request to Flarum
			const cookieHeader = request.headers.get('cookie') || '';
			
			console.log('[AUTH] Checking authentication...');
			console.log('[AUTH] Cookie header:', cookieHeader.substring(0, 150));
			console.log('[AUTH] Calling Flarum API:', `${FLARUM_URL}/api`);
			
			// Try Flarum's /api/users/me endpoint first (if it exists)
			// Otherwise fall back to /api
			let response = await fetch(`${FLARUM_URL}/api/users/me`, {
				headers: {
					'Cookie': cookieHeader,
					'Accept': 'application/json',
					'User-Agent': 'NDZ-Vault/1.0'
				}
			});
			
			// If /api/users/me doesn't exist, try /api
			if (!response.ok && response.status === 404) {
				console.log('[AUTH] /api/users/me not found, trying /api');
				response = await fetch(`${FLARUM_URL}/api`, {
					headers: {
						'Cookie': cookieHeader,
						'Accept': 'application/json',
						'User-Agent': 'NDZ-Vault/1.0'
					}
				});
			}

			console.log('[AUTH] Response status:', response.status, response.statusText);
			console.log('[AUTH] Response headers:', Object.fromEntries(response.headers.entries()));

			if (response.ok) {
				const data = await response.json();
				console.log('[AUTH] Full response:', JSON.stringify(data, null, 2).substring(0, 500));
				
				// Flarum API might return data in different formats
				// Check for user data in various possible locations
				let userData = null;
				
				if (data.data && data.data.id) {
					userData = data.data;
				} else if (data.users && data.users[0]) {
					userData = data.users[0];
				} else if (data.user) {
					userData = data.user;
				}
				
				if (userData && userData.id && userData.attributes && userData.attributes.username) {
					user = {
						id: userData.id,
						username: userData.attributes.username,
						displayName: userData.attributes.displayName || userData.attributes.username,
						email: userData.attributes.email,
						avatarUrl: userData.attributes.avatarUrl
					};
					console.log('[AUTH] ✅ User authenticated:', user.username);
				} else {
					console.log('[AUTH] ❌ No valid user data found. Response structure:', JSON.stringify(data, null, 2).substring(0, 500));
				}
			} else {
				const text = await response.text();
				console.log('[AUTH] ❌ Flarum API error:', response.status, text.substring(0, 300));
			}
		} catch (err: any) {
			console.error('[AUTH] ❌ Exception:', err.message, err.stack);
		}
	} else {
		console.log('[AUTH] ❌ No session cookie found');
	}
	
	return {
		resource,
		category,
		user
	};
};

