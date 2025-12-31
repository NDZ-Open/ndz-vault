<script lang="ts">
	import { browser } from '$app/environment';
	
	export let returnPath: string | undefined = undefined;
	
	const FLARUM_URL = 'https://ndz.ng';
	
	// Get the return URL - use returnPath prop if provided, otherwise use current page
	let returnUrl = returnPath || '/';
	if (browser && !returnPath) {
		returnUrl = window.location.pathname + window.location.search;
	}
	
	// Simple flow: Redirect to Flarum login with return URL
	// After login, Flarum sets cookies with domain .ndz.ng and redirects back
	// hooks.server.ts automatically detects and validates the cookie
	const loginUrl = `${FLARUM_URL}/login?return=${encodeURIComponent(`https://dev.ndz.ng${returnUrl}`)}`;
</script>

<a 
	href={loginUrl}
	class="login-button"
>
	<slot>Continue with NDZ Account</slot>
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

