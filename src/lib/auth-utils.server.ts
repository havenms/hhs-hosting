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
		// Ensure credentials are included to send cookies
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	});

	if (!response.ok) {
		try {
			const errorData = await response.json();
			throw new Error(
				errorData.error ||
					`API request failed with status ${response.status}`
			);
		} catch (jsonError) {
			throw new Error(
				`API request failed with status ${response.status}`
			);
		}
	}

	return response;
}
