<script lang="ts">
	// Flarum forum URL
	const FORUM_URL = 'https://ndz.ng';
	
	// Simple: Just redirect to Flarum login
	// After login, user comes back to dev.ndz.ng
	// hooks.server.ts automatically checks the cookie on every request
	// If cookie is valid → resource unlocks. If not → stays locked.
	const loginUrl = `${FORUM_URL}/login`;
</script>

<a 
	href={loginUrl}
	class="login-button"
>
	<slot>Log in with NDZ Forum</slot>
</a>

<style>
	.login-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 2rem;
		background: var(--button-color);
		color: var(--button-text);
		font-weight: 600;
		font-size: 1rem;
		border-radius: 8px;
		transition: all 0.2s;
		text-decoration: none;
	}

	.login-button:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 235, 152, 0.3);
	}
</style>

