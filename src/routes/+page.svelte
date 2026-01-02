<script lang="ts">
	import { categories, getAllResources, type Resource, type Category } from '$lib/data/resources';
	import ResourceCard from '$lib/components/ResourceCard.svelte';
	import UserDropdown from '$lib/components/UserDropdown.svelte';
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
	
	let selectedCategory: string | null = null;
	let searchQuery = '';
	
	$: filteredResources = getAllResources().filter(resource => {
		const matchesCategory = !selectedCategory || resource.category === selectedCategory;
		const matchesSearch = !searchQuery || 
			resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesSearch;
	});
	
	$: totalResources = getAllResources().length;
	
	function selectCategory(categoryId: string | null) {
		selectedCategory = selectedCategory === categoryId ? null : categoryId;
	}
</script>

<svelte:head>
	<title>NDZ Vault - Career and Remote Work Resources</title>
	<meta name="description" content="Professional templates, frameworks, and tools to accelerate your career, grow your freelance business, and build better products." />
</svelte:head>

<header class="header">
	<div class="container">
		<div class="header-content">
			<a href="/" class="logo-link">
				<img src="/logo.png" alt="NDZ Vault" class="logo" />
			</a>
			<nav class="nav">
				<a href="/" class="nav-link active">Home</a>
				<a href="/" class="nav-link">Resources</a>
				<a href="https://ndz.ng" target="_blank" rel="noopener noreferrer" class="nav-link">Forum</a>
				<UserDropdown user={data.user} />
			</nav>
		</div>
	</div>
