// src/app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
	try {
		// Try counting users as a simple database connectivity test
		const count = await prisma.user.count();

		return NextResponse.json({
			success: true,
			message: 'Successfully connected to database',
			count: count,
		});
	} catch (error) {
		console.error('Database connection error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to connect to database',
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
