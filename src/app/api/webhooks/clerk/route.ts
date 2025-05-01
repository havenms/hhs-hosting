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
		console.log('Creating user in database:', userData.id);

		// Check if this is an admin email (example rule)
		const isAdmin =
			userData.emailAddress?.includes('@havenmediasolutions.com') ||
			userData.emailAddress === 'smsugrue@gmail.com';

		// Create user in your database
		await prisma.user.create({
			data: {
				id: userData.id,
				name: `${userData.firstName || ''} ${
					userData.lastName || ''
				}`.trim(),
				email: userData.emailAddress,
				isAdmin: isAdmin,
				role: isAdmin ? 'admin' : 'user',
			},
		});

		// Update Clerk user metadata
		await clerkClient.users.updateUser(userData.id, {
			publicMetadata: {
				role: isAdmin ? 'admin' : 'user',
				isAdmin: isAdmin,
			},
		});

		console.log(`User created with admin status: ${isAdmin}`);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error creating user in database:', error);
		return NextResponse.json(
			{ error: 'Failed to create user' },
			{ status: 500 }
		);
	}
}
