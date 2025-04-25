'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin-layout';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	TicketStatusBadge,
	TicketPriorityBadge,
} from '@/components/admin/shared/StatusBadges';
import { formatDate } from '@/components/admin/shared/utils';
import { authFetch } from '@/lib/auth-utils';
import {
	Search,
	Filter,
	ArrowUpDown,
	RefreshCw,
	ChevronRight,
	MessageSquare,
	User,
	Clock,
	CheckCircle,
	Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { SupportTicketDetailView } from '@/components/admin/dashboard/inbox/TicketDetailView';

// Define ticket types
interface Attachment {
	name: string;
	size: string;
	url: string;
}

interface SupportTicket {
	id: string;
	subject: string;
	description: string;
	status: 'open' | 'in-progress' | 'closed';
	priority: 'low' | 'medium' | 'high';
	dateOpened: string;
	lastUpdated?: string;
	clientName?: string;
	userEmail: string;
	userId: string;
	siteName?: string;
	category?: string;
	attachments?: Attachment[];
	assignedTo?: string;
	resolution?: string;
	closedDate?: string;
	closedBy?: string;
	browser?: string;
	lastUpdateNote?: string;
}

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
	const [isRefreshing, setIsRefreshing] = useState(false);

	// Fetch tickets data
	const fetchTickets = async () => {
		try {
			setIsRefreshing(true);
			setError(null);

			// For now, use mock data
			// In production, replace with actual API call:
			// const response = await authFetch('/api/tickets');
			// const data = await response.json();

			// Mock data for development
			const mockTickets: SupportTicket[] = [
				{
					id: 'TKT-1234',
					subject: "Can't access WordPress admin",
					description:
						"I'm trying to log in to my WordPress dashboard but keep getting an error message saying my session has expired.",
					status: 'open',
					priority: 'high',
					dateOpened: new Date(
						Date.now() - 2 * 3600000
					).toISOString(),
					lastUpdated: new Date(
						Date.now() - 1 * 3600000
					).toISOString(),
					userEmail: 'client@example.com',
					userId: 'user_1',
					clientName: 'John Smith',
					siteName: 'Business Pro Site',
					category: 'technical',
					browser: 'Chrome 98.0.4758.102',
					lastUpdateNote: 'Checking authentication logs',
					assignedTo: 'Sarah',
					attachments: [
						{
							name: 'error-screenshot.png',
							size: '245 KB',
							url: '#',
						},
					],
				},
				{
					id: 'TKT-1233',
					subject: 'Need to update contact information',
					description:
						'Our office has moved and we need to update our contact information on the website. New address is 123 Business Ave, Suite 200, Austin TX 78701.',
					status: 'in-progress',
					priority: 'medium',
					dateOpened: new Date(
						Date.now() - 24 * 3600000
					).toISOString(),
					lastUpdated: new Date(
						Date.now() - 5 * 3600000
					).toISOString(),
					userEmail: 'client2@example.com',
					userId: 'user_2',
					clientName: 'Jane Doe',
					siteName: 'Nonprofit Organization',
					category: 'content',
					assignedTo: 'Michael',
				},
				{
					id: 'TKT-1230',
					subject: 'Form submissions not working',
					description:
						"The contact form on our website isn't sending emails. We've tested it several times but no emails are coming through.",
					status: 'closed',
					priority: 'high',
					dateOpened: new Date(
						Date.now() - 7 * 24 * 3600000
					).toISOString(),
					lastUpdated: new Date(
						Date.now() - 6 * 24 * 3600000
					).toISOString(),
					closedDate: new Date(
						Date.now() - 6 * 24 * 3600000
					).toISOString(),
					closedBy: 'Admin',
					userEmail: 'client3@example.com',
					userId: 'user_3',
					clientName: 'Alex Johnson',
					siteName: 'E-commerce Store',
					category: 'functionality',
					resolution:
						'Fixed email configuration in the form plugin settings and tested submission successfully.',
				},
				{
					id: 'TKT-1228',
					subject: 'SSL certificate error',
					description:
						"Getting security warnings when visiting our site. Chrome shows 'Not Secure' in the address bar.",
					status: 'open',
					priority: 'high',
					dateOpened: new Date(
						Date.now() - 1 * 24 * 3600000
					).toISOString(),
					userEmail: 'client4@example.com',
					userId: 'user_4',
					clientName: 'Robert Williams',
					siteName: 'Professional Services',
					category: 'technical',
				},
				{
					id: 'TKT-1226',
					subject: 'Need help with analytics setup',
					description:
						"Can you help us set up Google Analytics on our website? We'd like to track visitor statistics.",
					status: 'in-progress',
					priority: 'low',
					dateOpened: new Date(
						Date.now() - 3 * 24 * 3600000
					).toISOString(),
					lastUpdated: new Date(
						Date.now() - 1 * 24 * 3600000
					).toISOString(),
					userEmail: 'client5@example.com',
					userId: 'user_5',
					clientName: 'Sarah Miller',
					siteName: 'Personal Blog',
					category: 'analytics',
					assignedTo: 'Thomas',
				},
			];

			setTickets(mockTickets);
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
		fetchTickets();
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

	// Calculate statistics
	const stats = {
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
				onClick={fetchTickets}
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
					<div className='grid grid-cols-2 md:grid-cols-5 gap-3 mb-6'>
						<Card>
							<CardContent className='p-4 flex flex-col items-center'>
								<p className='text-muted-foreground text-sm'>
									Total Tickets
								</p>
								<p className='text-3xl font-bold'>
									{stats.total}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className='p-4 flex flex-col items-center'>
								<p className='text-muted-foreground text-sm'>
									Open
								</p>
								<p className='text-3xl font-bold text-blue-500'>
									{stats.open}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className='p-4 flex flex-col items-center'>
								<p className='text-muted-foreground text-sm'>
									In Progress
								</p>
								<p className='text-3xl font-bold text-yellow-500'>
									{stats.inProgress}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className='p-4 flex flex-col items-center'>
								<p className='text-muted-foreground text-sm'>
									Closed
								</p>
								<p className='text-3xl font-bold text-green-500'>
									{stats.closed}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className='p-4 flex flex-col items-center'>
								<p className='text-muted-foreground text-sm'>
									High Priority
								</p>
								<p className='text-3xl font-bold text-red-500'>
									{stats.highPriority}
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Filters */}
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

					{/* Tickets Table */}
					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='w-[60px]'>
										ID
									</TableHead>
									<TableHead
										className='cursor-pointer'
										onClick={() => handleSort('subject')}
									>
										<div className='flex items-center'>
											Subject
											{sortField === 'subject' && (
												<ArrowUpDown className='ml-2 h-3 w-3' />
											)}
										</div>
									</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Priority</TableHead>
									<TableHead
										className='cursor-pointer hidden md:table-cell'
										onClick={() => handleSort('dateOpened')}
									>
										<div className='flex items-center'>
											Date Opened
											{sortField === 'dateOpened' && (
												<ArrowUpDown className='ml-2 h-3 w-3' />
											)}
										</div>
									</TableHead>
									<TableHead className='hidden md:table-cell'>
										Client
									</TableHead>
									<TableHead className='hidden lg:table-cell'>
										Category
									</TableHead>
									<TableHead className='text-right'>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredTickets.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={7}
											className='text-center py-8'
										>
											No tickets found
										</TableCell>
									</TableRow>
								) : (
									filteredTickets.map((ticket) => (
										<TableRow key={ticket.id}>
											<TableCell className='font-mono text-sm'>
												{ticket.id}
											</TableCell>
											<TableCell>
												<div className='font-medium'>
													{ticket.subject}
												</div>
												<div className='text-muted-foreground text-xs truncate max-w-[250px]'>
													{ticket.siteName ||
														'No site specified'}
												</div>
											</TableCell>
											<TableCell>
												<TicketStatusBadge
													status={ticket.status}
												/>
											</TableCell>
											<TableCell>
												<TicketPriorityBadge
													priority={ticket.priority}
												/>
											</TableCell>
											<TableCell className='hidden md:table-cell text-sm'>
												{formatDate(ticket.dateOpened)}
											</TableCell>
											<TableCell className='hidden md:table-cell'>
												{ticket.clientName}
											</TableCell>
											<TableCell className='hidden lg:table-cell'>
												{ticket.category ? (
													<Badge variant='outline'>
														{ticket.category
															.charAt(0)
															.toUpperCase() +
															ticket.category.slice(
																1
															)}
													</Badge>
												) : (
													<span className='text-muted-foreground text-xs'>
														Uncategorized
													</span>
												)}
											</TableCell>
											<TableCell className='text-right'>
												<Sheet>
													<SheetTrigger asChild>
														<Button
															size='sm'
															variant='ghost'
															className='gap-1'
															onClick={() =>
																setSelectedTicket(
																	ticket
																)
															}
														>
															<span className='sr-only md:not-sr-only md:inline-block'>
																View
															</span>
															<ChevronRight className='h-4 w-4' />
														</Button>
													</SheetTrigger>
													<SheetContent className='w-full sm:max-w-xl overflow-auto'>
														<SupportTicketDetailView
															ticket={ticket}
															onBack={() =>
																setSelectedTicket(
																	null
																)
															}
														/>
													</SheetContent>
												</Sheet>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination could be added here */}
				</>
			)}
		</AdminLayout>
	);
}
