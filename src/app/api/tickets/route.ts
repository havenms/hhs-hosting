import { NextRequest, NextResponse } from 'next/server';
import { getAuth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
export async function POST(request: NextRequest) {
	try {
		// Get the user ID using getAuth(request)
		const { userId } = getAuth(request);

		// Debug logging
		console.log('User auth in ticket creation:', userId);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Verify user exists in database
		const dbUser = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!dbUser) {
			// User doesn't exist in your database, create them
			try {
				await prisma.user.create({
					data: {
						id: userId,
						role: 'user',
						isAdmin: false,
						// Add other required fields with default values as needed
					},
				});
				console.log(`Created missing user record for ${userId}`);
			} catch (userCreateError) {
				console.error('Error creating user record:', userCreateError);
				// Continue anyway to try creating the ticket
			}
		}

		// Parse request body
		const body = await request.json();
		const { subject, category, description, priority } = body;

		// Validate required fields
		if (!subject || !description) {
			return NextResponse.json(
				{
					error: 'Subject and description are required',
				},
				{ status: 400 }
			);
		}

		// Create ticket in database using proper relation syntax
		const ticket = await prisma.ticket.create({
			data: {
				subject,
				description,
				priority: priority || 'medium',
				category: category || 'general',
				status: 'open',
				user: {
					connect: { id: userId },
				},
			},
		});

		return NextResponse.json({ success: true, ticketId: ticket.id });
	} catch (error) {
		console.error('Error creating ticket (detailed):', error);
		// Return more specific error info in development
		const errorMessage =
			process.env.NODE_ENV === 'development'
				? error.message || 'Unknown error'
				: 'Failed to create ticket';

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		// Get auth data
		const { userId } = getAuth(request);

		console.log('API - Auth userId:', userId);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Check if user is admin - ENHANCED ERROR HANDLING
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { isAdmin: true, role: true, email: true },
		});

		console.log('User DB record:', user);

		// Get user metadata from Clerk directly (without dynamic import)
		let isClerkAdmin = false;
		try {
			// Use clerkClient instead of dynamic import
			const clerkUser = await clerkClient.users.getUser(userId);
			console.log('Clerk metadata:', clerkUser?.publicMetadata);

			isClerkAdmin =
				clerkUser?.publicMetadata?.isAdmin === true ||
				clerkUser?.publicMetadata?.role === 'admin';
		} catch (error) {
			console.warn('Could not fetch Clerk user metadata:', error);
			// Continue with just the database user record
		}

		// Determine admin status from multiple sources
		const isAdminUser =
			user?.isAdmin === true || user?.role === 'admin' || isClerkAdmin;

		console.log('Is admin user:', isAdminUser);
		// Build query conditions
		const whereConditions: Prisma.TicketWhereInput = {};

		// Regular users only see their own tickets, admins see all
		if (!isAdminUser) {
			whereConditions.userId = userId;
			console.log('Filtering by user ID (regular user)');
		} else {
			console.log('No user filter - admin view');
		}

		// Add filters
		const searchTerm = request.nextUrl.searchParams.get('search') || '';
		const statusFilter = request.nextUrl.searchParams.get('status') || '';
		const priorityFilter =
			request.nextUrl.searchParams.get('priority') || '';

		// Add search filter if provided
		if (searchTerm) {
			whereConditions.OR = [
				{ subject: { contains: searchTerm, mode: 'insensitive' } },
				{ description: { contains: searchTerm, mode: 'insensitive' } },
			];
		}

		// Add status filter if provided
		if (statusFilter && statusFilter !== 'all') {
			whereConditions.status = statusFilter;
		}

		// Add priority filter if provided
		if (priorityFilter && priorityFilter !== 'all') {
			whereConditions.priority = priorityFilter;
		}

		console.log('Final query conditions:', whereConditions);

		// Count total tickets for debugging
		const totalTickets = await prisma.ticket.count();
		console.log(`Total tickets in database: ${totalTickets}`);

		// Get tickets with appropriate conditions
		const tickets = await prisma.ticket.findMany({
			where: whereConditions,
			include: {
				user: {
					select: {
						name: true,
						email: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		});

		console.log(
			`Found ${tickets.length} tickets for ${
				isAdminUser ? 'admin' : 'user'
			}`
		);

		// Format tickets for the response
		const formattedTickets = tickets.map((ticket) => ({
			id: ticket.id,
			subject: ticket.subject,
			description: ticket.description,
			status: ticket.status,
			priority: ticket.priority,
			dateOpened: ticket.createdAt.toISOString(),
			lastUpdated: ticket.updatedAt.toISOString(),
			userEmail: ticket.user?.email || 'unknown@example.com',
			userId: ticket.userId,
			clientName: ticket.user?.name || 'Unknown User',
			siteName: ticket.siteName || 'No Site',
			category: ticket.category || 'general',
			assignedTo: ticket.assignedTo || null,
			browser: ticket.browser || null,
			lastUpdateNote: ticket.lastUpdateNote || null,
		}));

		return NextResponse.json(formattedTickets);
	} catch (error) {
		console.error('Error fetching tickets:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch tickets',
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
