// src/app/api/users/[id]/role/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-utils.server'; // Note the .server
import { clerkClient } from '@clerk/nextjs/server';

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		// Verify the current user is an admin
		const auth = await requireAdmin();
		if (!auth.admin) {
			return auth.error;
		}

		// Get the request body
		const { role, isAdmin: setIsAdmin } = await request.json();

		// Update in Prisma database
		const updatedUser = await prisma.user.update({
			where: { id: params.id },
			data: {
				role: role,
				isAdmin: setIsAdmin,
			},
		});

		// Also update in Clerk
		await clerkClient.users.updateUser(params.id, {
			publicMetadata: {
				role: role,
				isAdmin: setIsAdmin,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error) {
		console.error('Failed to update user role:', error);
		return NextResponse.json(
			{ error: 'Failed to update user role' },
			{ status: 500 }
		);
	}
}
