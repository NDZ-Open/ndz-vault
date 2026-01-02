export interface Resource {
	id: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	icon: string;
	isUnlocked?: boolean;
	voteCount?: number;
}

export interface Category {
	id: string;
	name: string;
	icon: string;
}

export const categories: Category[] = [
	{ id: 'career-remote', name: 'Career & Remote Work', icon: '💼' },
	{ id: 'freelancing', name: 'Freelancing & Consulting', icon: '🎯' },
	{ id: 'design', name: 'Design', icon: '🎨' },
	{ id: 'product-tech', name: 'Product & Tech', icon: '💻' },
	{ id: 'productivity', name: 'Productivity', icon: '⚡' },
	{ id: 'personal-systems', name: 'Personal Systems', icon: '📋' },
	{ id: 'learning', name: 'Learning', icon: '📚' },
	{ id: 'personal-dev', name: 'Personal Development', icon: '🌱' },
	{ id: 'content', name: 'Content & Branding', icon: '✍️' },
	{ id: 'ndz-community', name: 'NDZ Community', icon: '✨' }
];

export const resources: Resource[] = [
	// Personal Systems
	{
		id: 'plan-your-life',
		title: 'Plan your Life',
		description: 'A comprehensive life planning framework to help you define your values, set meaningful goals, and create a roadmap for the life you want to live.',
		category: 'personal-systems',
		tags: ['Planning', 'Life Goals', 'Personal Development'],
		icon: '🧭',
		isUnlocked: true
	},
	
	// Career & Remote Work
	{
		id: 'remote-cv-templates',
		title: 'Remote-job CV templates',
		description: 'Professional CV templates tailored for junior dev, designer, PM, VA, copywriter roles. Stand out in remote job applications.',
		category: 'career-remote',
		tags: ['CV', 'Resume', 'Remote Work'],
		icon: '📄'
	},
	{
		id: 'linkedin-templates',
		title: 'LinkedIn profile headline + About section templates',
		description: 'High-converting LinkedIn profile templates that get you noticed by recruiters and hiring managers.',
		category: 'career-remote',
		tags: ['LinkedIn', 'Profile', 'Networking'],
		icon: '💼'
	},
	{
		id: 'cold-email-scripts',
		title: 'Cold email / DM scripts for remote roles',
		description: 'Proven email and DM templates that get responses from hiring managers and recruiters.',
		category: 'career-remote',
		tags: ['Email', 'Outreach', 'Networking'],
		icon: '📧'
	},
	{
		id: 'portfolio-template',
		title: 'Portfolio one-pager template',
		description: 'A clean, conversion-focused one-page portfolio template that showcases your best work.',
		category: 'career-remote',
		tags: ['Portfolio', 'Design', 'Showcase'],
		icon: '🎨'
	},
	{
		id: 'interview-prep',
		title: 'Interview prep question banks and answer frameworks',
		description: 'Comprehensive question banks with proven answer frameworks for technical and behavioral interviews.',
		category: 'career-remote',
		tags: ['Interview', 'Prep', 'Career'],
		icon: '🎤'
	},
	{
		id: 'job-tracker',
		title: 'Remote-job application tracker',
		description: 'Organized Notion/Sheets template to track all your job applications, follow-ups, and outcomes.',
		category: 'career-remote',
		tags: ['Tracker', 'Organization', 'Notion'],
		icon: '📊'
	},
	
	// Freelancing & Consulting
	{
		id: 'freelance-offer-sheets',
		title: 'Freelance offer sheets',
		description: 'Professional offer sheets for copy, design, dev, VA, and strategy services. Close more deals with clear proposals.',
		category: 'freelancing',
		tags: ['Proposal', 'Freelance', 'Sales'],
		icon: '📋'
	},
	{
		id: 'proposal-invoice-templates',
		title: 'Proposal and invoice templates',
		description: 'Ready-to-use proposal and invoice templates that look professional and get you paid faster.',
		category: 'freelancing',
		tags: ['Invoice', 'Proposal', 'Business'],
		icon: '💰'
	},
	{
		id: 'client-onboarding',
		title: 'Client onboarding questionnaire',
		description: 'Comprehensive questionnaire template to gather all necessary information from new clients efficiently.',
		category: 'freelancing',
		tags: ['Onboarding', 'Client', 'Process'],
		icon: '📝'
	},
	{
		id: 'pricing-calculators',
		title: 'Pricing calculators and rate-setting worksheets',
		description: 'Tools to help you set the right prices for your services and calculate project costs accurately.',
		category: 'freelancing',
		tags: ['Pricing', 'Calculator', 'Business'],
		icon: '🧮'
	},
	{
		id: 'upwork-fiverr-profiles',
		title: 'Upwork / Fiverr profile outlines',
		description: 'Optimized profile templates for Upwork and Fiverr that attract high-quality clients.',
		category: 'freelancing',
		tags: ['Upwork', 'Fiverr', 'Profile'],
		icon: '🌐'
	},
	{
		id: 'contract-templates',
		title: 'Contract / scope-of-work starter templates',
		description: 'Legal-ready contract and scope-of-work templates to protect yourself and set clear expectations.',
		category: 'freelancing',
		tags: ['Contract', 'Legal', 'Scope'],
		icon: '📜'
	},
	
	// Design
	{
		id: 'figma-starter-kits',
		title: 'Figma UI starter kits',
		description: 'Professional Figma starter kits for landing pages, dashboards, and mobile apps. Speed up your design process.',
		category: 'design',
		tags: ['Figma', 'UI', 'Design'],
		icon: '🎨'
	},
	{
		id: 'ux-case-study-templates',
		title: 'UX case-study templates',
		description: 'Beautiful case-study templates in Notion, Google Docs, and PDF formats to showcase your UX work.',
		category: 'design',
		tags: ['UX', 'Case Study', 'Portfolio'],
		icon: '📱'
	},
	{
		id: 'user-interview-scripts',
		title: 'User interview and usability test scripts',
		description: 'Proven scripts for conducting user interviews and usability tests that yield actionable insights.',
		category: 'design',
		tags: ['Research', 'Interview', 'UX'],
		icon: '🎯'
	},
	
	// Product & Tech
	{
		id: 'product-spec-template',
		title: 'Product spec / PRD template',
		description: 'Comprehensive product requirements document template to align teams and build better products.',
		category: 'product-tech',
		tags: ['PRD', 'Product', 'Spec'],
		icon: '📐'
	},
	{
		id: 'roadmap-templates',
		title: 'Roadmap and feature-prioritization boards',
		description: 'Strategic roadmap templates and prioritization frameworks to plan product development effectively.',
		category: 'product-tech',
		tags: ['Roadmap', 'Planning', 'Product'],
		icon: '🗺️'
	},
	{
		id: 'analytics-tracking-plan',
		title: 'Simple analytics/event tracking plan template',
		description: 'A clear framework for planning what to track and measure in your product or website.',
		category: 'product-tech',
		tags: ['Analytics', 'Tracking', 'Data'],
		icon: '📈'
	},
	
	// Productivity
	{
		id: 'deep-work-planner',
		title: 'Deep work time-blocking planner',
		description: 'A focused time-blocking system to maximize your deep work sessions and productivity.',
		category: 'productivity',
		tags: ['Time Management', 'Focus', 'Planning'],
		icon: '⏰'
	},
	{
		id: 'ideal-week-planner',
		title: 'Ideal week planner',
		description: 'Customizable weekly planners for students, 9-5 + side project workers, and freelancers.',
		category: 'productivity',
		tags: ['Planning', 'Weekly', 'Organization'],
		icon: '📅'
	},
	{
		id: 'review-checklists',
		title: 'Daily and weekly review checklists',
		description: 'Structured review checklists to reflect, plan, and continuously improve your workflow.',
		category: 'productivity',
		tags: ['Review', 'Reflection', 'Planning'],
		icon: '✅'
	},
	{
		id: 'distraction-reduction',
		title: 'Distraction-reduction / phone detox checklist',
		description: 'Practical strategies and checklists to minimize distractions and reclaim your focus.',
		category: 'productivity',
		tags: ['Focus', 'Distraction', 'Wellness'],
		icon: '🔕'
	},
	{
		id: 'ndz-productivity-kickstart',
		title: 'NDZ productivity kickstart course',
		description: '1-hour live or recorded course to jumpstart your productivity journey with proven NDZ frameworks and systems.',
		category: 'productivity',
		tags: ['Exclusive', 'Course', 'Kickstart', 'Productivity'],
		icon: '🚀',
		isUnlocked: true
	},
	{
		id: '30-day-journaling-prompts',
		title: '30-day guided journaling prompts',
		description: 'Daily journaling prompts in PDF format to build self-awareness, clarity, and intentional living habits.',
		category: 'productivity',
		tags: ['Exclusive', 'Journaling', 'PDF', 'Daily Practice'],
		icon: '📔',
		isUnlocked: true
	},
	{
		id: 'weekly-review-time-blocking',
		title: 'Weekly review and time-blocking templates',
		description: 'Printable and digital templates (Notion/Google Docs) for weekly reviews and effective time-blocking strategies.',
		category: 'productivity',
		tags: ['Exclusive', 'Time-Blocking', 'Templates', 'Weekly Review'],
		icon: '📅'
	},
	{
		id: '14-day-accountability-sprint',
		title: '14-day accountability sprint',
		description: 'Structured 14-day program with daily check-ins via WhatsApp, Telegram, or email to build consistency and momentum.',
		category: 'productivity',
		tags: ['Exclusive', 'Accountability', 'Sprint', 'Check-ins'],
		icon: '💪'
	},
	{
		id: 'ndz-productivity-toolkit',
		title: 'NDZ productivity toolkit',
		description: 'Curated collection of productivity apps and tools with a comprehensive guide on how to integrate them with your journaling practice.',
		category: 'productivity',
		tags: ['Exclusive', 'Toolkit', 'Apps', 'Integration Guide'],
		icon: '🛠️'
	},
	{
		id: 'micro-training-pack',
		title: 'Micro-training pack: planning and focus videos',
		description: '5 short video tutorials covering essential productivity skills: planning, focus techniques, and weekly review systems.',
		category: 'productivity',
		tags: ['Exclusive', 'Training', 'Videos', 'Micro-Learning'],
		icon: '🎥'
	},
	
	// Personal Systems
	{
		id: 'habit-tracker',
		title: '30-day habit tracker',
		description: 'Printable and Notion-based habit tracker to build consistency and track your progress.',
		category: 'personal-systems',
		tags: ['Habits', 'Tracking', 'Personal Growth'],
		icon: '📊'
	},
	{
		id: '90-day-roadmap',
		title: '90-day execution roadmap template',
		description: 'A strategic 90-day planning framework to execute on your biggest goals and projects.',
		category: 'personal-systems',
		tags: ['Planning', 'Goals', 'Strategy'],
		icon: '🗓️'
	},
	
	// Learning
	{
		id: 'learning-roadmaps',
		title: '6-month learning roadmap templates',
		description: 'Structured learning paths for UI/UX, frontend, data, copy, and PM. Plan your skill development journey.',
		category: 'learning',
		tags: ['Learning', 'Roadmap', 'Skills'],
		icon: '🗺️'
	},
	{
		id: 'note-taking-templates',
		title: 'Reading / course note-taking templates',
		description: 'Effective note-taking templates to capture and retain knowledge from books and courses.',
		category: 'learning',
		tags: ['Notes', 'Learning', 'Education'],
		icon: '📝'
	},
	{
		id: '30-day-challenges',
		title: '30-day challenge frameworks',
		description: 'Proven frameworks for 30-day challenges in portfolio building, writing, outreach, and coding.',
		category: 'learning',
		tags: ['Challenge', 'Growth', 'Practice'],
		icon: '🔥'
	},
	
	// Personal Development
	{
		id: 'reflection-prompts',
		title: 'Reflection and journaling prompt packs',
		description: 'Thought-provoking prompts to deepen self-awareness and accelerate personal growth.',
		category: 'personal-dev',
		tags: ['Journaling', 'Reflection', 'Personal Growth'],
		icon: '📔'
	},
	{
		id: 'personal-os-canvas',
		title: 'Personal operating system canvas',
		description: 'A framework to define your values, priorities, and personal rules for living intentionally.',
		category: 'personal-dev',
		tags: ['Values', 'Planning', 'Personal System'],
		icon: '🧭'
	},
	{
		id: 'skill-stack-map',
		title: 'Skill-stack map template',
		description: 'Visualize how your current skills connect to money-making opportunities and career paths.',
		category: 'personal-dev',
		tags: ['Skills', 'Career', 'Planning'],
		icon: '🗂️'
	},
	
	// Content & Branding
	{
		id: 'personal-brand-template',
		title: 'Personal brand one-pager template',
		description: 'A concise one-page template to define and communicate your personal brand effectively.',
		category: 'content',
		tags: ['Branding', 'Personal Brand', 'Marketing'],
		icon: '🎯'
	},
	{
		id: 'landing-page-wireframe',
		title: 'Simple landing page / bio site wireframe',
		description: 'Clean wireframe templates for personal landing pages and bio sites that convert.',
		category: 'content',
		tags: ['Landing Page', 'Wireframe', 'Design'],
		icon: '🖼️'
	},
	{
		id: 'content-calendar',
		title: 'Newsletter / content calendar templates',
		description: 'Organized content calendar templates to plan and execute your newsletter and content strategy.',
		category: 'content',
		tags: ['Content', 'Calendar', 'Newsletter'],
		icon: '📅'
	},
	{
		id: 'podcast-outline',
		title: 'Podcast or YouTube episode outline templates',
		description: 'Structured outline templates to create engaging podcast episodes and YouTube videos.',
		category: 'content',
		tags: ['Podcast', 'YouTube', 'Content'],
		icon: '🎙️'
	},
	
	// NDZ Community
	{
		id: 'community-engagement',
		title: 'Community engagement checklist',
		description: 'A weekly checklist of actions to maximize your engagement and value within the NDZ community.',
		category: 'ndz-community',
		tags: ['Community', 'Engagement', 'NDZ'],
		icon: '👥'
	},
	{
		id: 'ndz-onboarding',
		title: '"First 7 days in NDZ" onboarding checklist + tracker',
		description: 'Your complete guide to getting started in NDZ, with a tracker to ensure you hit all the key milestones.',
		category: 'ndz-community',
		tags: ['Onboarding', 'NDZ', 'Community'],
		icon: '🚀'
	}
];

export function getResourcesByCategory(categoryId: string): Resource[] {
	return resources.filter(r => r.category === categoryId);
}

export function getResourceById(id: string): Resource | undefined {
	return resources.find(r => r.id === id);
}

export function getAllResources(): Resource[] {
	return resources;
}
