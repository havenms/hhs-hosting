import { useState } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, FileQuestion, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { TicketTable } from './TicketTable';
import { ticketHistory } from '../../data/tickethistory';

interface TicketHistoryProps {
	isLoggedIn: boolean;
	onTabChange: (tab: string) => void;
}

export function TicketHistory({ isLoggedIn, onTabChange }: TicketHistoryProps) {
	const [, setRefreshCounter] = useState(0); // For simulating refresh

	const handleRefresh = () => {
		setRefreshCounter((prev) => prev + 1);
		// Here you could also fetch fresh data
	};

	if (!isLoggedIn) {
		return (
			<Card>
				<CardContent className='py-12 text-center'>
					<AlertCircle className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
					<h3 className='text-xl font-medium mb-2'>
						Please log in to view your tickets
					</h3>
					<p className='text-muted-foreground mb-6'>
						You need to be logged in to access your support ticket
						history.
					</p>
					<Button asChild>
						<Link href='/login'>Log In</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center'>
					<Clock className='h-5 w-5 mr-2 text-primary' />
					Your Support Tickets
				</CardTitle>
				<CardDescription>
					View and manage your support history
				</CardDescription>
			</CardHeader>
			<CardContent>
				{ticketHistory.length === 0 ? (
					<div className='text-center py-8'>
						<FileQuestion className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
						<h3 className='text-lg font-medium'>
							No tickets found
						</h3>
						<p className='text-muted-foreground mb-4'>
							You haven't submitted any support tickets yet.
						</p>
						<Button
							onClick={() => onTabChange('contact')}
							className='rounded-full'
						>
							Create a Ticket
						</Button>
					</div>
				) : (
					<TicketTable onRefresh={handleRefresh} />
				)}
			</CardContent>
			<CardFooter className='flex justify-between border-t pt-6'>
				<Button
					variant='outline'
					className='rounded-full'
					onClick={handleRefresh}
				>
					<RefreshCw className='h-4 w-4 mr-2' />
					Refresh
				</Button>

				<Button
					className='rounded-full'
					onClick={() => onTabChange('contact')}
				>
					Create New Ticket
				</Button>
			</CardFooter>
		</Card>
	);
}
