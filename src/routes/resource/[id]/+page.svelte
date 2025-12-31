<script lang="ts">
	import type { PageData } from './$types';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	export let data: PageData;
	
	$: resource = data.resource;
	$: category = data.category;
	$: user = data.user;
	$: isAuthenticated = !!user && user.authenticated === true;
	
	function handleDownload() {
		if (!isAuthenticated || !user) {
			// Redirect to Flarum login
			const FLARUM_URL = 'https://ndz.ng';
			window.location.href = `${FLARUM_URL}/login`;
		} else {
			// User is authenticated - handle download
			// TODO: Implement actual download logic
			console.log('Downloading resource:', resource?.id);
		}
	}
	
	const testimonials = [
		{
			name: 'Chiamaka Okafor',
			role: 'Product Designer',
			text: 'These templates saved me weeks of work. The quality is exceptional and exactly what I needed to land my current role.'
		},
		{
			name: 'Tunde Adebayo',
			role: 'Freelance Developer',
			text: 'The proposal templates helped me close 3 major clients in one month. Game changer for my freelance business.'
		},
		{
			name: 'Amina Bello',
			role: 'UX Researcher',
			text: 'I used the case study template and got 5 interview callbacks. The structure is so professional and well thought out.'
		},
		{
			name: 'Emeka Nwosu',
			role: 'Content Strategist',
			text: 'The content calendar template transformed how I plan my work. Everything is so organized and easy to follow.'
		},
		{
			name: 'Folake Adeyemi',
			role: 'Remote Project Manager',
			text: 'The job tracker helped me stay organized during my job search. I landed my dream remote role thanks to this resource.'
		},
		{
			name: 'Kemi Adesanya',
			role: 'Frontend Developer',
			text: 'The portfolio template gave me the confidence to showcase my work properly. Got multiple offers after using it.'
		}
	];
</script>

<svelte:head>
	<title>{resource?.title || 'Resource'} - NDZ Vault</title>
	<meta name="description" content={resource?.description || ''} />
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
</svelte:head>

