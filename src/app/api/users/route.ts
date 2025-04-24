// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
	try {
		// Get auth from request
		const { userId } = getAuth(request);
		console.log('API Route - Auth userId with request:', userId);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Create Clerk client
		const clerk = createClerkClient({
			secretKey: process.env.CLERK_SECRET_KEY,
		});

		// Get admin user
		const adminUser = await clerk.users.getUser(userId);
		console.log('API Route - User metadata:', adminUser.publicMetadata);

		// Check if admin
		const isAdmin =
			adminUser.publicMetadata?.role === 'admin' ||
			adminUser.publicMetadata?.isAdmin === true;

		if (!isAdmin) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		// Get all users from Clerk
		const { data: clerkUsers } = await clerk.users.getUserList();

		// Get users from database with fixed query
		const dbUsers = await prisma.user.findMany({
			include: {
				sites: true,
				tickets: true, // Include all tickets
				editRequests: true, // Include all edit requests
				billingHistory: true,
			},
		});

		// Combine data from Clerk and your database
		const users = clerkUsers.map((clerkUser) => {
			const dbUser = dbUsers.find((u) => u.id === clerkUser.id);

			return {
				id: clerkUser.id,
				name:
					`${clerkUser.firstName || ''} ${
						clerkUser.lastName || ''
					}`.trim() ||
					clerkUser.emailAddresses[0]?.emailAddress.split('@')[0] ||
					'No Name',
				email: clerkUser.emailAddresses[0]?.emailAddress || '',
				signupDate: clerkUser.createdAt,
				status: dbUser?.status || 'active',
				sites: dbUser?.sites?.length || 0,
				tickets: dbUser?.tickets?.length || 0,
				editRequests: dbUser?.editRequests?.length || 0,
				phone: dbUser?.phoneNumber || '',
				company: dbUser?.company || '',
				plan: dbUser?.plan || '',
				nextBillingDate: dbUser?.nextBillingDate || null,
				paymentMethod: dbUser?.paymentMethod || '',
				billingHistory: dbUser?.billingHistory || [],
				isAdmin: clerkUser.publicMetadata?.isAdmin === true,
				role: clerkUser.publicMetadata?.role || 'user',
			};
		});

		return NextResponse.json(users);
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
