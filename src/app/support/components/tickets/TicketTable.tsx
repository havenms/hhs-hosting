import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatDate } from '../../util';
import { TicketDetailModal } from './TicketDetailModal';

interface TicketTableProps {
	tickets: any[];
	onRefresh: () => void;
}

export function TicketTable({ tickets, onRefresh }: TicketTableProps) {
	const [selectedTicket, setSelectedTicket] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleViewDetails = (ticket: any) => {
		setSelectedTicket(ticket);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		// Optional: refresh the ticket list when modal closes
		// onRefresh();
	};

	return (
		<>
			<div className='rounded-md border overflow-hidden'>
				<table className='w-full text-sm'>
					<thead className='bg-muted/50'>
						<tr>
							<th className='py-3 px-4 text-left font-medium'>
								Ticket ID
							</th>
							<th className='py-3 px-4 text-left font-medium'>
								Subject
							</th>
							<th className='py-3 px-4 text-left font-medium'>
								Status
							</th>
							<th className='py-3 px-4 text-left font-medium'>
								Priority
							</th>
							<th className='py-3 px-4 text-left font-medium'>
								Date
							</th>
							<th className='py-3 px-4 text-center font-medium'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='divide-y'>
						{tickets.map((ticket) => (
							<tr
								key={ticket.id}
								className='border-b border-border'
							>
								<td className='py-3 px-4 font-mono text-sm'>
									{ticket.id}
								</td>
								<td className='py-3 px-4'>
									<div className='flex items-center'>
										<span className='font-medium'>
											{ticket.subject}
										</span>
										{ticket.messages > 0 && (
											<span className='ml-2 text-xs bg-muted px-1.5 py-0.5 rounded'>
												{ticket.messages}{' '}
												{ticket.messages === 1
													? 'reply'
													: 'replies'}
											</span>
										)}
									</div>
								</td>
								<td className='py-3 px-4'>
									<span
										className={`inline-flex items-center rounded-full px-2 py-1 text-xs 
                      ${
							ticket.status === 'Open'
								? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
								: ticket.status === 'In Progress'
								? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
								: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
						}`}
									>
										{ticket.status === 'Open' ? (
											<>
												<span className='w-1.5 h-1.5 rounded-full bg-green-500 mr-1'></span>
												{ticket.status}
											</>
										) : (
											ticket.status
										)}
									</span>
								</td>
								<td className='py-3 px-4'>
									<span
										className={`inline-block rounded-full px-2 py-1 text-xs 
                      ${
							ticket.priority === 'High'
								? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
								: ticket.priority === 'Medium'
								? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
								: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
						}`}
									>
										{ticket.priority}
									</span>
								</td>
								<td className='py-3 px-4 text-muted-foreground text-sm'>
									{formatDate(ticket.createdAt)}
								</td>
								<td className='py-3 px-4 text-center'>
									<Button
										variant='ghost'
										size='sm'
										onClick={() =>
											handleViewDetails(ticket)
										}
									>
										View Details
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Ticket Detail Modal */}
			<TicketDetailModal
				ticket={selectedTicket}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onRefresh={onRefresh}
			/>
		</>
	);
}
