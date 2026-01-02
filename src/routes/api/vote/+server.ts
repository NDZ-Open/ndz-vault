import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifyToken } from '$lib/server/auth';
import fs from 'fs/promises';
import path from 'path';

// Use persistent data directory (will be mounted as volume in Docker)
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const VOTES_FILE = path.join(DATA_DIR, 'votes.json');

// Ensure data directory exists
async function ensureDataDir() {
	const dataDir = path.dirname(VOTES_FILE);
	try {
		await fs.access(dataDir);
	} catch {
		await fs.mkdir(dataDir, { recursive: true });
	}
}

// Read votes from file
async function readVotes(): Promise<Record<string, number>> {
	try {
		await ensureDataDir();
		const data = await fs.readFile(VOTES_FILE, 'utf-8');
		return JSON.parse(data);
	} catch {
		// File doesn't exist, return empty object
		return {};
	}
}

// Write votes to file (atomic write to prevent corruption)
async function writeVotes(votes: Record<string, number>) {
	await ensureDataDir();
	// Write to temp file first, then rename (atomic operation)
	const tempFile = `${VOTES_FILE}.tmp`;
	await fs.writeFile(tempFile, JSON.stringify(votes, null, 2), 'utf-8');
	await fs.rename(tempFile, VOTES_FILE);
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	// Check authentication
	const token = cookies.get('auth_token');
	const user = token ? verifyToken(token) : null;
	
	if (!user) {
		throw error(401, 'Unauthorized - Please login to vote');
	}
	
	try {
		const { resourceId, action } = await request.json();
		
		if (!resourceId || (action !== 'upvote' && action !== 'downvote')) {
			throw error(400, 'Invalid request');
		}
		
		const votes = await readVotes();
		
		// Initialize resource if it doesn't exist
		if (!votes[resourceId]) {
			votes[resourceId] = 0;
		}
		
		// Update vote count
		if (action === 'upvote') {
			votes[resourceId] = (votes[resourceId] || 0) + 1;
		} else {
			votes[resourceId] = Math.max(0, (votes[resourceId] || 0) - 1);
		}
		
		await writeVotes(votes);
		
		return json({ 
			success: true, 
			voteCount: votes[resourceId],
			resourceId 
		});
	} catch (err) {
		console.error('Vote error:', err);
		throw error(500, 'Failed to process vote');
	}
};

export const GET: RequestHandler = async ({ url }) => {
	try {
		const resourceId = url.searchParams.get('resourceId');
		
		if (resourceId) {
			// Get vote count for specific resource
			const votes = await readVotes();
			return json({ 
				resourceId, 
				voteCount: votes[resourceId] || 0 
			});
		} else {
			// Get all votes
			const votes = await readVotes();
			return json({ votes });
		}
	} catch (err) {
		console.error('Get votes error:', err);
		throw error(500, 'Failed to fetch votes');
	}
};

