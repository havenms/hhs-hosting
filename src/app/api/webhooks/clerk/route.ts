// src/app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	// Get the webhook secret
	const WEBHOOK_SECRET = process.env.SIGNING_SECRET;

	if (!WEBHOOK_SECRET) {
		return new Response('Webhook secret not provided', { status: 500 });
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Missing svix headers', { status: 400 });
	}

	// Get the body
	const payload = await req.text();
	const body = JSON.parse(payload);

	// Create a new Svix instance with your secret
	const wh = new Webhook(WEBHOOK_SECRET);

	try {
		// Verify the webhook
		wh.verify(payload, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		});

		// Handle user.created event
		if (body.type === 'user.created') {
			await handleUserCreated(body.data);
		}

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error verifying webhook', { status: 400 });
	}
}

// Handle user creation in Clerk
async function handleUserCreated(userData) {
	try {
		// Check if this is the first user in the system
		const userCount = await prisma.user.count();
		const isFirstUser = userCount === 0;

		// Create the user in your database
		await prisma.user.create({
			data: {
				id: userData.id,
				name:
					`${userData.first_name || ''} ${
						userData.last_name || ''
					}`.trim() ||
					userData.username ||
					'User',
				email: userData.email_addresses[0]?.email_address,
				isAdmin: isFirstUser, // First user is admin
				role: isFirstUser ? 'admin' : 'user',
			},
		});

		// If this is the first user, set them as admin in Clerk metadata
		if (isFirstUser) {
			await clerkClient.users.updateUser(userData.id, {
				publicMetadata: { role: 'admin', isAdmin: true },
			});
		}

		// Add this direct SQL check to fix first user if needed
		await clerkClient.users.updateUser(userData.id, {
			publicMetadata: {
				role: 'admin', // String value
				isAdmin: true, // Boolean value (both formats for compatibility)
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error creating user in database:', error);
		return NextResponse.json(
			{ error: 'Failed to create user' },
			{ status: 500 }
		);
	}
}
