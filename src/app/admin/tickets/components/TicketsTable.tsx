import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
	TicketStatusBadge,
	TicketPriorityBadge,
} from '../../components/shared/StatusBadges';
import { ChevronRight } from 'lucide-react';
import { formatDate } from '../../components/shared/utils';
import { SupportTicket } from '../types';

interface TicketsTableProps {
	tickets: SupportTicket[];
	sortField: string;
	sortDirection: 'asc' | 'desc';
	handleSort: (field: string) => void;
	onViewTicket: (ticket: SupportTicket) => void;
}

export function TicketsTable({
	tickets,
	sortField,
	sortDirection,
	handleSort,
	onViewTicket,
}: TicketsTableProps) {
	// Helper function to render sort indicator
	const renderSortIndicator = (field: string) => {
		if (sortField === field) {
			return sortDirection === 'asc' ? '↑' : '↓';
		}
		return null;
	};

	// Format email to get a clean name display
	const formatClientName = (email: string): string => {
		if (!email) return 'User';

		// Extract the part before @ and capitalize first letter
		const username = email.split('@')[0];
		return username.charAt(0).toUpperCase() + username.slice(1);
	};

	return (
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className='cursor-pointer'
							onClick={() => handleSort('id')}
						>
							ID {renderSortIndicator('id')}
						</TableHead>
						<TableHead
							className='cursor-pointer'
							onClick={() => handleSort('subject')}
						>
							Subject {renderSortIndicator('subject')}
						</TableHead>
						<TableHead
							className='cursor-pointer'
							onClick={() => handleSort('userEmail')}
						>
							Client {renderSortIndicator('userEmail')}
						</TableHead>
						<TableHead
							className='cursor-pointer'
							onClick={() => handleSort('status')}
						>
							Status {renderSortIndicator('status')}
						</TableHead>
						<TableHead
							className='cursor-pointer'
							onClick={() => handleSort('priority')}
						>
							Priority {renderSortIndicator('priority')}
						</TableHead>
						<TableHead
							className='cursor-pointer'
							onClick={() => handleSort('dateOpened')}
						>
							Date Opened {renderSortIndicator('dateOpened')}
						</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tickets.length > 0 ? (
						tickets.map((ticket) => (
							<TableRow key={ticket.id}>
								<TableCell className='font-mono text-xs'>
									{ticket.id.substring(0, 8)}...
								</TableCell>
								<TableCell className='font-medium'>
									{ticket.subject}
								</TableCell>
								<TableCell>
									{ticket.userEmail ? (
										<div>
											<div className='font-medium'>
												{formatClientName(
													ticket.userEmail
												)}
											</div>
											<div className='text-xs text-muted-foreground italic truncate max-w-[180px]'>
												{ticket.userEmail}
											</div>
										</div>
									) : (
										<div className='font-medium'>
											Unknown User
										</div>
									)}
								</TableCell>
								<TableCell>
									<TicketStatusBadge status={ticket.status} />
								</TableCell>
								<TableCell>
									<TicketPriorityBadge
										priority={ticket.priority}
									/>
								</TableCell>
								<TableCell>
									{formatDate(ticket.dateOpened)}
								</TableCell>
								<TableCell className='text-right'>
									<Button
										size='sm'
										variant='ghost'
										onClick={() => onViewTicket(ticket)}
										className='gap-1'
									>
										<span className='sr-only md:not-sr-only md:inline-block'>
											View
										</span>
										<ChevronRight className='h-4 w-4' />
									</Button>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={7}
								className='h-24 text-center'
							>
								No tickets found
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
