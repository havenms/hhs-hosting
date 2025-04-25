import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
	// Get auth data
	const { userId } = auth();

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		// In a real app, you'd query your database or Clerk API to get user metadata
		// For this example, we'll use a simpler approach
		const { getAuth } = await import('@clerk/nextjs/server');
		const { sessionClaims } = getAuth();

		// Extract admin status from session claims
		const isAdmin =
			sessionClaims?.metadata?.role === 'admin' ||
			sessionClaims?.metadata?.isAdmin === true;

		// Return the role info
		return NextResponse.json({
			userId,
			isAdmin: Boolean(isAdmin),
			role: isAdmin ? 'admin' : 'user',
		});
	} catch (error) {
		console.error('Error checking user role:', error);
		return NextResponse.json(
			{ error: 'Error checking user role' },
			{ status: 500 }
		);
	}
}
