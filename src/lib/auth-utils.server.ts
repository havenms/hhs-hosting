import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function requireAdmin() {
	const { userId } = auth();

	if (!userId) {
		return {
			authenticated: false,
			admin: false,
			error: NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			),
		};
	}

	try {
		const user = await clerkClient.users.getUser(userId);
		const isAdmin = user.publicMetadata?.role === 'admin';

		if (!isAdmin) {
			return {
				authenticated: true,
				admin: false,
				error: NextResponse.json(
					{ error: 'Forbidden' },
					{ status: 403 }
				),
			};
		}

		return {
			authenticated: true,
			admin: true,
			userId,
		};
	} catch (error) {
		console.error('Error checking admin status:', error);
		return {
			authenticated: false,
			admin: false,
			error: NextResponse.json(
				{ error: 'Authentication error' },
				{ status: 500 }
			),
		};
	}
}

export async function authFetch(url: string, options: RequestInit = {}) {
	const response = await fetch(url, {
		...options,
		credentials: 'include', // Important for sending cookies
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	});

	if (!response.ok) {
		// Try to get more details from the error
		try {
			const errorData = await response.json();
			throw new Error(
				errorData.error ||
					`API request failed with status ${response.status}`
			);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (jsonError) {
			throw new Error(
				`API request failed with status ${response.status}`
			);
		}
	}

	return response;
}
