import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

/**
 * Route to set a user as admin in the database (for development use)
 */
export async function POST(request: NextRequest) {
	try {
		const { userId } = getAuth(request);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Update user record to have admin privileges
		const updatedUser = await prisma.user.upsert({
			where: { id: userId },
			update: {
				isAdmin: true,
				role: 'admin',
			},
			create: {
				id: userId,
				isAdmin: true,
				role: 'admin',
				name: 'Admin User', // Default name
				email: 'admin@example.com', // Will be overwritten later if needed
			},
		});

		return NextResponse.json({
			success: true,
			message: 'User admin status updated successfully',
			user: {
				id: updatedUser.id,
				isAdmin: updatedUser.isAdmin,
				role: updatedUser.role,
			},
		});
	} catch (error) {
		console.error('Error updating admin status:', error);
		return NextResponse.json(
			{ error: 'Failed to update admin status', details: error.message },
			{ status: 500 }
		);
	}
}
