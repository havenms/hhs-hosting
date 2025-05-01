// src/components/admin/dashboard/inbox/TicketDetailView.tsx
import { useState, useEffect } from 'react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	MessageCircle,
	User,
	Clock,
	AlertCircle,
	Info,
	ArrowLeft,
	RefreshCw,
	ArrowRightLeft,
	Loader2,
} from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	TicketStatusBadge,
	TicketPriorityBadge,
} from '../../shared/StatusBadges';
import { formatDateWithTime } from '../../shared/utils';
import { ResponseModal } from './ResponseModal';

interface SupportTicketDetailViewProps {
	ticket: any;
	onBack?: () => void;
	onUpdate?: (ticketId: string, data: any) => Promise<void>;
}

export function SupportTicketDetailView({
	ticket,
	onBack,
	onUpdate,
}: SupportTicketDetailViewProps) {
	// Ensure ticket.responses is an array if undefined
	const ticketWithResponses = {
		...ticket,
		responses: ticket.responses || [],
	};

	const [status, setStatus] = useState(ticket.status);
	const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [statusUpdateError, setStatusUpdateError] = useState<string | null>(
		null
	);

	// Handle status update
	const handleStatusUpdate = async () => {
		if (status === ticket.status) return;

		setIsUpdating(true);
		setStatusUpdateError(null);

		try {
			const response = await fetch(`/api/tickets/${ticket.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					credentials: 'include',
				},
				body: JSON.stringify({
					status,
					lastUpdateNote: `Status changed to ${status} by admin`,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.error || `Server returned ${response.status}`
				);
			}

			const updatedTicket = await response.json();

			// Call parent update handler if provided
			if (onUpdate) {
				await onUpdate(ticket.id, updatedTicket);
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to update status';
			setStatusUpdateError(errorMessage);
		} finally {
			setIsUpdating(false);
		}
	};

	// Handle response submission
	const handleResponseSubmit = async (data: {
		message: string;
		url?: string;
		urlLabel?: string;
	}) => {
		const response = await fetch(`/api/tickets/${ticket.id}/responses`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Failed to send response');
		}

		// Optionally call parent update handler
		if (onUpdate) {
			await onUpdate(ticket.id, await response.json());
		}
	};

	return (
		<div className='flex flex-col h-full max-h-[85vh] overflow-auto p-2'>
			{/* Back button for mobile */}
			{onBack && (
				<div className='lg:hidden mb-2'>
					<Button
						variant='ghost'
						size='sm'
						onClick={onBack}
						className='gap-1'
					>
						<ArrowLeft className='h-4 w-4' />
						<span>Back</span>
					</Button>
				</div>
			)}

			{/* Ticket Header */}
			<TicketHeader
				ticket={ticket}
				status={status}
			/>

			{/* Content Area */}
			<div className='space-y-6 overflow-auto flex-1 pr-1'>
				{/* Ticket Details */}
				<TicketDetails ticket={ticket} />

				{/* Response History */}
				{console.log('Ticket responses:', ticket.responses)}
				{ticket.responses ? (
					ticket.responses.length > 0 ? (
						<ResponseHistory
							responses={ticketWithResponses.responses}
							ticket={ticketWithResponses}
						/>
					) : (
						<section>
							<h3 className='text-sm font-medium mb-2 flex items-center'>
								<MessageCircle className='h-4 w-4 mr-2 text-primary' />
								Response History
							</h3>
							<div className='text-center py-4 text-muted-foreground text-sm bg-muted/50 rounded-md'>
								No responses yet (responses array exists but is
								empty).
							</div>
						</section>
					)
				) : (
					<section>
						<h3 className='text-sm font-medium mb-2 flex items-center'>
							<MessageCircle className='h-4 w-4 mr-2 text-primary' />
							Response History
						</h3>
						<div className='text-center py-4 text-muted-foreground text-sm bg-muted/50 rounded-md'>
							No responses data available (responses property is
							missing).
						</div>
					</section>
				)}

				{/* Actions for open tickets */}
				{ticket.status !== 'closed' && (
					<TicketActions
						status={status}
						setStatus={setStatus}
						onStatusUpdate={handleStatusUpdate}
						isUpdating={isUpdating}
						error={statusUpdateError}
						onComposeClick={() => setIsResponseModalOpen(true)}
					/>
				)}
			</div>

			{/* Response Modal */}
			<ResponseModal
				isOpen={isResponseModalOpen}
				onOpenChange={setIsResponseModalOpen}
				ticketId={ticket.id}
				onResponseSubmit={handleResponseSubmit}
			/>
		</div>
	);
}

// Subcomponent: Ticket Header
function TicketHeader({ ticket, status }) {
	return (
		<SheetHeader className='border-b pb-4 mb-4'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
				<SheetTitle className='text-xl font-bold'>
					{ticket.subject || 'Support Ticket'}
				</SheetTitle>
				<TicketStatusBadge
					status={status}
					className='self-start md:self-auto'
				/>
			</div>

			<div className='mt-2 space-y-1.5'>
				<div className='flex flex-wrap gap-x-4 gap-y-1 text-sm'>
					<div className='flex items-center text-muted-foreground'>
						<Info className='h-3.5 w-3.5 mr-1.5' />
						<span>
							ID: <span className='font-mono'>{ticket.id}</span>
						</span>
					</div>

					<div className='flex items-center text-muted-foreground'>
						<Clock className='h-3.5 w-3.5 mr-1.5' />
						<span>
							Opened: {formatDateWithTime(ticket.dateOpened)}
						</span>
					</div>
				</div>

				<div className='flex flex-wrap gap-x-4 gap-y-1 text-sm'>
					{ticket.siteName && (
						<div className='flex items-center gap-1'>
							<span className='text-muted-foreground'>Site:</span>
							<span className='font-medium'>
								{ticket.siteName}
							</span>
						</div>
					)}

					{ticket.clientName && (
						<div className='flex items-center gap-1'>
							<span className='text-muted-foreground'>From:</span>
							<span className='font-medium'>
								{ticket.clientName}
							</span>
							<span className='text-xs text-muted-foreground'>
								({ticket.userEmail})
							</span>
						</div>
					)}
				</div>
			</div>
		</SheetHeader>
	);
}

// Subcomponent: Ticket Details
function TicketDetails({ ticket }) {
	return (
		<section>
			<h3 className='text-sm font-medium mb-2 flex items-center'>
				<AlertCircle className='h-4 w-4 mr-2 text-primary' />
				Issue Details
			</h3>

			<Card>
				<CardContent className='p-4 space-y-3'>
					{/* Description */}
					<div>
						<div className='text-xs font-medium text-muted-foreground mb-1'>
							Description
						</div>
						<div className='text-sm'>
							{ticket.description || 'No description provided'}
						</div>
					</div>

					{/* Steps to reproduce */}
					{ticket.steps && (
						<div>
							<div className='text-xs font-medium text-muted-foreground mb-1'>
								Steps to Reproduce
							</div>
							<div className='text-sm whitespace-pre-line'>
								{ticket.steps}
							</div>
						</div>
					)}

					{/* Metadata */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 mt-2 border-t'>
						{/* Priority */}
						<div>
							<div className='text-xs font-medium text-muted-foreground mb-1'>
								Priority
							</div>
							<TicketPriorityBadge priority={ticket.priority} />
						</div>

						{/* Category */}
						{ticket.category && (
							<div>
								<div className='text-xs font-medium text-muted-foreground mb-1'>
									Category
								</div>
								<div className='text-sm font-medium'>
									{ticket.category}
								</div>
							</div>
						)}

						{/* Browser info */}
						{ticket.browser && (
							<div>
								<div className='text-xs font-medium text-muted-foreground mb-1'>
									Browser
								</div>
								<div className='text-sm'>{ticket.browser}</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}

// Subcomponent: Response History
function ResponseHistory({ responses, ticket }) {
	const [loading, setLoading] = useState(false);
	const [localResponses, setLocalResponses] = useState(responses || []);

	useEffect(() => {
		if (ticket?.id && (!responses || responses.length === 0)) {
			fetchResponses();
		}
	}, [ticket?.id, responses]);

	const fetchResponses = async () => {
		if (!ticket?.id) return;

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
				console.log('Fetched responses:', data); // Add logging to debug
				setLocalResponses(Array.isArray(data) ? data : []);
			} else {
				console.error(
					'Failed to fetch ticket responses',
					response.status
				);
			}
		} catch (error) {
			console.error('Error fetching ticket responses:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section>
			<div className='flex justify-between items-center mb-2'>
				<h3 className='text-sm font-medium flex items-center'>
					<MessageCircle className='h-4 w-4 mr-2 text-primary' />
					Response History
				</h3>
				<Button
					variant='ghost'
					size='sm'
					onClick={fetchResponses}
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
				) : localResponses.length > 0 ? (
					localResponses.map((response, idx) => (
						<Card key={idx}>
							<CardHeader className='p-3 pb-1 flex flex-row justify-between items-start'>
								<div>
									<div className='font-medium'>
										{response.authorName ||
											response.author ||
											(response.isAdminResponse
												? 'Support Agent'
												: 'Client')}
									</div>
									<div className='text-xs text-muted-foreground'>
										{formatDateWithTime(
											response.createdAt || response.date
										)}
									</div>
								</div>
								{(response.isAdminResponse ||
									response.isAgent) && (
									<div className='bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full'>
										Staff
									</div>
								)}
							</CardHeader>
							<CardContent className='p-3 pt-1 text-sm'>
								<div className='whitespace-pre-line'>
									{response.message}
								</div>

								{response.url && response.urlLabel && (
									<a
										href={response.url}
										target='_blank'
										rel='noopener noreferrer'
										className='text-primary hover:underline text-sm mt-2 inline-flex items-center'
									>
										{response.urlLabel}
										<ArrowRightLeft className='ml-1 h-3 w-3' />
									</a>
								)}
							</CardContent>
						</Card>
					))
				) : (
					<div className='text-center py-4 text-muted-foreground text-sm bg-muted/50 rounded-md'>
						No responses yet.
					</div>
				)}
			</div>
		</section>
	);
}

// Subcomponent: Ticket Actions
function TicketActions({
	status,
	setStatus,
	onStatusUpdate,
	isUpdating,
	error,
	onComposeClick,
}) {
	return (
		<section>
			<Separator className='mb-4' />

			{/* Status Update */}
			<div className='mb-4'>
				<h3 className='text-sm font-medium mb-2 flex items-center'>
					<User className='h-4 w-4 mr-2 text-primary' />
					Update Status
				</h3>

				<div className='flex flex-col sm:flex-row gap-2'>
					<Select
						value={status}
						onValueChange={setStatus}
					>
						<SelectTrigger className='sm:max-w-[180px]'>
							<SelectValue placeholder='Select status' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='open'>Open</SelectItem>
							<SelectItem value='in-progress'>
								In Progress
							</SelectItem>
							<SelectItem value='closed'>Closed</SelectItem>
						</SelectContent>
					</Select>

					<Button
						onClick={onStatusUpdate}
						disabled={isUpdating}
					>
						{isUpdating ? 'Updating...' : 'Update Status'}
					</Button>
				</div>

				{error && (
					<p className='text-xs text-destructive mt-1'>{error}</p>
				)}
			</div>

			{/* Reply action */}
			<div>
				<h3 className='text-sm font-medium mb-2 flex items-center'>
					<MessageCircle className='h-4 w-4 mr-2 text-primary' />
					Reply to Client
				</h3>

				<Button
					onClick={onComposeClick}
					className='flex items-center gap-2'
				>
					<MessageCircle className='h-4 w-4' />
					Compose Response
				</Button>
			</div>
		</section>
	);
}
