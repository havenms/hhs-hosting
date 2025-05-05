// src/app/api/users/[id]/role/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-utils.server';
import { clerkClient } from '@clerk/nextjs/server';

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;

		// Verify the current user is an admin
		const auth = await requireAdmin();
		if (!auth.admin) {
			return auth.error;
		}

		// Get the request body
		const { role, isAdmin: setIsAdmin } = await req.json();

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
		console.error('Error updating user role:', error);
		return NextResponse.json(
			{
				error: 'Failed to update user role',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
