<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	let returnTo = '/';
	let showManualLink = false;
	
	onMount(() => {
		returnTo = $page.url.searchParams.get('return') || $page.url.searchParams.get('redirect') || '/';
		
		// Try server-side redirect first
		// If that doesn't work, show manual link after 2 seconds
		const timer = setTimeout(() => {
			showManualLink = true;
		}, 2000);
		
		return () => clearTimeout(timer);
	});
	
	function handleContinue() {
		window.location.href = returnTo;
	}
</script>

<div class="loading-container">
	<div class="loading-content">
		<div class="spinner"></div>
		<p>Logging you in...</p>
		<p class="redirect-note">Redirecting you back...</p>
		
		{#if showManualLink}
			<button class="continue-button" on:click={handleContinue}>
				Click here to continue
			</button>
		{/if}
	</div>
</div>

<style>
	.loading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background-color: var(--background);
	}

	.loading-content {
		text-align: center;
	}

	.spinner {
		width: 48px;
		height: 48px;
		border: 4px solid rgba(255, 255, 255, 0.1);
		border-top-color: var(--button-color);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1.5rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading-content p {
		color: var(--text-secondary);
		font-size: 1rem;
		margin: 0.5rem 0;
	}

	.redirect-note {
		font-size: 0.85rem;
		opacity: 0.7;
	}
	
	.continue-button {
		margin-top: 2rem;
		padding: 1rem 2rem;
		background: var(--button-color);
		color: var(--button-text);
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.continue-button:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 235, 152, 0.3);
	}
</style>

