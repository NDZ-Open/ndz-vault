<script lang="ts">
	import type { Resource } from '$lib/data/resources';
	
	export let resource: Resource;
</script>

<a href="/resource/{resource.id}" class="card">
	<div class="card-header">
		<div class="card-icon">{resource.icon || '📄'}</div>
	</div>
	<div class="card-content">
		<h3 class="card-title">{resource.title}</h3>
		<p class="card-description">{resource.description}</p>
		<div class="card-tags">
			{#each resource.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	</div>
</a>

<style>
	.card {
		display: block;
		background-color: var(--section-bg);
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		border-color: rgba(0, 235, 152, 0.3);
	}

	.card-header {
		margin-bottom: 1rem;
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

	@media (max-width: 640px) {
		.card {
			padding: 1.25rem;
			width: 100%;
			max-width: 100%;
			box-sizing: border-box;
			min-width: 0;
		}

		.card-icon {
			font-size: 1.75rem;
			width: 44px;
			height: 44px;
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
