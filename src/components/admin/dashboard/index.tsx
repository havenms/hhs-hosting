// src/components/admin/dashboard/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { authFetch } from '@/lib/auth-utils';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { DashboardStats } from './cards/DashboardStats';
import { InboxTab } from './inbox/InboxTab';
import { UsersTab } from './users/UsersTab';
import { BillingTab } from './billing/BillingTab';
import { ActivityOverview } from './overview/ActivityOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdminDashboard() {
	const [users, setUsers] = useState([]);
	const [siteProjects, setSiteProjects] = useState([]);
	const [supportTickets, setSupportTickets] = useState([]);
	const [editRequests, setEditRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch data
	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await authFetch('/api/users');

			if (!response) {
				throw new Error('No response from server');
			}

			const clerkUsers = await response.json();

			setUsers(
				clerkUsers.map((user) => ({
					id: user.id,
					name:
						user.name ||
						`${user.firstName || ''} ${
							user.lastName || ''
						}`.trim() ||
						user.email?.split('@')[0] ||
						'No Name',
					email: user.email || '',
					signupDate:
						user.signupDate ||
						user.createdAt ||
						new Date().toISOString(),
					status: user.status || 'active',
					sites: user.sites || 0,
					tickets: user.tickets || 0,
					editRequests: user.editRequests || 0,
					phone: user.phone || '',
					company: user.company || '',
					plan: user.plan || '',
					nextBillingDate: user.nextBillingDate || null,
					paymentMethod: user.paymentMethod || '',
					billingHistory: user.billingHistory || [],
					isAdmin: user.isAdmin || false,
					role: user.role || 'user',
				}))
			);

			setSiteProjects([
				{
					id: 'project1',
					siteName: 'Demo Business Site',
					clientName: 'ABC Company',
					domain: 'example.com',
					stage: 'development',
					progress: 65,
					estimatedCompletion: new Date(
						Date.now() + 14 * 86400000
					).toISOString(),
					pendingActions: [
						{
							type: 'approval',
							description: 'Logo approval needed',
						},
					],
					userId: 'user1',
					email: 'client@example.com',
				},
				{
					id: 'project2',
					siteName: 'Nonprofit Organization',
					clientName: 'XYZ Foundation',
					domain: 'xyzfoundation.org',
					stage: 'design',
					progress: 30,
					estimatedCompletion: new Date(
						Date.now() + 30 * 86400000
					).toISOString(),
					pendingActions: [],
					userId: 'user2',
					email: 'info@xyzfoundation.org',
				},
			]);

			setSupportTickets([
				{
					id: 'ticket1',
					issue: 'Website Loading Slow',
					description: 'The homepage takes too long to load',
					status: 'open',
					priority: 'high',
					dateOpened: new Date().toISOString(),
					siteName: 'Demo Business Site',
					userId: 'user1',
					browser: 'Chrome',
				},
				{
					id: 'ticket2',
					issue: 'Contact Form Not Working',
					description: 'Submissions are not being received',
					status: 'in-progress',
					priority: 'medium',
					dateOpened: new Date(
						Date.now() - 2 * 86400000
					).toISOString(),
					siteName: 'XYZ Foundation',
					userId: 'user2',
					browser: 'Firefox',
				},
			]);

			
		} catch (err) {
			console.error('Error fetching users:', err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-background'>
			<div className='flex'>
				<main className='flex-1 p-4 md:p-6 overflow-auto'>
					{loading ? (
						<LoadingState />
					) : error ? (
						<ErrorState message={error} />
					) : (
						<>
							<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
								<h1 className='text-2xl sm:text-3xl font-bold'>
									Admin Dashboard
								</h1>
								{/* Your action buttons */}
							</div>

							<DashboardStats
								supportTickets={supportTickets}
								users={users}
							/>

							<Tabs
								defaultValue='inbox'
								className='mb-6'
							>
								<TabsList className='mb-4 w-full sm:w-auto overflow-auto'>
									<TabsTrigger value='inbox'>
										Unified Inbox
									</TabsTrigger>
									<TabsTrigger value='users'>
										User Management
									</TabsTrigger>
									<TabsTrigger value='billing'>
										Billing
									</TabsTrigger>
								</TabsList>

								<TabsContent value='inbox'>
									<InboxTab
										editRequests={editRequests}
										supportTickets={supportTickets}
									/>
								</TabsContent>

								<TabsContent value='users'>
									<UsersTab
										users={users}
										projects={siteProjects}
										tickets={supportTickets}
										requests={editRequests}
									/>
								</TabsContent>

								<TabsContent value='billing'>
									<BillingTab users={users} />
								</TabsContent>
							</Tabs>

							<div className='grid grid-cols-1 gap-6'>
								<ActivityOverview
									tickets={supportTickets}
									requests={editRequests}
									users={users}
								/>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