</header>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-background">
			<div class="mesh-gradient"></div>
			<div class="hero-shape"></div>
			<div class="hero-shape"></div>
			<div class="hero-shape"></div>
		</div>
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">Career & Remote Work Resources</h1>
				<p class="hero-subtitle">
					Professional templates, frameworks, and tools to accelerate your career, grow your freelance business, and build better products. 
					Subscribe to get new resources weekly.
				</p>
				<form class="hero-form" on:submit|preventDefault>
					<input 
						type="email" 
						placeholder="Your email address" 
						class="hero-input"
						required
					/>
					<button type="submit" class="hero-button">SUBSCRIBE</button>
				</form>
			</div>
		</div>
	</section>

	<!-- Resources Section -->
	<section class="resources-section">
		<div class="container">
			<div class="resources-layout">
				<!-- Sidebar -->
				<aside class="sidebar">
					<div class="sidebar-header">
						<button 
							class="sidebar-filter {!selectedCategory ? 'active' : ''}"
							on:click={() => selectCategory(null)}
						>
							All resources
							<span class="count">{totalResources}</span>
						</button>
					</div>
					<div class="sidebar-filters">
						{#each categories as category}
							<button 
								class="sidebar-filter {selectedCategory === category.id ? 'active' : ''}"
								on:click={() => selectCategory(category.id)}
							>
								<span class="filter-icon">{category.icon}</span>
								<span class="filter-text">{category.name}</span>
							</button>
						{/each}
					</div>
				</aside>

				<!-- Main Content -->
				<div class="resources-main">
					<div class="search-bar">
						<input 
							type="text" 
							placeholder="Search resources..." 
							bind:value={searchQuery}
							class="search-input"
						/>
					</div>
					
					<div class="resources-grid">
						{#each filteredResources as resource}
							<ResourceCard {resource} />
						{/each}
					</div>
					
					{#if filteredResources.length === 0}
						<div class="no-results">
							<p>No resources found. Try a different search or category.</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
</main>

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
		display: flex;
		align-items: center;
		line-height: 1;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--text-primary);
	}

	@media (max-width: 768px) {
		.header {
			padding: 1rem 0;
		}

		.header-content {
			flex-wrap: wrap;
			gap: 1rem;
		}

		.logo {
			height: 32px;
		}

		.nav {
			flex-wrap: wrap;
			gap: 1rem;
		}

		.nav-link {
			font-size: 0.85rem;
		}
	}

	@media (max-width: 640px) {
		.nav {
			gap: 0.75rem;
		}

		.nav-link {
			font-size: 0.8rem;
		}
	}

	.hero {
		position: relative;
		background: #15181E;
		padding: 6rem 0;
		overflow: hidden;
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 1;
	}

	.mesh-gradient {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: 
			radial-gradient(circle at 20% 50%, rgba(0, 235, 152, 0.15) 0%, transparent 50%),
			radial-gradient(circle at 80% 80%, rgba(108, 118, 147, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 40% 20%, rgba(0, 235, 152, 0.08) 0%, transparent 50%);
		animation: meshMove 20s ease-in-out infinite;
		filter: blur(60px);
	}

	@keyframes meshMove {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(5%, -5%) scale(1.1);
		}
		66% {
			transform: translate(-5%, 5%) scale(0.9);
		}
	}

	.hero-shape {
		position: absolute;
		width: 300px;
		height: 300px;
		border-radius: 20px;
		background: linear-gradient(135deg, rgba(0, 235, 152, 0.15) 0%, rgba(108, 118, 147, 0.08) 100%);
		transform: rotate(45deg);
		animation: float 15s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% {
			transform: rotate(45deg) translate(0, 0);
		}
		50% {
			transform: rotate(45deg) translate(20px, -20px);
		}
	}

	.hero-shape:nth-child(2) {
		top: -100px;
		right: 10%;
		animation-delay: 0s;
	}

	.hero-shape:nth-child(3) {
		bottom: -50px;
		left: 15%;
		width: 200px;
		height: 200px;
		animation-delay: 5s;
	}

	.hero-shape:nth-child(4) {
		top: 30%;
		right: 20%;
		width: 150px;
		height: 150px;
		animation-delay: 10s;
	}

	.hero-content {
		position: relative;
		text-align: center;
		max-width: 900px;
		margin: 0 auto;
		z-index: 1;
		width: 100%;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		line-height: 1.1;
		text-align: center;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-subtitle {
		font-size: 1.2rem;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 2.5rem;
		line-height: 1.6;
	}

	.hero-form {
		display: flex;
		gap: 1rem;
		max-width: 500px;
		margin: 0 auto;
	}

	.hero-input {
		flex: 1;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		color: var(--text-primary);
		font-size: 1rem;
	}

	.hero-input::placeholder {
		color: var(--text-secondary);
	}

	.hero-input:focus {
		outline: none;
		border-color: var(--button-color);
		background: rgba(255, 255, 255, 0.15);
	}

	.hero-button {
		padding: 1rem 2.5rem;
		background: var(--button-color);
		color: var(--button-text);
		font-weight: 600;
		font-size: 1rem;
		border-radius: 8px;
		transition: transform 0.2s, box-shadow 0.2s;
		white-space: nowrap;
	}

	.hero-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(0, 235, 152, 0.3);
	}

	.resources-section {
		padding: 4rem 0;
		background-color: var(--background);
	}

	.resources-layout {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 3rem;
	}

	.sidebar {
		grid-column: 1;
		background-color: var(--section-bg);
		border-radius: 12px;
		padding: 1.5rem;
		height: fit-content;
		position: sticky;
		top: 2rem;
	}

	.resources-main {
		grid-column: 2;
	}

	@media (max-width: 968px) {
		.resources-layout {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		.sidebar {
			grid-column: unset;
			position: static;
		}

		.resources-main {
			grid-column: unset;
		}
	}

	.sidebar-header {
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.sidebar-filter {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		padding: 0.75rem 1rem;
		color: var(--text-secondary);
		font-size: 0.95rem;
		border-radius: 8px;
		transition: all 0.2s;
		margin-bottom: 0.5rem;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		gap: 0.75rem;
	}

	.sidebar-filter:hover {
		background-color: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.sidebar-filter.active {
		background-color: rgba(0, 235, 152, 0.1);
		color: var(--button-color);
	}

	.filter-icon {
		font-size: 1.1rem;
		flex-shrink: 0;
	}

	.filter-text {
		flex: 1;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.count {
		background-color: rgba(255, 255, 255, 0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.85rem;
		margin-left: auto;
		flex-shrink: 0;
	}

	.sidebar-filter.active .count {
		background-color: rgba(0, 235, 152, 0.2);
	}

	.resources-main {
		min-height: 500px;
	}

	.search-bar {
		margin-bottom: 2rem;
	}

	.search-input {
		width: 100%;
		padding: 1rem 1.5rem;
		background-color: var(--section-bg);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: var(--text-primary);
		font-size: 1rem;
	}

	.search-input::placeholder {
		color: var(--text-secondary);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--button-color);
	}

	.resources-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.no-results {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-secondary);
	}

	@media (max-width: 968px) {
		.sidebar {
			padding: 1rem;
			width: 100%;
			overflow: hidden;
		}

		.sidebar-header {
			margin-bottom: 1rem;
			padding-bottom: 1rem;
		}

		.sidebar-filters {
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			overflow-y: hidden;
			gap: 0.75rem;
			padding-bottom: 0.5rem;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
			-ms-overflow-style: none;
		}

		.sidebar-filters::-webkit-scrollbar {
			display: none;
		}

		.sidebar-filter {
			flex-shrink: 0;
			width: auto;
			min-width: fit-content;
			margin-bottom: 0;
			padding: 0.75rem 1.25rem;
			white-space: nowrap;
		}

		.hero-title {
			font-size: 2.5rem;
			white-space: normal;
		}

		.hero-form {
			flex-direction: column;
		}

		.resources-grid {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: 1.25rem;
		}
	}

	@media (max-width: 640px) {
		.resources-section {
			padding: 2rem 0;
			overflow-x: hidden;
		}

		.resources-layout {
			overflow-x: hidden;
		}

		.sidebar {
			padding: 0.75rem 1rem;
			width: 100%;
			max-width: 100%;
			overflow-x: hidden;
		}

		.sidebar-filters {
			gap: 0.5rem;
			padding-bottom: 0.25rem;
		}

		.sidebar-filter {
			padding: 0.625rem 1rem;
			font-size: 0.9rem;
		}

		.resources-main {
			width: 100%;
			max-width: 100%;
			overflow-x: hidden;
		}

		.resources-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
			width: 100%;
			max-width: 100%;
		}

		.hero {
			padding: 4rem 0;
		}

		.hero-title {
			font-size: 2rem;
			white-space: normal;
		}

		.hero-subtitle {
			font-size: 1rem;
		}
	}
</style>
