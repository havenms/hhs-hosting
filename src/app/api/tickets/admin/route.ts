import { NextRequest, NextResponse } from 'next/server';
import { getAuth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

/**
 * Admin-only endpoint to fetch and manage all tickets in the system
 */
export async function GET(request: NextRequest) {
	try {
		// Get auth data
		const { userId } = getAuth(request);
		console.log('Admin API - Auth userId:', userId);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Verify the user has admin privileges
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { isAdmin: true, role: true, email: true },
		});

		console.log('Admin route - User DB record:', user);

		// Get Clerk metadata for additional verification
		let isClerkAdmin = false;
		try {
			const clerkUser = await clerkClient.users.getUser(userId);
			console.log(
				'Admin route - Clerk metadata:',
				clerkUser?.publicMetadata
			);

			// Check each condition individually for better debugging
			const hasClerkAdminRole =
				clerkUser?.publicMetadata?.role === 'admin';
			const hasClerkAdminFlag =
				clerkUser?.publicMetadata?.isAdmin === true;

			console.log('Admin route - Clerk checks:', {
				hasClerkAdminRole,
				hasClerkAdminFlag,
			});

			isClerkAdmin = hasClerkAdminRole || hasClerkAdminFlag;
		} catch (error) {
			console.warn('Could not fetch Clerk user metadata:', error);
			// Continue with just the database user record
		}

		// Check database conditions
		const hasDbAdminRole = user?.role === 'admin';
		const hasDbAdminFlag = user?.isAdmin === true;

		console.log('Admin route - DB checks:', {
			hasDbAdminRole,
			hasDbAdminFlag,
		});

		// Determine admin status from multiple sources
		const isAdmin = hasDbAdminRole || hasDbAdminFlag || isClerkAdmin;

		console.log('Admin route - Final admin status:', isAdmin);

		// For development only - temporary override for testing
		// const isAdmin = true; // REMOVE THIS AFTER DEBUGGING

		// Strict admin check - return 403 if not admin
		if (!isAdmin) {
			console.log('Access denied: User is not an admin');
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		console.log('Admin access granted');

		// Get query params
		const searchTerm = request.nextUrl.searchParams.get('search') || '';
		const statusFilter = request.nextUrl.searchParams.get('status') || '';
		const priorityFilter =
			request.nextUrl.searchParams.get('priority') || '';

		// Build filter conditions
		const whereConditions: any = {};

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

		console.log('Admin query conditions:', whereConditions);

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

		console.log(`Found ${tickets.length} tickets for admin view`);

		// Format tickets for response
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
		console.error('Admin route - Error fetching tickets:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch tickets',
				details: error.message,
			},
			{ status: 500 }
		);
	}
}

/**
 * Admin endpoint to update ticket status, assignment, etc.
 */
export async function PUT(request: NextRequest) {
	try {
		// Get auth data
		const { userId } = getAuth(request);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		// Verify admin status
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { isAdmin: true, role: true },
		});

		const clerkUser = await clerkClient.users.getUser(userId);
		const isAdmin =
			user?.isAdmin === true ||
			user?.role === 'admin' ||
			clerkUser?.publicMetadata?.isAdmin === true ||
			clerkUser?.publicMetadata?.role === 'admin';

		if (!isAdmin) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		// Get request data
		const data = await request.json();
		const { ticketId, status, priority, assignedTo, responseNote } = data;

		if (!ticketId) {
			return NextResponse.json(
				{ error: 'Ticket ID is required' },
				{ status: 400 }
			);
		}

		// Update the ticket
		const updatedTicket = await prisma.ticket.update({
			where: { id: ticketId },
			data: {
				...(status && { status }),
				...(priority && { priority }),
				...(assignedTo && { assignedTo }),
				...(responseNote && {
					lastUpdateNote: responseNote,
					// If status is being changed to closed, record resolution details
					...(status === 'closed' && {
						resolution: responseNote,
						closedDate: new Date(),
						closedBy: user?.name || userId,
					}),
				}),
				updatedAt: new Date(),
			},
		});

		return NextResponse.json({
			success: true,
			ticket: updatedTicket,
		});
	} catch (error) {
		console.error('Admin route - Error updating ticket:', error);
		return NextResponse.json(
			{
				error: 'Failed to update ticket',
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
