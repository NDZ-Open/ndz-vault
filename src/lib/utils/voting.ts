const VOTES_STORAGE_KEY = 'ndz_vault_votes';

// Client-side: Track which resources user has voted on
export function getVotes(): Record<string, boolean> {
	if (typeof window === 'undefined') return {};
	
	try {
		const stored = localStorage.getItem(VOTES_STORAGE_KEY);
		return stored ? JSON.parse(stored) : {};
	} catch {
		return {};
	}
}

export function hasVoted(resourceId: string): boolean {
	const votes = getVotes();
	return votes[resourceId] === true;
}

export async function toggleVote(resourceId: string): Promise<boolean> {
	const votes = getVotes();
	const currentVote = votes[resourceId] === true;
	const newVoteState = !currentVote;
	
	// Update local storage
	votes[resourceId] = newVoteState;
	try {
		localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
	} catch {
		// Storage failed, but continue with API call
	}
	
	// Send vote to server
	try {
		const response = await fetch('/api/vote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				resourceId,
				action: newVoteState ? 'upvote' : 'downvote'
			})
		});
		
		if (!response.ok) {
			// Revert local storage if server call failed
			votes[resourceId] = currentVote;
			localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
			throw new Error('Failed to save vote');
		}
		
		return newVoteState;
	} catch (err) {
		// Revert local storage on error
		votes[resourceId] = currentVote;
		try {
			localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
		} catch {
			// Ignore storage errors
		}
		throw err;
	}
}

export async function getVoteCount(resourceId: string): Promise<number> {
	try {
		const response = await fetch(`/api/vote?resourceId=${resourceId}`);
		if (response.ok) {
			const data = await response.json();
			return data.voteCount || 0;
		}
	} catch {
		// Fallback to 0 if API fails
	}
	return 0;
}

