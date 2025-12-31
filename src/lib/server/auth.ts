import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export function verifyToken(token: string) {
	try {
		const JWT_SECRET = env.JWT_SECRET;
		if (!JWT_SECRET) {
			return null;
		}
		return jwt.verify(token, JWT_SECRET) as { id: number; username: string; email: string; displayName?: string };
	} catch {
		return null;
	}
}

