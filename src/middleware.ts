import { clerkMiddleware } from '@clerk/nextjs/server';

// Configure Clerk middleware with public routes
export default clerkMiddleware({
	publicRoutes: [
		'/',
		'/sign-in(.*)',
		'/sign-up(.*)',
		'/api/webhook/clerk',
		// Add any other public routes here
	],
});

// Use a simpler matcher pattern without complex regex
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the following:
		 * - Static files (files with extensions like .jpg, .png, etc.)
		 * - API webhook paths that should be public
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
		'/api/((?!webhook/clerk).*)', // Protect all API routes except webhook
	],
};
