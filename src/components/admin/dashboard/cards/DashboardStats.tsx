'use client';

import { TicketCheck, Users, ArrowUpRight } from 'lucide-react';
import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';

// Updated interface removing projects and editRequests
interface DashboardStatsProps {
	supportTickets: any[];
	users: any[];
}

export function DashboardStats({ supportTickets, users }: DashboardStatsProps) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
			{/* Support Tickets Card */}
			<DashboardCard
				title='Support Tickets'
				value={
					supportTickets.filter(
						(ticket) => ticket.status !== 'closed'
					).length
				}
				icon={<TicketCheck className='h-5 w-5' />}
				description='Open tickets'
				trend='-2 this week'
				trendUp={false}
				color='bg-green-500'
			/>

			{/* Users Card */}
			<DashboardCard
				title='Users'
				value={users.length}
				icon={<Users className='h-5 w-5' />}
				description='Total users'
				trend='+3 this month'
				trendUp={true}
				color='bg-purple-500'
			/>
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
