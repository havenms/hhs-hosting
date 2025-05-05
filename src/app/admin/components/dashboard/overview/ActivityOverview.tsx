'use client';

import Link from 'next/link';
import {
	Inbox,
	FileEdit,
	TicketCheck,
	User,
	Clock,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Helper function to format relative time
function formatRelativeTime(dateString: string) {
	const now = new Date();
	const date = new Date(dateString);
	const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

	if (diffInHours < 1) return 'Just now';
	if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
	const diffInDays = Math.floor(diffInHours / 24);
	return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
}

// Activity item component
function ActivityItem({ icon, title, description, time }) {
	return (
		<div className='flex gap-4 p-4'>
			<div className='bg-muted mt-0.5 p-2 rounded-full'>{icon}</div>
			<div className='flex-1'>
				<p className='text-sm font-medium'>{title}</p>
				<p className='text-sm text-muted-foreground'>{description}</p>
				<p className='text-xs text-muted-foreground mt-1'>{time}</p>
			</div>
		</div>
	);
}

interface Ticket {
  id: string | number;
  status: string;
  issue: string;
  dateOpened: string;
}

interface Request {
  id: string | number;
  clientName: string;
  siteName: string;
  requestDate: string;
}

interface User {
  id: string | number;
  name: string;
  signupDate: string;
}

interface ActivityOverviewProps {
	tickets: Ticket[];
	requests: Request[];
	users: User[];
}

export function ActivityOverview({
	tickets,
	requests,
	users,
}: ActivityOverviewProps) {
	// Generate activity items from different data sources
	const activities = [
		// From edit requests
		...requests.map((request) => ({
			id: `edit-${request.id}`,
			type: 'edit',
			icon: <FileEdit className='h-4 w-4' />,
			title: 'Edit request submitted',
			description: `${request.clientName} requested changes to ${request.siteName}`,
			time: formatRelativeTime(request.requestDate),
			date: new Date(request.requestDate),
		})),

		// From support tickets
		...tickets.map((ticket) => ({
			id: `ticket-${ticket.id}`,
			type: 'ticket',
			icon: <TicketCheck className='h-4 w-4' />,
			title:
				ticket.status === 'closed'
					? 'Support ticket closed'
					: 'Support ticket opened',
			description: ticket.issue,
			time: formatRelativeTime(ticket.dateOpened),
			date: new Date(ticket.dateOpened),
		})),

		// From users (recent signups)
		...users
			.filter((user) => {
				const signupDate = new Date(user.signupDate);
				const thirtyDaysAgo = new Date();
				thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
				return signupDate > thirtyDaysAgo;
			})
			.map((user) => ({
				id: `user-${user.id}`,
				type: 'user',
				icon: <User className='h-4 w-4' />,
				title: 'New user registered',
				description: `${user.name} created an account`,
				time: formatRelativeTime(user.signupDate),
				date: new Date(user.signupDate),
			})),
	];

	// Sort activities by date (newest first)
	const sortedActivities = activities
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 5); // Only show the 5 most recent activities

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Inbox className='h-5 w-5 text-primary' />
					Recent User Activity
				</CardTitle>
				<CardDescription>
					Latest actions across the platform
				</CardDescription>
			</CardHeader>
			<CardContent className='p-0'>
				<div className='divide-y'>
					{sortedActivities.length > 0 ? (
						sortedActivities.map((activity) => (
							<ActivityItem
								key={activity.id}
								icon={activity.icon}
								title={activity.title}
								description={activity.description}
								time={activity.time}
							/>
						))
					) : (
						<div className='p-4 text-center text-muted-foreground'>
							No recent activity
						</div>
					)}
				</div>
			</CardContent>
			<CardFooter className='flex justify-center p-4'>
				<Button
					variant='outline'
					size='sm'
					asChild
				>
					<Link href='/admin/activity'>
						<Clock className='mr-2 h-4 w-4' />
						View All Activity
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
