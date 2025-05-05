'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TicketsTable } from '@/app/admin/tickets/components/TicketsTable';
import { TicketDetailModal } from '@/app/support/components/tickets/TicketDetailModal';
import { SupportTicket } from '@/app/admin/tickets/types';

export function InboxTab({ supportTickets }: { supportTickets: SupportTicket[] }) {
	// Ticket state management (similar to admin/tickets page)
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [priorityFilter, setPriorityFilter] = useState('all');
	const [sortField, setSortField] = useState<keyof SupportTicket>('dateOpened');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
	const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Handle sorting
	const handleSort = (field: string): void => {
		if (sortField === field as keyof SupportTicket) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field as keyof SupportTicket);
			setSortDirection('desc');
		}
	};

	// Handle ticket selection
	const handleViewTicket = (ticket: SupportTicket): void => {
		setSelectedTicket(ticket);
		setIsModalOpen(true);
	};

	// Handle modal close
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Filter tickets
	const filteredTickets = supportTickets
		.filter((ticket) => {
			// Search filter
			const matchesSearch =
				searchTerm === '' ||
				ticket.subject
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				ticket.description
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				ticket.clientName
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				ticket.userId?.toLowerCase().includes(searchTerm.toLowerCase());

			// Status filter
			const matchesStatus =
				statusFilter === 'all' || ticket.status === statusFilter;

			// Priority filter
			const matchesPriority =
				priorityFilter === 'all' || ticket.priority === priorityFilter;

			return matchesSearch && matchesStatus && matchesPriority;
		})
		.sort((a, b) => {
			const fieldA = a[sortField];
			const fieldB = b[sortField];

			if (typeof fieldA === 'string' && typeof fieldB === 'string') {
				return sortDirection === 'asc'
					? fieldA.localeCompare(fieldB)
					: fieldB.localeCompare(fieldA);
			}
			return 0;
		});

	return (
		<div className='space-y-4'>
			<Tabs
				defaultValue='tickets'
				className='w-full'
			>
				<TabsList className='mb-4'>
					<TabsTrigger value='tickets'>Support Tickets</TabsTrigger>
					<TabsTrigger value='edit-requests'>
						Edit Requests
					</TabsTrigger>
				</TabsList>

				<TabsContent value='tickets'>
					{/* Ticket filters - same as admin/tickets page */}
					<div className='flex flex-col md:flex-row gap-3 justify-between mb-6'>
						<div className='relative flex-1'>
							<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
							<Input
								placeholder='Search tickets...'
								className='pl-8'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className='flex gap-2'>
							<Select
								value={statusFilter}
								onValueChange={setStatusFilter}
							>
								<SelectTrigger className='w-[130px]'>
									<SelectValue placeholder='Status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>
										All Statuses
									</SelectItem>
									<SelectItem value='open'>Open</SelectItem>
									<SelectItem value='in-progress'>
										In Progress
									</SelectItem>
									<SelectItem value='closed'>
										Closed
									</SelectItem>
								</SelectContent>
							</Select>

							<Select
								value={priorityFilter}
								onValueChange={setPriorityFilter}
							>
								<SelectTrigger className='w-[130px]'>
									<SelectValue placeholder='Priority' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>
										All Priorities
									</SelectItem>
									<SelectItem value='high'>High</SelectItem>
									<SelectItem value='medium'>
										Medium
									</SelectItem>
									<SelectItem value='low'>Low</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Tickets Table - same component as admin/tickets */}
					<TicketsTable
						tickets={filteredTickets}
						sortField={sortField}
						sortDirection={sortDirection}
						handleSort={handleSort}
						onViewTicket={handleViewTicket}
					/>

					{/* Ticket Detail Modal */}
					<TicketDetailModal
						ticket={selectedTicket}
						isOpen={isModalOpen}
						onClose={handleCloseModal}
						onRefresh={() => {}} // You can add refresh logic here if needed
					/>
				</TabsContent>

				<TabsContent value='edit-requests'>
					{/* Implement your edit requests table here */}
					<div className='rounded-md border p-8 text-center text-muted-foreground'>
						Edit requests component would go here
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
