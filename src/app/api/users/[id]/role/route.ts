// src/app/api/users/[id]/role/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-utils.server'; // Note the .server
import { clerkClient } from '@clerk/nextjs/server';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export async function PUT(
	request: Request,
	context: { params: { id: string } }
) {
	try {
		const { id } = context.params;

		// Verify the current user is an admin
		const auth = await requireAdmin();
		if (!auth.admin) {
			return auth.error;
		}

		// Get the request body
		const { role, isAdmin: setIsAdmin } = await request.json();

		// Update in Prisma database
		const updatedUser = await prisma.user.update({
			where: { id },
			data: {
				role: role,
				isAdmin: setIsAdmin,
			},
		});

		// Also update in Clerk
		await clerkClient.users.updateUser(id, {
			publicMetadata: {
				role: role,
				isAdmin: setIsAdmin,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error) {
		// Error handling...
	}
}

// Get responses for a ticket
export async function GET(
	request: NextRequest,
	context: { params: { id: string } }
) {
	try {
		const { userId } = getAuth(request);
		const { id } = context.params; // Extract ID from context

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		console.log('Fetching responses for ticket:', id);

		// Use id instead of params.id throughout
		// Rest of your function...
	} catch (error) {
		// Error handling...
	}
}

// Add a response to a ticket
export async function POST(
	request: NextRequest,
	context: { params: { id: string } }
) {
	try {
		const { userId } = getAuth(request);
		const { id } = context.params; // Extract ID from context

		// Rest of your function using id instead of params.id...
	} catch (error) {
		// Error handling...
	}
}
