// src/components/admin/dashboard/inbox/TicketDetailView.tsx
import { useState } from 'react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { MessageCircle, User, Eye, FileEdit } from 'lucide-react';
import { TicketStatusBadge, TicketPriorityBadge } from '../../shared/StatusBadges';
import { formatDate } from '../../shared/utils';

interface SupportTicketDetailViewProps {
	ticket: any;
	onBack?: () => void;
}

export function SupportTicketDetailView({
	ticket,
	onBack,
}: SupportTicketDetailViewProps) {
	const [status, setStatus] = useState(ticket.status);

	return (
		<>
			<SheetHeader className='border-b pb-4 mb-4'>
				<div className='flex items-center justify-between'>
					<SheetTitle className='text-xl'>Support Ticket</SheetTitle>
					<TicketStatusBadge status={status} />
				</div>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2'>
					<div className='text-sm text-muted-foreground'>
						Site:{' '}
						<span className='font-medium text-foreground'>
							{ticket.siteName}
						</span>
					</div>
					<div className='text-sm'>
						Opened: {formatDate(ticket.dateOpened)}
					</div>
				</div>
			</SheetHeader>

			<div className='space-y-6'>
				{/* Ticket Details */}
				<div>
					<h3 className='text-sm font-medium mb-2'>Issue Details</h3>
					<Card>
						<CardContent className='p-4 space-y-3'>
							<div>
								<div className='text-xs text-muted-foreground'>
									Issue
								</div>
								<div className='font-medium'>
									{ticket.issue}
								</div>
							</div>
							<div>
								<div className='text-xs text-muted-foreground'>
									Description
								</div>
								<div className='text-sm'>
									{ticket.description}
								</div>
							</div>

							{ticket.steps && (
								<div>
									<div className='text-xs text-muted-foreground'>
										Steps to Reproduce
									</div>
									<div className='text-sm'>
										{ticket.steps}
									</div>
								</div>
							)}

							<div className='flex gap-4'>
								<div>
									<div className='text-xs text-muted-foreground'>
										Priority
									</div>
									<div className='mt-1'>
										<TicketPriorityBadge
											priority={ticket.priority}
										/>
									</div>
								</div>
								{ticket.browser && (
									<div>
										<div className='text-xs text-muted-foreground'>
											Browser
										</div>
										<div className='text-sm'>
											{ticket.browser}
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Additional sections like attachments, updates, etc. */}

				{/* Action section */}
				{ticket.status !== 'closed' && (
					<div>
						<h3 className='text-sm font-medium mb-2'>
							Update Status
						</h3>
						<div className='flex gap-3 mb-4'>
							<Select
								value={status}
								onValueChange={setStatus}
							>
								<SelectTrigger>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='open'>Open</SelectItem>
									<SelectItem value='in-progress'>
										In Progress
									</SelectItem>
									<SelectItem value='closed'>
										Closed
									</SelectItem>
								</SelectContent>
							</Select>
							<Button>Update Status</Button>
						</div>

						<div className='grid grid-cols-2 gap-2'>
							<Button variant='outline'>
								<MessageCircle className='h-4 w-4 mr-2' />
								Reply to Client
							</Button>
							<Button variant='outline'>
								<User className='h-4 w-4 mr-2' />
								Assign Support Agent
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
