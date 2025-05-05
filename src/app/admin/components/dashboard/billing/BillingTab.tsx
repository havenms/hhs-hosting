'use client';

import { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Search,
	Bell,
	ArrowUpRight,
	CreditCard,
	Edit,
	PencilLine,
	MoreHorizontal,
} from 'lucide-react';
import { formatDate } from '../shared/utils';

interface User {
  id: string | number;
  name: string;
  email: string;
  company?: string;
  plan?: 'Managed Basic' | 'Managed Pro' | 'Managed Premium';
  nextBillingDate?: Date | string;
  paymentMethod?: string;
}

interface BillingTabProps {
	users: User[];
}

export function BillingTab({ users }: BillingTabProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterPlan, setFilterPlan] = useState('all');

	// Filter function for billing users
	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.company?.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;

		return matchesSearch && matchesPlan;
	});

	// Calculate statistics
	const totalRevenue = filteredUsers.reduce((sum, user) => {
		// Use a default price if plan doesn't exist or price is not available
		const planPrice = user.plan ? {
				'Managed Basic': 39.99,
				'Managed Pro': 79.99,
				'Managed Premium': 149.99,
			}[user.plan] : 0;

		return sum + planPrice;
	}, 0);

	const activeSubscriptions = filteredUsers.filter(
		(user) => user.plan
	).length;

	// Count users by plan
	const planCounts = {
		'Managed Basic': filteredUsers.filter((u) => u.plan === 'Managed Basic')
			.length,
		'Managed Pro': filteredUsers.filter((u) => u.plan === 'Managed Pro')
			.length,
		'Managed Premium': filteredUsers.filter(
			(u) => u.plan === 'Managed Premium'
		).length,
	};

	// Calculate percentages for plan distribution
	const totalPlans =
		planCounts['Managed Basic'] +
		planCounts['Managed Pro'] +
		planCounts['Managed Premium'];
	const basicPercent = totalPlans
		? Math.round((planCounts['Managed Basic'] / totalPlans) * 100)
		: 0;
	const proPercent = totalPlans
		? Math.round((planCounts['Managed Pro'] / totalPlans) * 100)
		: 0;
	const premiumPercent = totalPlans
		? Math.round((planCounts['Managed Premium'] / totalPlans) * 100)
		: 0;

	return (
		<div className='space-y-4'>
			<div className='flex flex-col sm:flex-row gap-3 justify-between'>
				<div className='relative flex-1'>
					<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Search billing...'
						className='pl-8'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select
					value={filterPlan}
					onValueChange={setFilterPlan}
				>
					<SelectTrigger className='w-full sm:w-[180px]'>
						<SelectValue placeholder='All plans' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All plans</SelectItem>
						<SelectItem value='Managed Basic'>
							Managed Basic
						</SelectItem>
						<SelectItem value='Managed Pro'>Managed Pro</SelectItem>
						<SelectItem value='Managed Premium'>
							Managed Premium
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
				{/* Billing Overview Cards */}
				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Monthly Revenue
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							${totalRevenue.toFixed(2)}
						</div>
						<p className='text-xs text-muted-foreground'>
							From {activeSubscriptions} active subscription
							{activeSubscriptions !== 1 ? 's' : ''}
						</p>
					</CardContent>
					<CardFooter>
						<div className='text-xs flex items-center text-green-500'>
							<ArrowUpRight className='h-3 w-3 mr-1' />
							+12% from last month
						</div>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm font-medium'>
							Upcoming Payments
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>$159.96</div>
						<p className='text-xs text-muted-foreground'>
							Next 7 days (4 renewals)
						</p>
					</CardContent>
					<CardFooter>
						<Button
							variant='outline'
							size='sm'
							className='w-full text-xs'
						>
							<Bell className='h-3 w-3 mr-1' />
							View Schedule
						</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm font-medium'>
							Plan Distribution
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex justify-between items-center'>
							<div>
								<div className='text-sm'>
									Basic:{' '}
									<span className='font-bold'>
										{planCounts['Managed Basic']}
									</span>
								</div>
								<div className='text-sm'>
									Pro:{' '}
									<span className='font-bold'>
										{planCounts['Managed Pro']}
									</span>
								</div>
								<div className='text-sm'>
									Premium:{' '}
									<span className='font-bold'>
										{planCounts['Managed Premium']}
									</span>
								</div>
							</div>
							<div className='flex flex-col items-center gap-1'>
								<div className='h-4 w-24 rounded-full bg-slate-200 overflow-hidden flex'>
									<div
										className='h-full bg-blue-500'
										style={{
											width: `${basicPercent}%`,
										}}
									></div>
									<div
										className='h-full bg-purple-500'
										style={{
											width: `${proPercent}%`,
										}}
									></div>
									<div
										className='h-full bg-green-500'
										style={{
											width: `${premiumPercent}%`,
										}}
									></div>
								</div>
								<span className='text-[10px] text-muted-foreground'>
									Distribution
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* User Billing List */}
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>User</TableHead>
							<TableHead>Plan</TableHead>
							<TableHead className='hidden md:table-cell'>
								Monthly Fee
							</TableHead>
							<TableHead className='hidden lg:table-cell'>
								Next Billing
							</TableHead>
							<TableHead className='hidden md:table-cell'>
								Payment Method
							</TableHead>
							<TableHead className='text-right'>
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredUsers
							.filter((user) => user.plan)
							.map((user) => {
								const planPrices = {
									'Managed Basic': 39.99,
									'Managed Pro': 79.99,
									'Managed Premium': 149.99,
								};
								const price = planPrices[user.plan as keyof typeof planPrices] || 0;

								return (
									<TableRow key={user.id}>
										<TableCell>
											<div className='font-medium'>
												{user.name}
											</div>
											<div className='text-xs text-muted-foreground'>
												{user.email}
											</div>
										</TableCell>
										<TableCell>{user.plan}</TableCell>
										<TableCell className='hidden md:table-cell'>
											${price.toFixed(2)}/mo
										</TableCell>
										<TableCell className='hidden lg:table-cell'>
											{user.nextBillingDate
												? formatDate(
														user.nextBillingDate
												  )
												: '-'}
										</TableCell>
										<TableCell className='hidden md:table-cell text-sm'>
											{user.paymentMethod || '-'}
										</TableCell>
										<TableCell className='text-right'>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant='ghost'
														size='sm'
													>
														<MoreHorizontal className='h-4 w-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuItem>
														<CreditCard className='mr-2 h-4 w-4' />
														Edit Payment Method
													</DropdownMenuItem>
													<DropdownMenuItem>
														<Edit className='mr-2 h-4 w-4' />
														Change Plan
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem>
														<PencilLine className='mr-2 h-4 w-4' />
														Send Invoice
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								);
							})}
						{filteredUsers.filter((u) => u.plan).length === 0 && (
							<TableRow>
								<TableCell
									colSpan={6}
									className='h-24 text-center'
								>
									No users with billing plans found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
