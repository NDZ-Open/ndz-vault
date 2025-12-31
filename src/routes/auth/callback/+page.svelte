<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	// Client-side redirect fallback in case server-side redirect doesn't work
	onMount(() => {
		const returnTo = $page.url.searchParams.get('return') || $page.url.searchParams.get('redirect') || '/';
		
		// Wait a moment for server-side redirect, then do client-side redirect
		const timer = setTimeout(() => {
			window.location.href = returnTo;
		}, 1000);
		
		return () => clearTimeout(timer);
	});
</script>

<div class="loading-container">
	<div class="loading-content">
		<div class="spinner"></div>
		<p>Logging you in...</p>
		<p class="redirect-note">Redirecting you back...</p>
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
</style>

