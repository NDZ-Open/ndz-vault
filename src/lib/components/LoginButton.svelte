<script lang="ts">
	const FLARUM_URL = 'https://ndz.ng';
	
	// Just redirect to Flarum login - user will manually come back via "Go to NDZ Vault" link
	const loginUrl = `${FLARUM_URL}/login`;
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

