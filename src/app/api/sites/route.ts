// src/app/api/sites/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Get all sites
export async function GET() {
	try {
		const sites = await prisma.site.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});

		return NextResponse.json(sites);
	} catch (error) {
		console.error('Failed to fetch sites:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch sites' },
			{ status: 500 }
		);
	}
}

// Create site
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const site = await prisma.site.create({
			data: {
				siteName: body.siteName,
				domain: body.domain,
				stage: body.stage || 'requirements',
				progress: body.progress || 0,
				userId: body.userId,
			},
		});

		return NextResponse.json(site, { status: 201 });
	} catch (error) {
		console.error('Failed to create site:', error);
		return NextResponse.json(
			{ error: 'Failed to create site' },
			{ status: 500 }
		);
	}
}
