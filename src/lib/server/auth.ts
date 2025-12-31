import { env } from '$env/dynamic/private';

export async function getUser(token: string) {
	const FORUM_URL = env.FLARUM_URL || 'https://ndz.ng';
	
	try {
		const res = await fetch(`${FORUM_URL}/api/user`, {
			headers: { 'Authorization': `Bearer ${token}` }
		});

		if (!res.ok) return null;

		const data = await res.json();
		const userData = data.data;
		
		// Validate user is actually authenticated (not a guest)
		const username = userData?.attributes?.username?.trim() || '';
		const email = userData?.attributes?.email?.trim() || '';
		const userId = userData?.id;

		// Only return user if they're actually authenticated
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
			return {
				id: userId,
				username: username,
				displayName: userData.attributes.displayName || username,
				email: email,
				avatarUrl: userData.attributes.avatarUrl || null
			};
		}
		
		return null;
	} catch (err) {
		return null;
	}
}

