'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '../components/admin-layout';
import { Button } from '@/components/ui/button';
import { SupportTicket, TicketStats } from './types';
import { TicketFilters } from './components/TicketFilters';
import { TicketsTable } from './components/TicketsTable';
import { TicketStats as TicketStatsComponent } from './components/TicketStats';
import { fetchTickets } from './services/ticketsService';
import { Filter, RefreshCw, Loader2 } from 'lucide-react';
import { TicketDetailModal } from '@/app/support/components/tickets/TicketDetailModal';

export default function TicketsPage() {
	const [tickets, setTickets] = useState<SupportTicket[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [priorityFilter, setPriorityFilter] = useState('all');
	const [sortField, setSortField] = useState('dateOpened');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
	const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isRefreshing, setIsRefreshing] = useState(false);

	// Fetch tickets data
	const handleFetchTickets = async () => {
		try {
			setIsRefreshing(true);
			setError(null);

			// Pass the filter parameters to fetchTickets
			const data = await fetchTickets(
				searchTerm,
				statusFilter,
				priorityFilter
			);
			setTickets(data);
		} catch (err) {
			console.error('Error fetching tickets:', err);
			setError(
				err instanceof Error ? err.message : 'Failed to load tickets'
			);
		} finally {
			setLoading(false);
			setIsRefreshing(false);
		}
	};

	// Initial data fetch
	useEffect(() => {
		handleFetchTickets();
	}, []);

	// Filter and sort tickets
	const filteredTickets = tickets
		.filter((ticket) => {
			// Search filter
			const matchesSearch =
				searchTerm === '' ||
				ticket.subject
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				ticket.description
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				ticket.clientName
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				ticket.userEmail
					.toLowerCase()
					.includes(searchTerm.toLowerCase());

			// Status filter
			const matchesStatus =
				statusFilter === 'all' || ticket.status === statusFilter;

			// Priority filter
			const matchesPriority =
				priorityFilter === 'all' || ticket.priority === priorityFilter;

			return matchesSearch && matchesStatus && matchesPriority;
		})
		.sort((a, b) => {
			const fieldA = a[sortField as keyof SupportTicket];
			const fieldB = b[sortField as keyof SupportTicket];

			if (typeof fieldA === 'string' && typeof fieldB === 'string') {
				if (sortDirection === 'asc') {
					return fieldA.localeCompare(fieldB);
				} else {
					return fieldB.localeCompare(fieldA);
				}
			}
			return 0;
		});

	// Handle column sorting
	const handleSort = (field: string) => {
		if (sortField === field) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortDirection('desc');
		}
	};

	const handleViewTicket = (ticket: SupportTicket) => {
		setSelectedTicket(ticket);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		handleFetchTickets();
	};

	// Calculate statistics
	const stats: TicketStats = {
		total: tickets.length,
		open: tickets.filter((t) => t.status === 'open').length,
		inProgress: tickets.filter((t) => t.status === 'in-progress').length,
		closed: tickets.filter((t) => t.status === 'closed').length,
		highPriority: tickets.filter((t) => t.priority === 'high').length,
	};

	// Actions bar
	const actionButtons = (
		<>
			<Button
				variant='outline'
				size='sm'
				onClick={handleFetchTickets}
				disabled={isRefreshing}
			>
				{isRefreshing ? (
					<>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Refreshing...
					</>
				) : (
					<>
						<RefreshCw className='mr-2 h-4 w-4' />
						Refresh
					</>
				)}
			</Button>
			<Button
				size='sm'
				variant='outline'
			>
				<Filter className='mr-2 h-4 w-4' />
				Advanced Filters
			</Button>
		</>
	);

	return (
		<AdminLayout
			title='Support Tickets'
			actions={actionButtons}
		>
			{loading && !isRefreshing ? (
				<div className='flex justify-center p-8'>
					<Loader2 className='h-8 w-8 animate-spin text-primary' />
				</div>
			) : error ? (
				<div className='text-center text-red-500 p-4'>{error}</div>
			) : (
				<>
					{/* Ticket Statistics */}
					<TicketStatsComponent stats={stats} />

					{/* Filters */}
					<TicketFilters
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						statusFilter={statusFilter}
						setStatusFilter={setStatusFilter}
						priorityFilter={priorityFilter}
						setPriorityFilter={setPriorityFilter}
					/>

					{/* Tickets Table */}
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
						onRefresh={handleFetchTickets}
					/>

					{/* Pagination could be added here */}
				</>
			)}
		</AdminLayout>
	);
}
