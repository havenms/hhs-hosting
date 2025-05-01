// src/components/admin/dashboard/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { authFetch } from '@/lib/auth-utils';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { DashboardStats } from './cards/DashboardStats';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function AdminDashboard() {
	const [users, setUsers] = useState([]);
	const [supportTickets, setSupportTickets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isRefreshing, setIsRefreshing] = useState(false);

	// Fetch data function that can be reused
	const fetchDashboardData = async () => {
		try {
			setLoading(true);
			setError(null);

			// Fetch users data
			const usersResponse = await authFetch('/api/users');
			if (!usersResponse.ok) throw new Error('Failed to fetch users');
			const usersData = await usersResponse.json();

			// Fetch tickets data
			const ticketsResponse = await authFetch('/api/tickets/admin');
			if (!ticketsResponse.ok) throw new Error('Failed to fetch tickets');
			const ticketsData = await ticketsResponse.json();

			setUsers(usersData);
			setSupportTickets(ticketsData);

			console.log('Dashboard data loaded:', {
				users: usersData.length,
				tickets: ticketsData.length,
			});
		} catch (err) {
			console.error('Error loading dashboard data:', err);
			setError(
				err instanceof Error
					? err.message
					: 'Failed to load dashboard data'
			);
		} finally {
			setLoading(false);
			setIsRefreshing(false);
		}
	};

	// Handle manual refresh
	const handleRefresh = () => {
		setIsRefreshing(true);
		fetchDashboardData();
	};

	// Initial data load
	useEffect(() => {
		fetchDashboardData();
	}, []);

	return (
		<div className='min-h-screen bg-background'>
			<div className='flex'>
				<main className='flex-1 p-4 md:p-6 overflow-auto'>
					{loading && !isRefreshing ? (
						<LoadingState />
					) : error ? (
						<ErrorState message={error} />
					) : (
						<>
							<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
								<h1 className='text-2xl sm:text-3xl font-bold'>
									Admin Dashboard
								</h1>

								<Button
									onClick={handleRefresh}
									variant='outline'
									size='sm'
									disabled={isRefreshing}
								>
									<RefreshCw
										className={`h-4 w-4 mr-2 ${
											isRefreshing ? 'animate-spin' : ''
										}`}
									/>
									{isRefreshing
										? 'Refreshing...'
										: 'Refresh Data'}
								</Button>
							</div>

							{/* Pass the fetched data to DashboardStats */}
							<DashboardStats
								supportTickets={supportTickets}
								users={users}
								prefetchedData={true} // Tell component data is already fetched
							/>

							{/* Other dashboard components */}
						</>
					)}
				</main>
			</div>
		</div>
	);
}
