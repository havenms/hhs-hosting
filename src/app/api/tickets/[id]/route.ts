import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function PATCH(
	request: NextRequest,
	context: { params: { id: string } }
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

		// Parse request data
		const data = await request.json();
		console.log('Update data received:', data); // Log exactly what we receive

		// Create update object with allowed fields
		const updateData: any = {
			updatedAt: new Date(),
		};

		// Add status if provided
		if (
			data.status &&
			['open', 'in-progress', 'closed'].includes(data.status)
		) {
			updateData.status = data.status;
		}

		// Add priority if provided - THIS IS LIKELY MISSING
		if (
			data.priority &&
			['high', 'medium', 'low'].includes(data.priority)
		) {
			updateData.priority = data.priority;
		}

		// Add notes if provided
		if (data.lastUpdateNote) {
			updateData.lastUpdateNote = data.lastUpdateNote;
		}

		// Add special handling for closed status
		if (data.status === 'closed') {
			updateData.closedAt = new Date();
			updateData.closedBy = 'Admin User'; // Or get the actual admin name
		}

		console.log('Final update data for Prisma:', updateData);

		// Update the ticket
		const updatedTicket = await prisma.ticket.update({
			where: { id: params.id },
			data: updateData,
		});

		return NextResponse.json(updatedTicket);
	} catch (error) {
		console.error('Error updating ticket:', error);
		return NextResponse.json(
			{ error: 'Failed to update ticket', details: error.message },
			{ status: 500 }
		);
	}
}
