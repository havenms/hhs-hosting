'use client';

import {
	TicketCheck,
	Users,
	ArrowUpRight,
	AlertTriangle,
	CheckCircle,
	PieChart,
} from 'lucide-react';
import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';

interface SupportTicket {
	status: 'open' | 'in-progress' | 'closed';
	priority: 'high' | 'medium' | 'low';
	category?: string;
}

interface User {
	status: string;
	// Add other properties as needed
}

interface DashboardStatsProps {
	supportTickets: SupportTicket[];
	users: User[];
}

export function DashboardStats({ supportTickets, users }: DashboardStatsProps) {
	// Count tickets by status
	const openTickets = supportTickets.filter(
		(ticket) => ticket.status === 'open'
	).length;
	const inProgressTickets = supportTickets.filter(
		(ticket) => ticket.status === 'in-progress'
	).length;
	const closedTickets = supportTickets.filter(
		(ticket) => ticket.status === 'closed'
	).length;

	// Count tickets by priority
	const highPriorityTickets = supportTickets.filter(
		(ticket) => ticket.priority === 'high'
	).length;
	const mediumPriorityTickets = supportTickets.filter(
		(ticket) => ticket.priority === 'medium'
	).length;
	const lowPriorityTickets = supportTickets.filter(
		(ticket) => ticket.priority === 'low'
	).length;

	// Count tickets by category
	const ticketCategories = supportTickets.reduce<Record<string, number>>((acc, ticket) => {
		const category = ticket.category || 'uncategorized';
		acc[category] = (acc[category] || 0) + 1;
		return acc;
	}, {});

	// Get top categories for display
	const topCategories = Object.entries(ticketCategories)
		.sort(
			([, countA]: [string, number], [, countB]: [string, number]) =>
				(countB as number) - (countA as number)
		)
		.slice(0, 3);

	return (
		<div className='space-y-6'>
			{/* Main metrics */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
				{/* Open Tickets Card */}
				<DashboardCard
					title='Open Tickets'
					value={openTickets}
					icon={<TicketCheck className='h-5 w-5' />}
					description='Awaiting response'
					trend={`${Math.round(
						(openTickets / Math.max(supportTickets.length, 1)) * 100
					)}% of total`}
					trendUp={false}
					color='bg-blue-500'
				/>

				{/* In Progress Tickets Card */}
				<DashboardCard
					title='In Progress'
					value={inProgressTickets}
					icon={<TicketCheck className='h-5 w-5' />}
					description='Being worked on'
					trend={`${Math.round(
						(inProgressTickets /
							Math.max(supportTickets.length, 1)) *
							100
					)}% of total`}
					trendUp={false}
					color='bg-yellow-500'
				/>

				{/* High Priority Card */}
				<DashboardCard
					title='High Priority'
					value={highPriorityTickets}
					icon={<AlertTriangle className='h-5 w-5' />}
					description='Urgent attention needed'
					trend={`${Math.round(
						(highPriorityTickets /
							Math.max(supportTickets.length, 1)) *
							100
					)}% of total`}
					trendUp={highPriorityTickets > 0}
					color='bg-red-500'
				/>

				{/* Closed Tickets Card */}
				<DashboardCard
					title='Resolved'
					value={closedTickets}
					icon={<CheckCircle className='h-5 w-5' />}
					description='Completed tickets'
					trend={`${Math.round(
						(closedTickets / Math.max(supportTickets.length, 1)) *
							100
					)}% of total`}
					trendUp={true}
					color='bg-green-500'
				/>
			</div>

			{/* Detailed breakdowns */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{/* Priority breakdown */}
				<Card>
					<CardHeader>
						<CardTitle className='text-sm font-medium flex items-center'>
							<PieChart className='h-4 w-4 mr-2' />
							Priority Distribution
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<div className='flex justify-between text-xs'>
								<span className='font-medium'>High</span>
								<span className='text-muted-foreground'>
									{highPriorityTickets} tickets
								</span>
							</div>
							<Progress
								value={Math.round(
									(highPriorityTickets /
										Math.max(supportTickets.length, 1)) *
										100
								)}
								className='h-2 bg-muted'
								indicatorColor='bg-red-500'
							/>
						</div>
						<div className='space-y-2'>
							<div className='flex justify-between text-xs'>
								<span className='font-medium'>Medium</span>
								<span className='text-muted-foreground'>
									{mediumPriorityTickets} tickets
								</span>
							</div>
							<Progress
								value={Math.round(
									(mediumPriorityTickets /
										Math.max(supportTickets.length, 1)) *
										100
								)}
								className='h-2 bg-muted'
								indicatorColor='bg-yellow-500'
							/>
						</div>
						<div className='space-y-2'>
							<div className='flex justify-between text-xs'>
								<span className='font-medium'>Low</span>
								<span className='text-muted-foreground'>
									{lowPriorityTickets} tickets
								</span>
							</div>
							<Progress
								value={Math.round(
									(lowPriorityTickets /
										Math.max(supportTickets.length, 1)) *
										100
								)}
								className='h-2 bg-muted'
								indicatorColor='bg-blue-500'
							/>
						</div>
					</CardContent>
				</Card>

				{/* Category breakdown */}
				<Card>
					<CardHeader>
						<CardTitle className='text-sm font-medium flex items-center'>
							<TicketCheck className='h-4 w-4 mr-2' />
							Top Issue Categories
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						{topCategories.length > 0 ? (
							topCategories.map(
								(
									[category, count]: [string, number],
									index
								) => (
									<div
										key={category}
										className='space-y-2'
									>
										<div className='flex justify-between text-xs'>
											<span className='font-medium capitalize'>
												{category}
											</span>
											<span className='text-muted-foreground'>
												{count} tickets
											</span>
										</div>
										<Progress
											value={Math.round(
												((count as number) /
													Math.max(
														supportTickets.length,
														1
													)) *
													100
											)}
											className='h-2 bg-muted'
											indicatorColor={
												index === 0
													? 'bg-purple-500'
													: index === 1
													? 'bg-indigo-500'
													: 'bg-teal-500'
											}
										/>
									</div>
								)
							)
						) : (
							<div className='text-center py-6 text-muted-foreground text-sm'>
								No categorized tickets
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Users Card */}
			<div className='grid grid-cols-1'>
				<DashboardCard
					title='Active Users'
					value={users.length}
					icon={<Users className='h-5 w-5' />}
					description='Total registered users'
					trend={`${
						users.filter((u) => u.status === 'active').length
					} active`}
					trendUp={true}
					color='bg-purple-500'
				/>
			</div>
		</div>
	);
}

// Helper Dashboard Card component
interface DashboardCardProps {
	title: string;
	value: number;
	icon: React.ReactNode;
	description: string;
	trend: string;
	trendUp: boolean;
	color: string;
}

function DashboardCard({
	title,
	value,
	icon,
	description,
	trend,
	trendUp,
	color,
}: DashboardCardProps) {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				<div className={`${color} p-2 rounded-full text-white`}>
					{icon}
				</div>
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{value}</div>
				<p className='text-xs text-muted-foreground'>{description}</p>
			</CardContent>
			<CardFooter>
				<div
					className={`text-xs flex items-center ${
						trendUp ? 'text-green-500' : 'text-red-500'
					}`}
				>
					{trendUp ? (
						<ArrowUpRight className='h-3 w-3 mr-1' />
					) : (
						<ArrowUpRight className='h-3 w-3 mr-1 rotate-180' />
					)}
					{trend}
				</div>
			</CardFooter>
		</Card>
	);
}

// Custom Progress component with color prop
interface ProgressProps {
	value: number;
	className?: string;
	indicatorColor: string;
}

function Progress({ value, className, indicatorColor }: ProgressProps) {
	return (
		<div
			className={`w-full bg-muted rounded-full overflow-hidden ${className}`}
		>
			<div
				className={`h-full ${indicatorColor}`}
				style={{ width: `${Math.min(value, 100)}%` }}
			/>
		</div>
	);
}
