<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	
	const dispatch = createEventDispatcher();
	
	let username = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleLogin() {
		loading = true;
		error = '';
		
		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			if (!res.ok) {
				error = 'Invalid username or password';
				loading = false;
				return;
			}

			const { token } = await res.json();
			
			// Set cookie
			document.cookie = `auth_token=${token}; path=/; max-age=${60*60*24*30}; secure; samesite=lax`;
			
			// Refresh page data
			await invalidateAll();
			dispatch('close');
			
		} catch (err) {
			error = 'Login failed';
			loading = false;
		}
	}
</script>

<div class="modal-overlay" on:click={() => dispatch('close')}>
	<div class="modal-content" on:click|stopPropagation>
		<h2 class="modal-title">Login with NDZ Account</h2>
		
		<form on:submit|preventDefault={handleLogin}>
			<div class="form-group">
				<label class="form-label">Username</label>
				<input 
					type="text" 
					bind:value={username}
					class="form-input"
					required
					disabled={loading}
				/>
			</div>
			
			<div class="form-group">
				<label class="form-label">Password</label>
				<input 
					type="password" 
					bind:value={password}
					class="form-input"
					required
					disabled={loading}
				/>
			</div>

			{#if error}
				<p class="error-message">{error}</p>
			{/if}

			<button 
				type="submit"
				disabled={loading}
				class="submit-button"
			>
				{loading ? 'Logging in...' : 'Login'}
			</button>
		</form>

		<p class="signup-link">
			Don't have an account? 
			<a href="https://ndz.ng/signup" target="_blank" rel="noopener noreferrer">Sign up</a>
		</p>
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	
	.modal-content {
		background: var(--background);
		border-radius: 8px;
		padding: 2rem;
		max-width: 400px;
		width: 90%;
		margin: 1rem;
	}
	
	.modal-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		color: var(--text-primary);
	}
	
	.form-group {
		margin-bottom: 1rem;
	}
	
	.form-label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}
	
	.form-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
		font-size: 1rem;
	}
	
	.form-input:focus {
		outline: none;
		border-color: var(--button-color);
	}
	
	.form-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	.error-message {
		color: #ef4444;
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}
	
	.submit-button {
		width: 100%;
		background: var(--button-color);
		color: var(--button-text);
		padding: 0.75rem;
		border: none;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		margin-top: 1rem;
	}
	
	.submit-button:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 235, 152, 0.3);
	}
	
	.submit-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	.signup-link {
		font-size: 0.875rem;
		text-align: center;
		margin-top: 1rem;
		color: var(--text-secondary);
	}
	
	.signup-link a {
		color: var(--button-color);
		text-decoration: none;
	}
	
	.signup-link a:hover {
		text-decoration: underline;
	}
</style>

