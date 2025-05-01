import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
	publicRoutes: ['/', '/login', '/signup', '/api/webhooks/(.*)'],
	debug: true, // Enable debug mode to see more info
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