{#if !resource}
	<div class="error-page">
		<div class="container">
			<h1>Resource not found</h1>
			<p>The resource you're looking for doesn't exist.</p>
			<a href="/" class="back-button">Back to Vault</a>
		</div>
	</div>
{:else}
	<header class="header">
		<div class="container">
			<div class="header-content">
				<a href="/" class="logo-link">
					<img src="/logo.png" alt="NDZ Vault" class="logo" />
				</a>
				<nav class="nav">
					<a href="/" class="nav-link">Back to Vault</a>
				</nav>
			</div>
		</div>
	</header>

	<main class="resource-page">
		<div class="container">
			<!-- Two Column Layout -->
			<section class="landing-layout">
				<!-- Left: Content Section -->
				<div class="content-section">
					<div class="category-badge">
						<span class="badge-dot"></span>
						<span class="badge-text">{category?.name || 'Resource'}</span>
					</div>
					
					<h1 class="resource-title">
						{resource.title}
					</h1>
					<p class="resource-description">{resource.description}</p>

					<div class="benefits-list">
						<div class="benefit-item">
							<div class="benefit-check">✓</div>
							<span>Instant access to professional templates</span>
						</div>
						<div class="benefit-item">
							<div class="benefit-check">✓</div>
							<span>Weekly updates with new resources</span>
						</div>
						<div class="benefit-item">
							<div class="benefit-check">✓</div>
							<span>Join a community of 500+ professionals</span>
						</div>
					</div>
				</div>

				<!-- Right: Download Section -->
				<div class="form-section">
					<div class="form-card">
						{#if isAuthenticated && user}
							<button class="download-button" on:click={handleDownload}>
								<span>Download Resource</span>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="7 10 12 15 17 10"></polyline>
									<line x1="12" y1="15" x2="12" y2="3"></line>
								</svg>
							</button>
						{:else}
							<h2 class="form-title">Get Your Resource</h2>
							<p class="form-subtitle">Unlock Resource by Signing up or login</p>
							<LoginButton returnPath="/resource/{resource.id}" />
							<p class="login-note">
								Don't have an account? 
								<a href="https://ndz.ng/register" target="_blank" rel="noopener noreferrer">Sign up on NDZ</a>
							</p>
						{/if}
					</div>
				</div>
			</section>
		</div>

		<!-- Testimonials Slider -->
		<section class="testimonials-section">
			<div class="testimonials-wrapper">
				<div class="testimonials-track">
					<!-- First set -->
					{#each testimonials as testimonial}
						<div class="testimonial-card">
							<p class="testimonial-text">"{testimonial.text}"</p>
							<div class="testimonial-author">
								<div class="author-info">
									<div class="author-name">{testimonial.name}</div>
									<div class="author-role">{testimonial.role}</div>
								</div>
							</div>
						</div>
					{/each}
					<!-- Duplicate set for seamless loop -->
					{#each testimonials as testimonial}
						<div class="testimonial-card">
							<p class="testimonial-text">"{testimonial.text}"</p>
							<div class="testimonial-author">
								<div class="author-info">
									<div class="author-name">{testimonial.name}</div>
									<div class="author-role">{testimonial.role}</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	</main>
{/if}

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
		text-decoration: none;
	}

	.nav-link:hover {
		color: var(--text-primary);
	}

	.user-name {
		color: var(--text-primary);
		font-size: 0.9rem;
		font-weight: 500;
	}

	.resource-page {
		min-height: calc(100vh - 100px);
		padding: 4rem 0;
		background: var(--background);
	}

	.landing-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
		max-width: 1200px;
		margin: 0 auto;
	}

	.error-page {
		padding: 4rem 0;
		text-align: center;
	}

	.back-button {
		display: inline-block;
		margin-top: 2rem;
		padding: 0.75rem 2rem;
		background: var(--button-color);
		color: var(--button-text);
		font-weight: 600;
		border-radius: 8px;
		transition: transform 0.2s;
		text-decoration: none;
	}

	.back-button:hover {
		transform: translateY(-2px);
	}

	.content-section {
		padding: 2rem 0;
	}

	.category-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 1rem;
		background: rgba(0, 235, 152, 0.1);
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.5px;
		color: var(--button-color);
		margin-bottom: 2rem;
		text-transform: uppercase;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		background: var(--button-color);
		border-radius: 50%;
		display: block;
	}

	.badge-text {
		font-size: 0.7rem;
	}

	.resource-title {
		font-size: 3.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		line-height: 1.1;
		color: var(--text-primary);
		text-transform: capitalize;
	}

	.resource-description {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: 3rem;
		max-width: 500px;
	}

	.benefits-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.benefit-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.benefit-check {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--button-color);
		color: var(--button-text);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.9rem;
		flex-shrink: 0;
	}

	.form-section {
		position: sticky;
		top: 2rem;
		display: flex;
		align-items: center;
		min-height: 100%;
	}

	.form-card {
		background: var(--section-bg);
		border-radius: 16px;
		padding: 2.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-align: center;
		width: 100%;
	}

	.form-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
		text-transform: capitalize;
	}

	.form-subtitle {
		font-size: 0.95rem;
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		text-transform: capitalize;
	}

	.login-section {
		margin-top: 1rem;
	}

	.login-note {
		margin-top: 1.5rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.login-note a {
		color: var(--button-color);
		text-decoration: underline;
	}

	.resource-download {
		margin-top: 1.5rem;
	}

	.download-icon-wrapper {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, rgba(0, 235, 152, 0.2) 0%, rgba(0, 235, 152, 0.05) 100%);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(0, 235, 152, 0.3);
		margin: 0 auto 1.5rem;
	}

	.download-icon {
		font-size: 2.5rem;
	}

	.resource-download h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: var(--text-primary);
		text-transform: capitalize;
	}

	.download-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
		margin: 1.5rem 0;
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

	.download-button {
		width: 100%;
		padding: 1.5rem 2.5rem;
		background: linear-gradient(135deg, var(--button-color) 0%, rgba(0, 235, 152, 0.9) 100%);
		color: var(--button-text);
		font-weight: 600;
		font-size: 1.1rem;
		border-radius: 12px;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		box-shadow: 0 4px 15px rgba(0, 235, 152, 0.2);
		border: none;
		cursor: pointer;
		margin: 0;
	}

	.download-button svg {
		width: 20px;
		height: 20px;
	}

	.download-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(0, 235, 152, 0.4);
	}

	.testimonials-section {
		width: 100%;
		background: var(--section-bg);
		padding: 4rem 0;
		margin-top: 4rem;
		overflow: hidden;
		position: relative;
	}

	.testimonials-wrapper {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.testimonials-track {
		display: flex;
		gap: 2rem;
		width: fit-content;
		animation: slide 60s linear infinite;
	}

	@keyframes slide {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.testimonial-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		padding: 1.5rem;
		width: 320px;
		flex-shrink: 0;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.testimonial-card:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(0, 235, 152, 0.3);
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.testimonial-text {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--text-primary);
		margin-bottom: 1.25rem;
		font-style: italic;
		font-weight: 400;
		flex: 1;
	}

	.testimonial-author {
		display: flex;
		align-items: center;
	}

	.author-info {
		flex: 1;
	}

	.author-name {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
		text-transform: capitalize;
	}

	.author-role {
		font-size: 0.8rem;
		color: var(--text-secondary);
		text-transform: capitalize;
	}

	@media (max-width: 968px) {
		.landing-layout {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.form-section {
			position: static;
		}

		.testimonial-card {
			width: 280px;
		}

		.testimonial-text {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 768px) {
		.resource-page {
			padding: 2rem 0;
		}

		.resource-title {
			font-size: 2.5rem;
		}

		.form-card {
			padding: 2rem 1.5rem;
		}
	}
</style>

