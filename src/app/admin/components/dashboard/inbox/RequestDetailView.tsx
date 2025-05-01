'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileEdit, Eye, MessageCircle, User } from 'lucide-react';
import { formatDate } from '../../shared/utils';
import {
	RequestStatusBadge,
	TicketPriorityBadge,
} from '../../shared/StatusBadges';

interface EditRequestDetailViewProps {
	request: any;
	onBack?: () => void;
}

export function EditRequestDetailView({
	request,
	onBack,
}: EditRequestDetailViewProps) {
	const [status, setStatus] = useState(request.status);

	return (
		<div>
			<SheetHeader className='border-b pb-4 mb-4'>
				<div className='flex items-center justify-between'>
					<SheetTitle className='text-xl'>Edit Request</SheetTitle>
					<RequestStatusBadge status={status} />
				</div>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2'>
					<div className='text-sm text-muted-foreground'>
						Site:{' '}
						<span className='font-medium text-foreground'>
							{request.siteName}
						</span>
					</div>
					<div className='text-sm'>
						Requested: {formatDate(request.requestDate)}
					</div>
				</div>
			</SheetHeader>

			<div className='space-y-6'>
				{/* Request Details */}
				<div>
					<h3 className='text-sm font-medium mb-2'>
						Request Details
					</h3>
					<Card>
						<CardContent className='p-4 space-y-3'>
							<div>
								<div className='text-xs text-muted-foreground'>
									Description
								</div>
								<div className='font-medium'>
									{request.description}
								</div>
							</div>
							<div>
								<div className='text-xs text-muted-foreground'>
									Details
								</div>
								<div className='text-sm'>{request.details}</div>
							</div>
							<div>
								<div className='text-xs text-muted-foreground'>
									Priority
								</div>
								<div className='mt-1'>
									<TicketPriorityBadge
										priority={request.priority}
									/>
								</div>
							</div>
							{request.deadline && (
								<div>
									<div className='text-xs text-muted-foreground'>
										Deadline
									</div>
									<div className='text-sm'>
										{formatDate(request.deadline)}
									</div>
									<div className='text-xs text-muted-foreground'>
										{getDaysRemaining(request.deadline)}{' '}
										days remaining
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Attachments */}
				{request.attachments && request.attachments.length > 0 && (
					<div>
						<h3 className='text-sm font-medium mb-2'>
							Attachments
						</h3>
						<div className='space-y-2'>
							{request.attachments.map((attachment, index) => (
								<Card
									key={index}
									className='p-3 flex items-center justify-between'
								>
									<div className='flex items-center'>
										<div className='bg-muted p-2 rounded mr-3'>
											<FileEdit className='h-4 w-4' />
										</div>
										<div>
											<div className='text-sm font-medium'>
												{attachment.name}
											</div>
											<div className='text-xs text-muted-foreground'>
												{attachment.size}
											</div>
										</div>
									</div>
									<Button
										variant='ghost'
										size='sm'
									>
										<Eye className='h-4 w-4' />
									</Button>
								</Card>
							))}
						</div>
					</div>
				)}

				{/* Action Section */}
				<div>
					<h3 className='text-sm font-medium mb-2'>Update Status</h3>
					<div className='flex gap-3 mb-4'>
						<Select
							value={status}
							onValueChange={setStatus}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='pending'>Pending</SelectItem>
								<SelectItem value='in-progress'>
									In Progress
								</SelectItem>
								<SelectItem value='completed'>
									Completed
								</SelectItem>
							</SelectContent>
						</Select>
						<Button>Update Status</Button>
					</div>

					<div className='grid grid-cols-2 gap-2'>
						<Button variant='outline'>
							<MessageCircle className='h-4 w-4 mr-2' />
							Contact Client
						</Button>
						<Button variant='outline'>
							<User className='h-4 w-4 mr-2' />
							Assign Team Member
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Helper function to calculate days remaining
function getDaysRemaining(dateString: string): number {
	const today = new Date();
	const targetDate = new Date(dateString);
	const diffTime = targetDate.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays > 0 ? diffDays : 0;
}
