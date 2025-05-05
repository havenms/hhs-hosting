import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = getAuth(req);
    const { id } = params;
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request data
    const data = await req.json();
    console.log('Update data received:', data); // Log exactly what we receive

    // Define type for ticket updates
    type TicketUpdateData = {
      updatedAt: Date;
      status?: 'open' | 'in-progress' | 'closed';
      priority?: 'high' | 'medium' | 'low';
      lastUpdateNote?: string;
      closedAt?: Date;
      closedBy?: string;
    };

    // Create update object with allowed fields
    const updateData: TicketUpdateData = {
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
      where: { id: id },
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
