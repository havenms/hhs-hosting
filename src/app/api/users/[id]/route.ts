// src/app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Get a specific user
export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;

		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
			include: {
				sites: true,
				tickets: true,
				editRequests: true,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(user);
	} catch (error) {
		console.error('Failed to fetch user:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch user' },
			{ status: 500 }
		);
	}
}

// Update a user
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		const body = await req.json();

		const updatedUser = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				name: body.name,
				email: body.email,
				isAdmin: body.isAdmin,
				role: body.role,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error) {
		console.error('Failed to update user:', error);
		return NextResponse.json(
			{ error: 'Failed to update user' },
			{ status: 500 }
		);
	}
}

// Delete a user
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;

		await prisma.user.delete({
			where: {
				id: id,
			},
		});

		return NextResponse.json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error('Failed to delete user:', error);
		return NextResponse.json(
			{ error: 'Failed to delete user' },
			{ status: 500 }
		);
	}
}
