// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/clerk-sdk-node';
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

		// Create Clerk client once and reuse it
		const clerk = createClerkClient({
			secretKey: process.env.CLERK_SECRET_KEY,
		});

		// Fetch current user and check if admin
		let clerkUser;
		let isAdmin = false;
		try {
			clerkUser = await clerk.users.getUser(userId);
			console.log(
				'API Route - User metadata:',
				clerkUser?.publicMetadata
			);

			isAdmin =
				clerkUser?.publicMetadata?.role === 'admin' ||
				clerkUser?.publicMetadata?.isAdmin === true;
		} catch (error) {
			console.error('Error fetching Clerk user:', error);
			// Check database for admin status as fallback
			try {
				const dbUser = await prisma.user.findUnique({
					where: { id: userId },
					select: { isAdmin: true, role: true },
				});

				console.log('Admin route - User DB record:', dbUser);

				isAdmin = dbUser?.isAdmin === true || dbUser?.role === 'admin';
				console.log('Admin route - DB checks:', {
					hasDbAdminRole: dbUser?.role === 'admin',
					hasDbAdminFlag: dbUser?.isAdmin === true,
				});
			} catch (dbError) {
				console.error('Error checking DB for admin status:', dbError);
			}
		}

		if (!isAdmin) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		// Get all users from Clerk (reusing clerk client)
		let clerkUsers = [];
		try {
			const response = await clerk.users.getUserList();
			clerkUsers = response.data || [];
		} catch (error) {
			console.error('Failed to fetch users from Clerk:', error);
			// Continue with empty array
		}

		// Get users from database with fixed query
		const dbUsers = await prisma.user.findMany({
			include: {
				sites: true,
				tickets: true,
				editRequests: true,
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

		// Add database users that might not be in Clerk
		dbUsers.forEach((dbUser) => {
			if (!users.some((user) => user.id === dbUser.id)) {
				users.push({
					id: dbUser.id,
					name: dbUser.name || 'Database User',
					email: dbUser.email || '',
					signupDate: dbUser.createdAt,
					status: dbUser.status || 'active',
					sites: dbUser.sites?.length || 0,
					tickets: dbUser.tickets?.length || 0,
					editRequests: dbUser.editRequests?.length || 0,
					phone: dbUser.phoneNumber || '',
					company: dbUser.company || '',
					plan: dbUser.plan || '',
					nextBillingDate: dbUser.nextBillingDate || null,
					paymentMethod: dbUser.paymentMethod || '',
					billingHistory: dbUser.billingHistory || [],
					isAdmin: dbUser.isAdmin || false,
					role: dbUser.role || 'user',
				});
			}
		});

		return NextResponse.json(users);
	} catch (error) {
		console.error('Failed to fetch users:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch users', details: error.message },
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
