import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

// Get responses for a ticket
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { userId } = getAuth(request);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		console.log('Fetching responses for ticket:', params.id);

		// Check if user is admin
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { isAdmin: true, role: true },
		});

		const isAdmin = user?.isAdmin === true || user?.role === 'admin';

		// Query condition based on user role
		const whereCondition = isAdmin
			? { id: params.id } // Admin can see any ticket
			: { id: params.id, userId }; // Regular users can only see their own tickets

		// First verify the ticket exists and user has access
		const ticket = await prisma.ticket.findUnique({
			where: whereCondition,
		});

		if (!ticket) {
			return NextResponse.json(
				{ error: 'Ticket not found' },
				{ status: 404 }
			);
		}

		// Get responses for this ticket
		const responses = await prisma.ticketResponse.findMany({
			where: { ticketId: params.id },
			orderBy: { createdAt: 'asc' },
		});

		return NextResponse.json(responses);
	} catch (error) {
		console.error('Error fetching ticket responses:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch responses',
				details: error.message,
			},
			{ status: 500 }
		);
	}
}

// Add a response to a ticket
export async function POST(
	request: NextRequest,
	context:  { params: { id: string } }
) {
	try {
		const { userId } = getAuth(request);
		const { id } = context.params

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		console.log('Adding response to ticket:', id);

		// Get the request data
		const { message, url, urlLabel } = await request.json();

		if (!message || !message.trim()) {
			return NextResponse.json(
				{ error: 'Message is required' },
				{ status: 400 }
			);
		}

		// Get user info (for admin check)
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { isAdmin: true, role: true, name: true, email: true },
		});

		const isAdmin = user?.isAdmin === true || user?.role === 'admin';

		if (!isAdmin) {
			// For non-admin users, check if the ticket belongs to them
			const ticket = await prisma.ticket.findUnique({
				where: {
					id: params.id,
					userId,
				},
			});

			if (!ticket) {
				return NextResponse.json(
					{ error: 'Ticket not found' },
					{ status: 404 }
				);
			}
		}

		// Create the response
		const response = await prisma.ticketResponse.create({
			data: {
				message,
				url: url || null,
				urlLabel: urlLabel || null,
				ticketId: params.id,
				userId,
				authorName:
					user?.name || (isAdmin ? 'Support Agent' : 'Client'),
				authorEmail: user?.email,
				isAdminResponse: isAdmin,
			},
		});

		// Update ticket status and timestamp
		await prisma.ticket.update({
			where: { id: params.id },
			data: {
				status: isAdmin ? 'in-progress' : 'open', // If admin replies, set to in-progress
				updatedAt: new Date(),
				lastUpdateNote: isAdmin
					? `Response added by support agent`
					: `Response added by client`,
			},
		});

		return NextResponse.json({
			success: true,
			response,
		});
	} catch (error) {
		console.error('Error adding ticket response:', error);
		return NextResponse.json(
			{
				error: 'Failed to add response',
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
