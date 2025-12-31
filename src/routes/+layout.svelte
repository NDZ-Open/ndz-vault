<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
	
	function logout() {
		document.cookie = 'auth_token=; path=/; max-age=0';
		window.location.reload();
	}
</script>

{#if data.user}
	<header class="user-header">
		<div class="container">
			<div class="user-info">
				<span>Logged in as {data.user.username}</span>
				<button on:click={logout} class="logout-button">Logout</button>
			</div>
		</div>
	</header>
{/if}

<slot />

<Footer />

<style>
	.user-header {
		background: var(--background);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding: 0.75rem 0;
	}
	
	.user-info {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}
	
	.logout-button {
		background: transparent;
		border: 1px solid var(--text-secondary);
		color: var(--text-secondary);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s;
	}
	
	.logout-button:hover {
		background: var(--text-secondary);
		color: var(--background);
	}
</style>
