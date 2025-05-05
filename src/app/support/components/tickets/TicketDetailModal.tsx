// src/app/support/components/tickets/TicketDetailModal.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Clock,
	MessageCircle,
	AlertCircle,
	Tag,
	ArrowRightLeft,
	RefreshCw,
	Loader2,
	Save,
	Edit,
} from 'lucide-react';
import { formatDate, formatRelativeTime } from '../../util';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

// Define proper types instead of 'any'
interface TicketResponse {
	id?: string;
	message: string;
	createdAt: string;
	isAdminResponse?: boolean;
	url?: string;
	urlLabel?: string;
}

interface Ticket {
	id: string;
	subject: string;
	description?: string;
	status: string;
	priority: string;
	createdAt: string;
	category?: string;
	userEmail?: string;
}

interface TicketDetailModalProps {
	ticket: Ticket | null;
	isOpen: boolean;
	onClose: () => void;
	onRefresh?: () => void;
}

export function TicketDetailModal({
	ticket,
	isOpen,
	onClose,
	onRefresh,
}: TicketDetailModalProps) {
	const [loading, setLoading] = useState(false);
	const [responses, setResponses] = useState<TicketResponse[]>([]);
	const [newReply, setNewReply] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const [isUpdating, setIsUpdating] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');
	const [selectedPriority, setSelectedPriority] = useState('');
	const [updateError, setUpdateError] = useState<string | null>(null);

	const { isAdmin } = useAuth();

	useEffect(() => {
		if (ticket) {
			setSelectedStatus(ticket.status?.toLowerCase() || '');
			setSelectedPriority(ticket.priority?.toLowerCase() || '');
		}
	}, [ticket]);

	// Use useCallback to memoize the function
	const fetchTicketResponses = useCallback(async () => {
		if (!ticket) return;

		setLoading(true);
		try {
			const response = await fetch(
				`/api/tickets/${ticket.id}/responses`,
				{
					method: 'GET',
					credentials: 'include',
				}
			);

			if (response.ok) {
				const data = await response.json();
				setResponses(data);
			} else {
				console.error('Failed to fetch ticket responses');
			}
		} catch (error) {
			console.error('Error fetching ticket responses:', error);
		} finally {
			setLoading(false);
		}
	}, [ticket]); // Add ticket as dependency

	useEffect(() => {
		if (isOpen && ticket) {
			fetchTicketResponses();
		}
	}, [isOpen, ticket, fetchTicketResponses]); // Include fetchTicketResponses in dependency array

	const handleSubmitReply = async () => {
		if (!newReply.trim()) return;

		setSubmitting(true);
		try {
			const response = await fetch(
				`/api/tickets/${ticket?.id}/responses`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ message: newReply }),
					credentials: 'include',
				}
			);

			if (response.ok) {
				setNewReply('');
				fetchTicketResponses();
				if (onRefresh) onRefresh();
			} else {
				console.error('Failed to submit reply');
			}
		} catch (error) {
			console.error('Error submitting reply:', error);
		} finally {
			setSubmitting(false);
		}
	};

	const handleUpdateTicket = async () => {
		if (!isAdmin || !ticket) return;

		setIsUpdating(true);
		setUpdateError(null);

		try {
			const response = await fetch(`/api/tickets/${ticket.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					status: selectedStatus,
					priority: selectedPriority,
					lastUpdateNote: `Status updated to ${selectedStatus} and priority to ${selectedPriority} by admin`,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.error || `Server returned ${response.status}`
				);
			}

			// Process the response data (or remove if not needed)
			await response.json(); // Removed unused variable

			// Update UI after successful update
			fetchTicketResponses();
			if (onRefresh) onRefresh();
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to update ticket';
			setUpdateError(errorMessage);
			console.error('Update error:', err);
		} finally {
			setIsUpdating(false);
		}
	};

	if (!ticket) return null;

	const ticketStatusColor =
		ticket.status === 'Open' || ticket.status === 'open'
			? 'bg-green-100 text-green-700 border-green-200'
			: ticket.status === 'In Progress' || ticket.status === 'in-progress'
			? 'bg-yellow-100 text-yellow-700 border-yellow-200'
			: 'bg-gray-100 text-gray-700 border-gray-200';

	const priorityColor =
		ticket.priority === 'High' || ticket.priority === 'high'
			? 'bg-red-100 text-red-700 border-red-200'
			: ticket.priority === 'Medium' || ticket.priority === 'medium'
			? 'bg-yellow-100 text-yellow-700 border-yellow-200'
			: 'bg-blue-100 text-blue-700 border-blue-200';

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => onClose()}
		>
			<DialogContent className='sm:max-w-[550px] max-h-[85vh] overflow-y-auto'>
				<DialogHeader>
					<div className='flex items-center justify-between'>
						<DialogTitle className='text-xl'>
							{ticket.subject}
						</DialogTitle>
						{!isAdmin ? (
							<span
								className={`text-xs rounded-full px-2 py-1 border ${ticketStatusColor}`}
							>
								{ticket.status}
							</span>
						) : null}
					</div>
					<DialogDescription className='sr-only'>
						Ticket details and communication
					</DialogDescription>

					{isAdmin ? (
						<div className='mt-4 border rounded-md p-3 bg-muted/20'>
							<h3 className='text-sm font-medium mb-2 flex items-center'>
								<Edit className='h-4 w-4 mr-2' />
								Admin Controls
							</h3>

							<div className='grid grid-cols-2 gap-3'>
								<div>
									<label
										htmlFor='status-select'
										className='block text-xs mb-1 text-muted-foreground'
									>
										Status
									</label>
									<Select
										value={selectedStatus}
										onValueChange={setSelectedStatus}
										disabled={isUpdating}
									>
										<SelectTrigger
											id='status-select'
											className='text-sm'
										>
											<SelectValue placeholder='Select status' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='open'>
												Open
											</SelectItem>
											<SelectItem value='in-progress'>
												In Progress
											</SelectItem>
											<SelectItem value='closed'>
												Closed
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<label
										htmlFor='priority-select'
										className='block text-xs mb-1 text-muted-foreground'
									>
										Priority
									</label>
									<Select
										value={selectedPriority}
										onValueChange={setSelectedPriority}
										disabled={isUpdating}
									>
										<SelectTrigger
											id='priority-select'
											className='text-sm'
										>
											<SelectValue placeholder='Select priority' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='high'>
												High
											</SelectItem>
											<SelectItem value='medium'>
												Medium
											</SelectItem>
											<SelectItem value='low'>
												Low
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{updateError && (
								<div className='mt-2 text-xs text-destructive'>
									{updateError}
								</div>
							)}

							<div className='mt-3'>
								<Button
									size='sm'
									onClick={handleUpdateTicket}
									disabled={isUpdating}
									className='w-full'
								>
									{isUpdating ? (
										<>
											<Loader2 className='h-3.5 w-3.5 mr-2 animate-spin' />
											Updating...
										</>
									) : (
										<>
											<Save className='h-3.5 w-3.5 mr-2' />
											Update Ticket
										</>
									)}
								</Button>
							</div>
						</div>
					) : (
						<div className='flex flex-wrap gap-3 pt-2 text-sm text-muted-foreground'>
							<div className='flex items-center text-sm'>
								<Clock className='h-3.5 w-3.5 mr-1.5 opacity-70' />
								<span className='opacity-70'>Opened:</span>
								<span className='font-medium ml-1'>
									{formatDate(ticket.createdAt)}
								</span>
							</div>
							<div className='flex items-center text-sm'>
								<Tag className='h-3.5 w-3.5 mr-1.5 opacity-70' />
								<span
									className={`text-xs rounded-full px-2 py-0.5 border ${priorityColor}`}
								>
									{ticket.priority}
								</span>
							</div>
							<div className='flex items-center text-sm'>
								<AlertCircle className='h-3.5 w-3.5 mr-1.5 opacity-70' />
								<span className='opacity-70'>ID:</span>
								<span className='font-mono text-xs ml-1'>
									{ticket.id}
								</span>
							</div>
						</div>
					)}
				</DialogHeader>

				<div className='mb-4 pb-2'>
					<h3 className='text-sm font-medium mb-2'>Description</h3>
					<div className='text-sm bg-muted/50 p-3 rounded-md whitespace-pre-line'>
						{ticket.description || 'No description provided.'}
					</div>
				</div>

				<Separator />

				<div className='mb-6'>
					<div className='flex justify-between items-center mb-2'>
						<h3 className='text-sm font-medium'>Responses</h3>
						<Button
							variant='ghost'
							size='sm'
							onClick={fetchTicketResponses}
							disabled={loading}
							className='h-8 px-2'
						>
							{loading ? (
								<Loader2 className='h-3.5 w-3.5 animate-spin' />
							) : (
								<RefreshCw className='h-3.5 w-3.5' />
							)}
						</Button>
					</div>

					<div className='space-y-3'>
						{loading ? (
							<div className='flex justify-center py-6'>
								<Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
							</div>
						) : responses.length > 0 ? (
							responses.map((response, i) => (
								<div
									key={i}
									className={`p-3 rounded-md ${
										response.isAdminResponse
											? 'bg-primary/10 border-l-4 border-primary'
											: 'bg-muted/50'
									}`}
								>
									<div className='flex justify-between mb-1'>
										<span className='font-medium text-sm'>
											{response.isAdminResponse
												? 'Support Agent'
												: 'You'}
										</span>
										<span className='text-xs text-muted-foreground'>
											{formatRelativeTime(
												response.createdAt
											)}
										</span>
									</div>
									<div className='text-sm whitespace-pre-line'>
										{response.message}
									</div>
									{response.url && response.urlLabel && (
										<div className='mt-2'>
											<a
												href={response.url}
												target='_blank'
												rel='noopener noreferrer'
												className='text-primary hover:underline text-sm inline-flex items-center'
											>
												{response.urlLabel}
												<ArrowRightLeft className='ml-1 h-3 w-3' />
											</a>
										</div>
									)}
								</div>
							))
						) : (
							<div className='text-center py-4 text-muted-foreground text-sm'>
								No responses yet.
							</div>
						)}
					</div>
				</div>

				{ticket.status !== 'Closed' && ticket.status !== 'closed' && (
					<div className='space-y-3'>
						<h3 className='text-sm font-medium flex items-center'>
							<MessageCircle className='h-4 w-4 mr-2 opacity-70' />
							Add Reply
						</h3>
						<Textarea
							placeholder='Type your reply here...'
							className='min-h-[100px]'
							value={newReply}
							onChange={(e) => setNewReply(e.target.value)}
							disabled={submitting}
						/>
					</div>
				)}

				<DialogFooter className='flex-col sm:flex-row space-y-2 sm:space-y-0'>
					{ticket.status !== 'Closed' &&
						ticket.status !== 'closed' && (
							<Button
								onClick={handleSubmitReply}
								disabled={!newReply.trim() || submitting}
								className='w-full sm:w-auto order-2 sm:order-1'
							>
								{submitting ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Sending...
									</>
								) : (
									<>
										<MessageCircle className='mr-2 h-4 w-4' />
										Send Reply
									</>
								)}
							</Button>
						)}
					<Button
						variant='outline'
						onClick={onClose}
						className='w-full sm:w-auto order-1 sm:order-2'
					>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
