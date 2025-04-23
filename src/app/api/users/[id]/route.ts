// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
	params: {
		id: string;
	};
}

// Get a specific user
export async function GET(request: NextRequest, { params }: Params) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: params.id,
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
export async function PUT(request: NextRequest, { params }: Params) {
	try {
		const body = await request.json();

		const updatedUser = await prisma.user.update({
			where: {
				id: params.id,
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
export async function DELETE(request: NextRequest, { params }: Params) {
	try {
		await prisma.user.delete({
			where: {
				id: params.id,
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
