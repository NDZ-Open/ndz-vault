<script lang="ts">
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
	
	const FLARUM_URL = 'https://ndz.ng';
</script>

<header class="header">
	<div class="container">
		<div class="header-content">
			<a href="/" class="logo-link">
				<img src="/logo.png" alt="NDZ Vault" class="logo" />
			</a>
			<nav class="nav">
				<a href="/" class="nav-link">Home</a>
				<a href="/" class="nav-link">Resources</a>
				<a href={FLARUM_URL} target="_blank" rel="noopener noreferrer" class="nav-link">Forum</a>
				<div class="user-menu">
					{#if data.user.avatarUrl}
						<img 
							src={data.user.avatarUrl} 
							alt={data.user.displayName}
							class="user-avatar"
						/>
					{/if}
					<span class="user-name">{data.user.displayName}</span>
					<a 
						href="{FLARUM_URL}/logout"
						class="nav-link logout-link"
					>
						Log out
					</a>
				</div>
			</nav>
		</div>
	</div>
</header>

<slot />

<style>
	.header {
		background-color: var(--background);
		padding: 1.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo-link {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.logo {
		height: 40px;
		width: auto;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-link {
		color: var(--text-secondary);
		font-size: 0.9rem;
		transition: color 0.2s;
		font-weight: 500;
	}

	.nav-link:hover {
		color: var(--text-primary);
	}

	.user-menu {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-left: 1rem;
		padding-left: 1rem;
		border-left: 1px solid rgba(255, 255, 255, 0.1);
	}

	.user-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
	}

	.user-name {
		color: var(--text-primary);
		font-size: 0.9rem;
		font-weight: 500;
	}

	.logout-link {
		font-size: 0.85rem;
	}
</style>

