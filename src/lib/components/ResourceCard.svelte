<script lang="ts">
	import type { Resource } from '$lib/data/resources';
	
	export let resource: Resource;
	export let isAuthenticated: boolean = false;
</script>

<div class="card" class:inactive={!resource.isUnlocked}>
	<a href="/resource/{resource.id}" class="card-link" rel="external">
		<div class="card-header">
			<div class="card-icon">{resource.icon || '📄'}</div>
			{#if !resource.isUnlocked}
				<span class="coming-soon-badge">Coming Soon</span>
			{/if}
		</div>
		<div class="card-content">
			<h3 class="card-title">{resource.title}</h3>
			<p class="card-description">{resource.description}</p>
			<div class="card-tags">
				{#each resource.tags as tag}
					<span class="tag" class:exclusive={tag === 'Exclusive'}>{tag}</span>
				{/each}
			</div>
		</div>
	</a>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		background-color: var(--section-bg);
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.card-link {
		display: block;
		text-decoration: none;
		color: inherit;
		flex: 1;
	}

	.card.inactive {
		opacity: 0.6;
		filter: grayscale(0.3);
		cursor: default;
	}

	.card.inactive:hover {
		opacity: 0.7;
		transform: none;
		box-shadow: none;
		border-color: rgba(255, 255, 255, 0.05);
	}

	.card:not(.inactive):hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		border-color: rgba(0, 235, 152, 0.3);
	}

	.card-header {
		margin-bottom: 1rem;
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.card-icon {
		font-size: 2rem;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 235, 152, 0.1);
		border-radius: 10px;
	}

	.coming-soon-badge {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.75rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.card-content {
		flex: 1;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.card-description {
		font-size: 0.95rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		display: inline-flex;
		align-items: center;
		padding: 0.35rem 0.75rem;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 6px;
		font-size: 0.8rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.tag.exclusive {
		background: rgba(0, 235, 152, 0.15);
		border: 1px solid var(--button-color);
		color: var(--button-color);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-size: 0.75rem;
	}

	@media (max-width: 640px) {
		.card {
			padding: 1.25rem;
			width: 100%;
			max-width: 100%;
			box-sizing: border-box;
			min-width: 0;
		}

		.card-header {
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		.card-icon {
			font-size: 1.75rem;
			width: 44px;
			height: 44px;
		}

		.coming-soon-badge {
			font-size: 0.65rem;
			padding: 0.2rem 0.6rem;
		}

		.card-title {
			font-size: 1.1rem;
			margin-bottom: 0.5rem;
		}

		.card-description {
			font-size: 0.9rem;
			margin-bottom: 0.75rem;
		}

		.tag {
			font-size: 0.75rem;
			padding: 0.3rem 0.65rem;
		}
	}
</style>
