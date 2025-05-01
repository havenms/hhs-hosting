import { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Clock,
	FileQuestion,
	RefreshCw,
	AlertCircle,
	Loader2,
} from 'lucide-react';
import { TicketTable } from './TicketTable';
import { ticketHistory } from '../../data/tickethistory';
import { useAuth } from '@/components/auth-provider';

interface TicketHistoryProps {
	isLoggedIn: boolean;
	onTabChange: (tab: string) => void;
}

export function TicketHistory({ isLoggedIn, onTabChange }: TicketHistoryProps) {
	const { user } = useAuth();
	const [refreshCounter, setRefreshCounter] = useState(0);
	const [userTickets, setUserTickets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch user tickets from API
	const fetchUserTickets = async () => {
		// Since we're already on a protected page, we can assume the user is authenticated
		setLoading(true);
		setError(null);

		try {
			console.log('Fetching tickets for user:', user?.id);

			const response = await fetch('/api/tickets', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			console.log(`API response status: ${response.status}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch tickets: ${response.status}`);
			}

			const data = await response.json();
			console.log(`Received ${data.length} tickets from API`);

			// Format tickets for display
			const formattedTickets = data.map((ticket) => ({
				id: ticket.id || `TKT-${Math.floor(Math.random() * 10000)}`,
				subject: ticket.subject,
				createdAt: ticket.createdAt || ticket.dateOpened,
				status:
					ticket.status === 'open'
						? 'Open'
						: ticket.status === 'closed'
						? 'Closed'
						: ticket.status === 'in-progress'
						? 'In Progress'
						: 'Open',
				priority:
					ticket.priority === 'high'
						? 'High'
						: ticket.priority === 'medium'
						? 'Medium'
						: ticket.priority === 'low'
						? 'Low'
						: 'Medium',
				lastUpdated:
					ticket.updatedAt || ticket.lastUpdated || ticket.createdAt,
				messages: ticket.messages || 0,
			}));

			// Always update state regardless of whether array is empty
			setUserTickets(formattedTickets);
		} catch (err) {
			console.error('Error fetching tickets:', err);
			setError('Could not load your tickets. Please try again later.');

			// Only use mock data in development as fallback
			if (process.env.NODE_ENV === 'development') {
				console.log('Using mock ticket data as fallback');
				setUserTickets(ticketHistory);
			}
		} finally {
			setLoading(false);
		}
	};

	// Fetch tickets on component mount and when refreshCounter changes
	useEffect(() => {
		fetchUserTickets();
	}, [refreshCounter]);

	const handleRefresh = () => {
		setRefreshCounter((prev) => prev + 1);
	};

	// No need to check isLoggedIn since this page is already protected

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
				{loading ? (
					<div className='flex justify-center items-center py-12'>
						<Loader2 className='h-8 w-8 text-primary animate-spin' />
					</div>
				) : error ? (
					<div className='text-center py-8'>
						<AlertCircle className='h-12 w-12 text-red-500 mx-auto mb-4' />
						<h3 className='text-lg font-medium'>
							Something went wrong
						</h3>
						<p className='text-muted-foreground mb-4'>{error}</p>
						<Button onClick={handleRefresh}>Try Again</Button>
					</div>
				) : userTickets.length === 0 ? (
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
					<TicketTable
						tickets={userTickets}
						onRefresh={handleRefresh}
					/>
				)}
			</CardContent>
			<CardFooter className='flex justify-between border-t pt-6'>
				<Button
					variant='outline'
					className='rounded-full'
					onClick={handleRefresh}
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader2 className='h-4 w-4 mr-2 animate-spin' />
							Loading...
						</>
					) : (
						<>
							<RefreshCw className='h-4 w-4 mr-2' />
							Refresh
						</>
					)}
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
