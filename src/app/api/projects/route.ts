import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
	try {
		const { userId } = getAuth(request);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Fetch projects from your database
		const projects = await prisma.project.findMany({
			include: {
				user: true,
				timeline: true,
				pendingActions: true,
			},
		});

		return NextResponse.json(projects);
	} catch (error) {
		console.error('Error fetching projects:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch projects' },
			{ status: 500 }
		);
	}
}
