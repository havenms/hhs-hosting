// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { createClerkClient } from '@clerk/backend';

export async function GET(request: NextRequest) {
	try {
		// Switch to getAuth and pass the request explicitly
		const { userId } = getAuth(request);

		console.log('API Route - Auth userId with request:', userId);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Create a direct instance of Clerk client instead of using the imported one
		const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

		// Get user data from Clerk
		try {
			const adminUser = await clerk.users.getUser(userId);
			console.log('API Route - User metadata:', adminUser.publicMetadata);

			const isAdmin =
				adminUser.publicMetadata?.role === 'admin' ||
				adminUser.publicMetadata?.isAdmin === true;

			if (!isAdmin) {
				return NextResponse.json(
					{ error: 'Forbidden' },
					{ status: 403 }
				);
			}

			// Get all users from Clerk
			const { data: clerkUsers } = await clerk.users.getUserList();

			// Map to the format your frontend expects
			const users = clerkUsers.map((clerkUser) => ({
				id: clerkUser.id,
				name:
					clerkUser.firstName && clerkUser.lastName
						? `${clerkUser.firstName} ${clerkUser.lastName}`
						: clerkUser.username ||
						  clerkUser.emailAddresses[0]?.emailAddress ||
						  'No Name',
				email: clerkUser.emailAddresses[0]?.emailAddress || '',
				isAdmin: clerkUser.publicMetadata?.isAdmin === true,
				role: clerkUser.publicMetadata?.role || 'user',
				_count: {
					sites: 0,
					tickets: 0,
					editRequests: 0,
				},
			}));

			return NextResponse.json(users);
		} catch (clerkError) {
			console.error('Clerk API error:', clerkError);
			return NextResponse.json(
				{ error: 'Failed to access user data' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Failed to fetch users:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch users' },
			{ status: 500 }
		);
	}
}

// Create user
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const user = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				isAdmin: body.isAdmin || false,
				role: body.role || 'user',
			},
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		console.error('Failed to create user:', error);
		return NextResponse.json(
			{ error: 'Failed to create user' },
			{ status: 500 }
		);
	}
}
