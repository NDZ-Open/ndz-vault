<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	let email = '';
	let isSubmitting = false;
	let error = '';
	
	async function handleSubmit() {
		if (!email || !email.includes('@')) {
			error = 'Please enter a valid email address';
			return;
		}
		
		isSubmitting = true;
		error = '';
		
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 500));
		
		dispatch('submit', email);
		isSubmitting = false;
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="email-form">
	<div class="form-group">
		<input
			type="email"
			placeholder="Your email address"
			bind:value={email}
			class="email-input"
			required
			disabled={isSubmitting}
		/>
		<button 
			type="submit" 
			class="submit-button"
			disabled={isSubmitting}
		>
			{#if isSubmitting}
				Submitting...
			{:else}
				<span>Get instant access now</span>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="5" y1="12" x2="19" y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg>
			{/if}
		</button>
	</div>
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<p class="privacy-note">
		We respect your privacy. Unsubscribe at any time.
	</p>
</form>

<style>
	.email-form {
		width: 100%;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.email-input {
		flex: 1;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: var(--text-primary);
		font-size: 1rem;
		transition: all 0.2s;
	}

	.email-input::placeholder {
		color: var(--text-secondary);
	}

	.email-input:focus {
		outline: none;
		border-color: var(--button-color);
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 3px rgba(0, 235, 152, 0.1);
	}

	.email-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.submit-button {
		padding: 1rem 2rem;
		background: var(--button-color);
		color: var(--button-text);
		font-weight: 600;
		font-size: 1rem;
		border-radius: 8px;
		transition: all 0.2s;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.submit-button svg {
		width: 20px;
		height: 20px;
		transition: transform 0.2s;
	}

	.submit-button:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 235, 152, 0.3);
	}

	.submit-button:hover:not(:disabled) svg {
		transform: translateX(4px);
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.error-message {
		color: #ff6b6b;
		font-size: 0.9rem;
		margin-top: 0.5rem;
		text-align: left;
	}

	.privacy-note {
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin-top: 1rem;
		display: none;
	}

</style>
