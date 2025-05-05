import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

// Get responses for a ticket
export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { userId } = getAuth(req);
		const { id } = params;

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		console.log('Fetching responses for ticket:', id);

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { isAdmin: true, role: true },
		});

		const isAdmin = user?.isAdmin === true || user?.role === 'admin';

		const whereCondition = isAdmin ? { id } : { id, userId };

		const ticket = await prisma.ticket.findUnique({
			where: whereCondition,
		});

		if (!ticket) {
			return NextResponse.json(
				{ error: 'Ticket not found' },
				{ status: 404 }
			);
		}

		const responses = await prisma.ticketResponse.findMany({
			where: { ticketId: id },
			orderBy: { createdAt: 'asc' },
		});

		return NextResponse.json(responses);
	} catch (error) {
		console.error('Error fetching ticket responses:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch responses',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

// Add a response to a ticket
export async function POST(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { userId } = getAuth(req);
		const { id } = params;

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		console.log('Adding response to ticket:', id);

		const { message, url, urlLabel } = await req.json();

		if (!message || !message.trim()) {
			return NextResponse.json(
				{ error: 'Message is required' },
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { isAdmin: true, role: true, name: true, email: true },
		});

		const isAdmin = user?.isAdmin === true || user?.role === 'admin';

		if (!isAdmin) {
			const ticket = await prisma.ticket.findUnique({
				where: {
					id,
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

		const response = await prisma.ticketResponse.create({
			data: {
				message,
				url: url || null,
				urlLabel: urlLabel || null,
				ticketId: id,
				userId,
				authorName:
					user?.name || (isAdmin ? 'Support Agent' : 'Client'),
				authorEmail: user?.email,
				isAdminResponse: isAdmin,
			},
		});

		await prisma.ticket.update({
			where: { id },
			data: {
				status: isAdmin ? 'in-progress' : 'open',
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
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
