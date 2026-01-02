// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				authenticated: boolean;
			} | null;
		}
		interface PageData {
			user?: {
				id: number;
				username: string;
				displayName: string;
				email: string;
				avatarUrl: string | null;
				authenticated: boolean;
				hasAccess?: boolean;
			} | null;
			hasAccess?: boolean;
		}
		interface LayoutData {
			user?: {
				id: number;
				username: string;
				displayName: string;
				email: string;
				avatarUrl: string | null;
				hasAccess?: boolean;
			} | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
