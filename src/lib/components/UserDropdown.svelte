<script lang="ts">
	export let user: { id: number; username: string; displayName?: string; email: string; avatarUrl?: string | null } | null;
	
	function logout() {
		document.cookie = 'auth_token=; path=/; max-age=0';
		window.location.reload();
	}
</script>

{#if user}
	<div class="user-dropdown">
		<button class="user-button">
			<span class="user-name">{user.username}</span>
			<svg class="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M2 4l4 4 4-4"/>
			</svg>
		</button>
		<div class="dropdown-menu">
			<div class="dropdown-item user-info-item">
				<span class="dropdown-label">Logged in as</span>
				<span class="dropdown-value">{user.username}</span>
			</div>
			<div class="dropdown-divider"></div>
			<button on:click={logout} class="dropdown-item logout-item">
				Logout
			</button>
		</div>
	</div>
{/if}

<style>
	.user-dropdown {
		position: relative;
	}
	
	.user-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--text-secondary);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s;
		line-height: 1;
		height: fit-content;
	}
	
	.user-button:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.3);
		color: var(--text-primary);
	}
	
	.user-name {
		font-weight: 500;
	}
	
	.dropdown-icon {
		transition: transform 0.2s;
	}
	
	.user-button:hover .dropdown-icon {
		transform: rotate(180deg);
	}
	
	.dropdown-menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		background: var(--background);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		min-width: 200px;
		overflow: hidden;
		z-index: 1000;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-10px);
		transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
		pointer-events: none;
	}
	
	.user-dropdown:hover .dropdown-menu {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
		pointer-events: auto;
	}
	
	.dropdown-item {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		color: var(--text-primary);
		font-size: 0.9rem;
		text-align: left;
		cursor: pointer;
		transition: background 0.2s;
	}
	
	.user-info-item {
		cursor: default;
		padding: 0.75rem 1rem;
	}
	
	.dropdown-label {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary);
		margin-bottom: 0.25rem;
	}
	
	.dropdown-value {
		display: block;
		font-weight: 500;
		color: var(--text-primary);
	}
	
	.dropdown-divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
		margin: 0.25rem 0;
	}
	
	.logout-item {
		color: #ef4444;
	}
	
	.logout-item:hover {
		background: rgba(239, 68, 68, 0.1);
	}
</style>

