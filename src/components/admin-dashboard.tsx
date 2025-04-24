'use client';

import { useState, useEffect } from 'react';
import { authFetch } from '@/lib/auth-utils';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	BarChart3,
	Clock,
	FileEdit,
	HardDrive,
	LayoutDashboard,
	TicketCheck,
	User,
	Users,
	Calendar,
	ChevronRight,
	AlertCircle,
	CheckCircle,
	ArrowUpRight,
	CreditCard,
	Search,
	Filter,
	ExternalLink,
	MessageCircle,
	Eye,
	Edit,
	PencilLine,
	Bell,
	Inbox,
	UserCog,
	CheckCircle2,
	Circle,
	MoreHorizontal,
	PlusCircle,
	Loader2,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { UserNavbar } from '@/components/user-navbar';
import { AdminSidebar } from '@/components/admin-sidebar';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

// More Button Component
function MoreButton() {
	return <MoreHorizontal className='h-4 w-4' />;
}

export function AdminDashboard() {
	// Replace static mock arrays with state variables
	const [users, setUsers] = useState([]);
	const [siteProjects, setSiteProjects] = useState([]);
	const [supportTickets, setSupportTickets] = useState([]);
	const [editRequests, setEditRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch users data
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true);
				const response = await authFetch('/api/users');

				if (!response) {
					throw new Error('No response from server');
				}

				const clerkUsers = await response.json();

				// Map Clerk users to your expected format
				const formattedUsers = clerkUsers.map((user) => ({
					id: user.id,
					name:
						user.name ||
						`${user.firstName || ''} ${
							user.lastName || ''
						}`.trim() ||
						user.email.split('@')[0],
					email: user.email,
					signupDate: user.createdAt || new Date().toISOString(),
					status: user.status || 'active',
					sites: 0, // You can fetch this from your database
					phone: user.phoneNumber || '',
					company: user.company || 'Haven Media Solutions',
					plan: user.plan || 'Managed Basic',
					nextBillingDate: user.nextBillingDate || '',
					paymentMethod: user.paymentMethod || '',
					billingHistory: user.billingHistory || [],
					role: user.role || user.publicMetadata?.role || 'user',
					isAdmin:
						user.isAdmin || user.publicMetadata?.isAdmin || false,
				}));

				setUsers(formattedUsers);
				console.log('Loaded users:', formattedUsers);
			} catch (err) {
				console.error('Error fetching users:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const [activeView, setActiveView] = useState('overview');
	const [selectedProject, setSelectedProject] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');

	// Filter function for projects
	const filteredProjects = siteProjects.filter((project) => {
		const matchesSearch =
			project.clientName
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			project.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.domain.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus =
			filterStatus === 'all' || project.stage === filterStatus;

		return matchesSearch && matchesStatus;
	});

	return (
		<div className='min-h-screen bg-background'>
			<UserNavbar />

			<div className='flex'>
				<AdminSidebar />

				<main className='flex-1 p-4 md:p-6 overflow-auto'>
					{loading ? (
						<div className='flex items-center justify-center h-64'>
							<Loader2 className='h-8 w-8 animate-spin text-primary' />
							<p className='ml-2'>Loading dashboard data...</p>
						</div>
					) : error ? (
						<div className='p-4 border border-red-200 bg-red-50 rounded-md'>
							<h3 className='text-red-700 font-medium'>
								Error loading data
							</h3>
							<p className='text-red-600'>{error}</p>
						</div>
					) : (
						<>
							<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
								<h1 className='text-2xl sm:text-3xl font-bold'>
									Admin Dashboard
								</h1>
								<div className='flex flex-wrap gap-2'>
									<Button
										variant='outline'
										size='sm'
									>
										<Calendar className='h-4 w-4 mr-2' />
										Schedule
									</Button>
									<Button size='sm'>
										<FileEdit className='h-4 w-4 mr-2' />
										New Site
									</Button>
								</div>
							</div>

							{/* Statistics Cards */}
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
								<DashboardCard
									title='Projects'
									value={siteProjects.length}
									icon={
										<LayoutDashboard className='h-5 w-5' />
									}
									description='Active site projects'
									trend='+2 this month'
									trendUp={true}
									color='bg-blue-500'
								/>
								<DashboardCard
									title='Edit Requests'
									value={
										editRequests.filter(
											(req) => req.status !== 'completed'
										).length
									}
									icon={<FileEdit className='h-5 w-5' />}
									description='Pending requests'
									trend='+5 this week'
									trendUp={true}
									color='bg-amber-500'
								/>
								<DashboardCard
									title='Support Tickets'
									value={
										supportTickets.filter(
											(ticket) =>
												ticket.status !== 'closed'
										).length
									}
									icon={<TicketCheck className='h-5 w-5' />}
									description='Open tickets'
									trend='-2 this week'
									trendUp={false}
									color='bg-green-500'
								/>
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

							{/* Main Content Tabs */}
							<Tabs
								defaultValue='projects'
								className='mb-6'
							>
								<TabsList className='mb-4 w-full sm:w-auto overflow-auto'>
									<TabsTrigger value='projects'>
										Site Projects
									</TabsTrigger>
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

								{/* Project Management Tab */}
								<TabsContent
									value='projects'
									className='space-y-4'
								>
									<div className='flex flex-col sm:flex-row gap-3 justify-between'>
										<div className='relative flex-1'>
											<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
											<Input
												placeholder='Search projects...'
												className='pl-8'
												value={searchTerm}
												onChange={(e) =>
													setSearchTerm(
														e.target.value
													)
												}
											/>
										</div>
										<Select
											value={filterStatus}
											onValueChange={setFilterStatus}
										>
											<SelectTrigger className='w-full sm:w-[200px]'>
												<SelectValue placeholder='Filter by status' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='all'>
													All Stages
												</SelectItem>
												<SelectItem value='requirements'>
													Requirements
												</SelectItem>
												<SelectItem value='design'>
													Design
												</SelectItem>
												<SelectItem value='development'>
													Development
												</SelectItem>
												<SelectItem value='testing'>
													Testing
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className='rounded-md border'>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>
														Client
													</TableHead>
													<TableHead>Site</TableHead>
													<TableHead className='hidden md:table-cell'>
														Stage
													</TableHead>
													<TableHead className='hidden md:table-cell'>
														Progress
													</TableHead>
													<TableHead className='hidden lg:table-cell'>
														Est. Completion
													</TableHead>
													<TableHead className='hidden lg:table-cell'>
														Pending Actions
													</TableHead>
													<TableHead className='text-right'>
														Actions
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{filteredProjects.map(
													(project) => (
														<TableRow
															key={project.id}
														>
															<TableCell className='font-medium'>
																{
																	project.clientName
																}
																<div className='text-xs text-muted-foreground hidden md:block'>
																	{
																		project.email
																	}
																</div>
															</TableCell>
															<TableCell>
																{
																	project.siteName
																}
																<div className='text-xs text-muted-foreground truncate max-w-[150px]'>
																	{
																		project.domain
																	}
																</div>
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																<StageIndicator
																	stage={
																		project.stage
																	}
																/>
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																<div className='flex items-center gap-2'>
																	<Progress
																		value={
																			project.progress
																		}
																		className='h-2 w-20'
																	/>
																	<span className='text-xs text-muted-foreground'>
																		{
																			project.progress
																		}
																		%
																	</span>
																</div>
															</TableCell>
															<TableCell className='hidden lg:table-cell'>
																{formatDate(
																	project.estimatedCompletion
																)}
															</TableCell>
															<TableCell className='hidden lg:table-cell'>
																{project.pendingActions &&
																project
																	.pendingActions
																	.length >
																	0 ? (
																	<Badge
																		variant='outline'
																		className='bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
																	>
																		{
																			project
																				.pendingActions
																				.length
																		}{' '}
																		action
																		{project
																			.pendingActions
																			.length >
																		1
																			? 's'
																			: ''}
																	</Badge>
																) : (
																	<Badge
																		variant='outline'
																		className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
																	>
																		None
																	</Badge>
																)}
															</TableCell>
															<TableCell className='text-right'>
																<Sheet>
																	<SheetTrigger
																		asChild
																	>
																		<Button
																			size='sm'
																			variant='ghost'
																			className='gap-1'
																			onClick={() =>
																				setSelectedProject(
																					project
																				)
																			}
																		>
																			<span className='sr-only md:not-sr-only md:inline-block'>
																				Manage
																			</span>
																			<ChevronRight className='h-4 w-4' />
																		</Button>
																	</SheetTrigger>
																	<SheetContent className='w-full sm:max-w-xl overflow-auto'>
																		{/* Project Detail View */}
																		<ProjectDetailView
																			project={
																				project
																			}
																			onClose={() =>
																				setSelectedProject(
																					null
																				)
																			}
																		/>
																	</SheetContent>
																</Sheet>
															</TableCell>
														</TableRow>
													)
												)}
											</TableBody>
										</Table>
									</div>
								</TabsContent>

								{/* Unified Inbox Tab */}
								<TabsContent
									value='inbox'
									className='space-y-4'
								>
									<div className='flex flex-col sm:flex-row gap-3 justify-between'>
										<div className='relative flex-1'>
											<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
											<Input
												placeholder='Search inbox...'
												className='pl-8'
											/>
										</div>
										<div className='flex gap-2'>
											<Select defaultValue='all'>
												<SelectTrigger className='w-full sm:w-[180px]'>
													<SelectValue placeholder='All requests' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='all'>
														All requests
													</SelectItem>
													<SelectItem value='edit'>
														Edit requests
													</SelectItem>
													<SelectItem value='support'>
														Support tickets
													</SelectItem>
													<SelectItem value='demo'>
														Demo requests
													</SelectItem>
												</SelectContent>
											</Select>
											<Button
												size='icon'
												variant='outline'
											>
												<Filter className='h-4 w-4' />
											</Button>
										</div>
									</div>

									{/* Unified Inbox Content */}
									<UnifiedInboxView
										editRequests={editRequests}
										supportTickets={supportTickets}
									/>
								</TabsContent>

								{/* User Management Tab */}
								<TabsContent
									value='users'
									className='space-y-4'
								>
									<div className='flex flex-col sm:flex-row gap-3 justify-between'>
										<div className='relative flex-1'>
											<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
											<Input
												placeholder='Search users...'
												className='pl-8'
											/>
										</div>
										<Select defaultValue='all'>
											<SelectTrigger className='w-full sm:w-[180px]'>
												<SelectValue placeholder='All users' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='all'>
													All users
												</SelectItem>
												<SelectItem value='active'>
													Active
												</SelectItem>
												<SelectItem value='pending'>
													Pending
												</SelectItem>
												<SelectItem value='inactive'>
													Inactive
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className='rounded-md border'>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Name</TableHead>
													<TableHead className='hidden md:table-cell'>
														Email
													</TableHead>
													<TableHead className='hidden md:table-cell'>
														Status
													</TableHead>
													<TableHead className='hidden lg:table-cell'>
														Signup Date
													</TableHead>
													<TableHead className='hidden lg:table-cell'>
														Plan
													</TableHead>
													<TableHead className='text-right'>
														Actions
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{users.map((user) => (
													<TableRow key={user.id}>
														<TableCell className='font-medium'>
															{user.name}
															{user.company && (
																<div className='text-xs text-muted-foreground'>
																	{
																		user.company
																	}
																</div>
															)}
														</TableCell>
														<TableCell className='hidden md:table-cell'>
															{user.email}
														</TableCell>
														<TableCell className='hidden md:table-cell'>
															<UserStatusBadge
																status={
																	user.status
																}
															/>
														</TableCell>
														<TableCell className='hidden lg:table-cell'>
															{formatDate(
																user.signupDate
															)}
														</TableCell>
														<TableCell className='hidden lg:table-cell'>
															{user.plan ||
																'None'}
														</TableCell>
														<TableCell className='text-right'>
															<Sheet>
																<SheetTrigger
																	asChild
																>
																	<Button
																		size='sm'
																		variant='ghost'
																		className='gap-1'
																		onClick={() =>
																			setSelectedUser(
																				user
																			)
																		}
																	>
																		<span className='sr-only md:not-sr-only md:inline-block'>
																			Manage
																		</span>
																		<ChevronRight className='h-4 w-4' />
																	</Button>
																</SheetTrigger>
																<SheetContent className='w-full sm:max-w-xl overflow-auto'>
																	{/* User Detail View */}
																	<UserDetailView
																		user={
																			user
																		}
																		sites={siteProjects.filter(
																			(
																				project
																			) =>
																				project.userId ===
																				user.id
																		)}
																		tickets={supportTickets.filter(
																			(
																				ticket
																			) =>
																				ticket.userId ===
																				user.id
																		)}
																		editRequests={editRequests.filter(
																			(
																				request
																			) =>
																				request.userId ===
																				user.id
																		)}
																		billingPlans={[]}
																	/>
																</SheetContent>
															</Sheet>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</TabsContent>

								{/* Billing Management Tab */}
								<TabsContent
									value='billing'
									className='space-y-4'
								>
									<div className='flex flex-col sm:flex-row gap-3 justify-between'>
										<div className='relative flex-1'>
											<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
											<Input
												placeholder='Search billing...'
												className='pl-8'
											/>
										</div>
										<Select defaultValue='all'>
											<SelectTrigger className='w-full sm:w-[180px]'>
												<SelectValue placeholder='All plans' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='all'>
													All plans
												</SelectItem>
												<SelectItem value='managed-basic'>
													Managed Basic
												</SelectItem>
												<SelectItem value='managed-pro'>
													Managed Pro
												</SelectItem>
												<SelectItem value='managed-premium'>
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
													$389.91
												</div>
												<p className='text-xs text-muted-foreground'>
													From 7 active subscriptions
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
												<div className='text-2xl font-bold'>
													$159.96
												</div>
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
																3
															</span>
														</div>
														<div className='text-sm'>
															Pro:{' '}
															<span className='font-bold'>
																2
															</span>
														</div>
														<div className='text-sm'>
															Premium:{' '}
															<span className='font-bold'>
																2
															</span>
														</div>
													</div>
													<div className='flex flex-col items-center gap-1'>
														<div className='h-4 w-24 rounded-full bg-slate-200 overflow-hidden flex'>
															<div
																className='h-full bg-blue-500'
																style={{
																	width: '43%',
																}}
															></div>
															<div
																className='h-full bg-purple-500'
																style={{
																	width: '29%',
																}}
															></div>
															<div
																className='h-full bg-green-500'
																style={{
																	width: '28%',
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
												{users
													.filter((user) => user.plan)
													.map((user) => {
														const plan = null;
														return (
															<TableRow
																key={user.id}
															>
																<TableCell>
																	<div className='font-medium'>
																		{
																			user.name
																		}
																	</div>
																	<div className='text-xs text-muted-foreground'>
																		{
																			user.email
																		}
																	</div>
																</TableCell>
																<TableCell>
																	{user.plan}
																</TableCell>
																<TableCell className='hidden md:table-cell'>
																	$
																	{plan?.price?.toFixed(
																		2
																	)}
																	/mo
																</TableCell>
																<TableCell className='hidden lg:table-cell'>
																	{user.nextBillingDate
																		? formatDate(
																				user.nextBillingDate
																		  )
																		: '-'}
																</TableCell>
																<TableCell className='hidden md:table-cell text-sm'>
																	{user.paymentMethod ||
																		'-'}
																</TableCell>
																<TableCell className='text-right'>
																	<DropdownMenu>
																		<DropdownMenuTrigger
																			asChild
																		>
																			<Button
																				variant='ghost'
																				size='sm'
																			>
																				<MoreButton />
																			</Button>
																		</DropdownMenuTrigger>
																		<DropdownMenuContent align='end'>
																			<DropdownMenuItem>
																				<CreditCard className='mr-2 h-4 w-4' />
																				Edit
																				Payment
																				Method
																			</DropdownMenuItem>
																			<DropdownMenuItem>
																				<Edit className='mr-2 h-4 w-4' />
																				Change
																				Plan
																			</DropdownMenuItem>
																			<DropdownMenuSeparator />
																			<DropdownMenuItem>
																				<PencilLine className='mr-2 h-4 w-4' />
																				Send
																				Invoice
																			</DropdownMenuItem>
																		</DropdownMenuContent>
																	</DropdownMenu>
																</TableCell>
															</TableRow>
														);
													})}
											</TableBody>
										</Table>
									</div>
								</TabsContent>
							</Tabs>

							{/* Overview Cards */}
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
								<Card>
									<CardHeader>
										<CardTitle className='flex items-center gap-2'>
											<Calendar className='h-5 w-5 text-primary' />
											Upcoming Projects
										</CardTitle>
										<CardDescription>
											Site projects due in the next 14
											days
										</CardDescription>
									</CardHeader>
									<CardContent className='p-0'>
										<div className='divide-y'>
											{siteProjects
												.sort(
													(a, b) =>
														new Date(
															a.estimatedCompletion
														).getTime() -
														new Date(
															b.estimatedCompletion
														).getTime()
												)
												.slice(0, 3)
												.map((project) => (
													<div
														key={project.id}
														className='flex items-center justify-between p-4'
													>
														<div>
															<p className='font-medium'>
																{
																	project.siteName
																}
															</p>
															<p className='text-sm text-muted-foreground'>
																{
																	project.clientName
																}{' '}
																•{' '}
																{project.stage}
															</p>
														</div>
														<div className='text-right'>
															<p className='text-sm font-medium'>
																{formatDate(
																	project.estimatedCompletion
																)}
															</p>
															<p className='text-xs text-muted-foreground'>
																{getDaysRemaining(
																	project.estimatedCompletion
																)}{' '}
																days left
															</p>
														</div>
													</div>
												))}
										</div>
									</CardContent>
									<CardFooter className='flex justify-center p-4'>
										<Button
											variant='outline'
											size='sm'
											asChild
										>
											<Link href='/admin/calendar'>
												<Calendar className='mr-2 h-4 w-4' />
												View Full Schedule
											</Link>
										</Button>
									</CardFooter>
								</Card>

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
											<ActivityItem
												icon={
													<FileEdit className='h-4 w-4' />
												}
												title='Edit request submitted'
												description='Linda Miller requested changes to Miller Design Studio'
												time='2 hours ago'
											/>
											<ActivityItem
												icon={
													<TicketCheck className='h-4 w-4' />
												}
												title='Support ticket closed'
												description='Resolved loading issue for Jones Fitness'
												time='5 hours ago'
											/>
											<ActivityItem
												icon={
													<User className='h-4 w-4' />
												}
												title='New user registered'
												description='David Johnson created an account'
												time='1 day ago'
											/>
											<ActivityItem
												icon={
													<CheckCircle className='h-4 w-4' />
												}
												title='Site launched'
												description='Wilson Photography site is now live'
												time='2 days ago'
											/>
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
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}

// Project Detail View Component - Used in the Project Sheet
function ProjectDetailView({ project }) {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div>
			<SheetHeader className='border-b pb-4 mb-4'>
				<div className='flex items-center justify-between'>
					<SheetTitle className='text-xl'>
						{project.siteName}
					</SheetTitle>
					<StageIndicator stage={project.stage} />
				</div>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2'>
					<div className='text-sm text-muted-foreground'>
						Client:{' '}
						<span className='font-medium text-foreground'>
							{project.clientName}
						</span>
					</div>
					<div className='text-sm flex items-center'>
						<Progress
							value={project.progress}
							className='h-2 w-20 mr-2'
						/>
						<span className='text-xs'>
							{project.progress}% Complete
						</span>
					</div>
				</div>
			</SheetHeader>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<TabsList className='w-full mb-4'>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='timeline'>Timeline</TabsTrigger>
					<TabsTrigger value='user'>User Info</TabsTrigger>
					<TabsTrigger value='actions'>Actions</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent
					value='overview'
					className='space-y-4'
				>
					<div className='grid grid-cols-2 gap-3'>
						<Card>
							<CardHeader className='p-3'>
								<CardTitle className='text-sm'>
									Domain
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 pt-0 font-mono text-xs break-all'>
								{project.domain}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='p-3'>
								<CardTitle className='text-sm'>
									Start Date
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 pt-0 text-sm'>
								{formatDate(project.startDate)}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='p-3'>
								<CardTitle className='text-sm'>
									Est. Completion
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 pt-0 text-sm'>
								{formatDate(project.estimatedCompletion)}
								<div className='text-xs text-muted-foreground'>
									{getDaysRemaining(
										project.estimatedCompletion
									)}{' '}
									days remaining
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='p-3'>
								<CardTitle className='text-sm'>
									Billing Plan
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 pt-0 text-sm'>
								{project.billingPlan}
							</CardContent>
						</Card>
					</div>

					{/* Quick Actions */}
					<div>
						<h3 className='text-sm font-medium mb-2'>
							Quick Actions
						</h3>
						<div className='grid grid-cols-2 gap-2'>
							<Button
								size='sm'
								variant='outline'
							>
								<Eye className='h-4 w-4 mr-2' />
								Preview Site
							</Button>
							<Button
								size='sm'
								variant='outline'
							>
								<MessageCircle className='h-4 w-4 mr-2' />
								Contact Client
							</Button>
							<Button
								size='sm'
								variant='outline'
							>
								<Edit className='h-4 w-4 mr-2' />
								Edit Stage
							</Button>
							<Button
								size='sm'
								variant='outline'
							>
								<ExternalLink className='h-4 w-4 mr-2' />
								Access WP Admin
							</Button>
						</div>
					</div>

					{/* Pending Actions */}
					{project.pendingActions &&
						project.pendingActions.length > 0 && (
							<div>
								<h3 className='text-sm font-medium mb-2 flex items-center'>
									<AlertCircle className='h-4 w-4 mr-2 text-amber-500' />
									Pending Actions (
									{project.pendingActions.length})
								</h3>
								<div className='bg-amber-50 rounded-md border border-amber-200 p-3'>
									<ul className='space-y-2'>
										{project.pendingActions.map(
											(action, index) => (
												<li
													key={index}
													className='flex justify-between items-center'
												>
													<div>
														<div className='text-sm font-medium'>
															{action.description}
														</div>
														<div className='text-xs text-muted-foreground'>
															{action.type ===
															'approval'
																? 'Waiting for client approval'
																: action.type ===
																  'clientUpload'
																? 'Waiting for client upload'
																: 'Action needed'}
														</div>
													</div>
													<div className='text-xs'>
														Due:{' '}
														{formatDate(
															action.dueDate
														)}
													</div>
												</li>
											)
										)}
									</ul>
								</div>
							</div>
						)}
				</TabsContent>

				{/* Timeline Tab */}
				<TabsContent
					value='timeline'
					className='space-y-4'
				>
					<div className='mb-4'>
						<div className='flex justify-between items-center mb-2'>
							<h3 className='text-sm font-medium'>
								Project Timeline
							</h3>
							<Button
								variant='ghost'
								size='sm'
							>
								<Edit className='h-3 w-3 mr-1' />
								Edit
							</Button>
						</div>
						<Card>
							<CardContent className='p-4'>
								<ol className='relative border-l border-primary/30'>
									{project.timeline.map((step, index) => (
										<li
											key={index}
											className='mb-6 ml-6'
										>
											<span
												className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
													step.completed
														? 'bg-primary text-primary-foreground'
														: step.current
														? 'bg-primary/20 border border-primary'
														: 'bg-muted'
												}`}
											>
												{step.completed ? (
													<CheckCircle2 className='w-3 h-3' />
												) : step.current ? (
													<Clock className='w-3 h-3 text-primary' />
												) : (
													<Circle className='w-3 h-3 text-muted-foreground' />
												)}
											</span>
											<h3
												className={`flex items-center mb-1 text-lg font-semibold ${
													step.completed
														? 'text-foreground'
														: step.current
														? 'text-primary'
														: 'text-muted-foreground'
												}`}
											>
												{step.stage
													.charAt(0)
													.toUpperCase() +
													step.stage.slice(1)}
												{step.current && (
													<span className='bg-primary text-primary-foreground text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3'>
														Current
													</span>
												)}
											</h3>
											{step.completed && step.date && (
												<time className='block mb-2 text-xs font-normal leading-none text-muted-foreground'>
													Completed on{' '}
													{formatDate(step.date)}
												</time>
											)}
											{step.current &&
												step.estimatedCompletion && (
													<time className='block mb-2 text-xs font-normal leading-none text-muted-foreground'>
														Target completion:{' '}
														{formatDate(
															step.estimatedCompletion
														)}
													</time>
												)}
											{step.notes && (
												<p className='mb-4 text-sm font-normal text-muted-foreground'>
													{step.notes}
												</p>
											)}
										</li>
									))}
								</ol>
							</CardContent>
						</Card>
					</div>

					<div className='mb-4'>
						<h3 className='text-sm font-medium mb-2'>
							Add Timeline Update
						</h3>
						<div className='space-y-2'>
							<Select defaultValue='update'>
								<SelectTrigger>
									<SelectValue placeholder='Select update type' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='update'>
										Stage Update
									</SelectItem>
									<SelectItem value='milestone'>
										Add Milestone
									</SelectItem>
									<SelectItem value='note'>
										Add Note
									</SelectItem>
									<SelectItem value='delay'>
										Report Delay
									</SelectItem>
								</SelectContent>
							</Select>
							<div className='grid grid-cols-2 gap-2'>
								<Button size='sm'>Add Update</Button>
								<Button
									size='sm'
									variant='outline'
								>
									Notify Client
								</Button>
							</div>
						</div>
					</div>
				</TabsContent>

				{/* User Info Tab */}
				<TabsContent
					value='user'
					className='space-y-4'
				>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='space-y-2 flex-1'>
							<h3 className='text-sm font-medium'>
								Contact Information
							</h3>
							<Card className='p-4'>
								<div className='space-y-3'>
									<div>
										<div className='text-xs text-muted-foreground'>
											Name
										</div>
										<div className='font-medium'>
											{project.clientName}
										</div>
									</div>
									<div>
										<div className='text-xs text-muted-foreground'>
											Email
										</div>
										<div className='font-medium'>
											{project.email}
										</div>
									</div>
									<div>
										<div className='text-xs text-muted-foreground'>
											Billing Plan
										</div>
										<div className='font-medium'>
											{project.billingPlan}
										</div>
									</div>
									<div className='pt-2 flex gap-2'>
										<Button
											size='sm'
											variant='outline'
										>
											<MessageCircle className='h-4 w-4 mr-2' />
											Message
										</Button>
										<Button
											size='sm'
											variant='outline'
										>
											<UserCog className='h-4 w-4 mr-2' />
											Account
										</Button>
									</div>
								</div>
							</Card>
						</div>

						<div className='space-y-2 flex-1'>
							<h3 className='text-sm font-medium'>
								Recent Activity
							</h3>
							<Card className='p-4'>
								<div className='space-y-3'>
									<div className='text-xs border-l-2 border-primary pl-2'>
										<div className='font-medium'>
											Site Requirements Submitted
										</div>
										<div className='text-muted-foreground'>
											2 days ago
										</div>
									</div>
									<div className='text-xs border-l-2 border-secondary pl-2'>
										<div className='font-medium'>
											Design Mockup Approved
										</div>
										<div className='text-muted-foreground'>
											Yesterday
										</div>
									</div>
									<div className='text-xs border-l-2 border-accent pl-2'>
										<div className='font-medium'>
											Support Ticket Created
										</div>
										<div className='text-muted-foreground'>
											5 hours ago
										</div>
									</div>
									<div className='pt-2'>
										<Button
											size='sm'
											variant='outline'
											className='w-full text-xs'
										>
											View Full History
										</Button>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</TabsContent>

				{/* Actions Tab */}
				<TabsContent
					value='actions'
					className='space-y-4'
				>
					<div className='space-y-2'>
						<h3 className='text-sm font-medium'>Project Actions</h3>
						<div className='grid grid-cols-2 gap-3'>
							<Card className='p-4 flex flex-col items-center text-center'>
								<div className='bg-blue-100 p-3 rounded-full mb-2'>
									<Edit className='h-5 w-5 text-blue-700' />
								</div>
								<h4 className='text-sm font-medium'>
									Update Stage
								</h4>
								<p className='text-xs text-muted-foreground mb-3'>
									Move project to next stage or update
									progress
								</p>
								<Button
									size='sm'
									className='mt-auto'
								>
									Update Status
								</Button>
							</Card>

							<Card className='p-4 flex flex-col items-center text-center'>
								<div className='bg-amber-100 p-3 rounded-full mb-2'>
									<Bell className='h-5 w-5 text-amber-700' />
								</div>
								<h4 className='text-sm font-medium'>
									Notify Client
								</h4>
								<p className='text-xs text-muted-foreground mb-3'>
									Send client a notification or request
								</p>
								<Button
									size='sm'
									variant='outline'
									className='mt-auto'
								>
									Send Message
								</Button>
							</Card>

							<Card className='p-4 flex flex-col items-center text-center'>
								<div className='bg-green-100 p-3 rounded-full mb-2'>
									<CheckCircle2 className='h-5 w-5 text-green-700' />
								</div>
								<h4 className='text-sm font-medium'>
									Mark Complete
								</h4>
								<p className='text-xs text-muted-foreground mb-3'>
									Mark project as complete and finalize
								</p>
								<Button
									size='sm'
									variant='outline'
									className='mt-auto'
								>
									Complete Project
								</Button>
							</Card>

							<Card className='p-4 flex flex-col items-center text-center'>
								<div className='bg-purple-100 p-3 rounded-full mb-2'>
									<CreditCard className='h-5 w-5 text-purple-700' />
								</div>
								<h4 className='text-sm font-medium'>
									Billing Actions
								</h4>
								<p className='text-xs text-muted-foreground mb-3'>
									Manage client billing and payments
								</p>
								<Button
									size='sm'
									variant='outline'
									className='mt-auto'
								>
									Manage Billing
								</Button>
							</Card>
						</div>
					</div>

					<div className='space-y-2'>
						<h3 className='text-sm font-medium'>
							Advanced Settings
						</h3>
						<Card className='p-4'>
							<div className='space-y-4'>
								<div className='grid grid-cols-2 gap-2'>
									<Button
										size='sm'
										variant='outline'
									>
										Transfer Ownership
									</Button>
									<Button
										size='sm'
										variant='outline'
									>
										Archive Project
									</Button>
								</div>
								<Button
									size='sm'
									variant='destructive'
									className='w-full'
								>
									Delete Project
								</Button>
							</div>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

// User Detail View Component - Used in the User Sheet
function UserDetailView({ user, sites, tickets, editRequests, billingPlans }) {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<>
			<SheetHeader className='border-b pb-4 mb-4'>
				<SheetTitle className='text-xl'>{user.name}</SheetTitle>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2'>
					<div className='text-sm text-muted-foreground'>
						{user.email} • {user.company}
					</div>
					<UserStatusBadge status={user.status} />
				</div>
			</SheetHeader>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<TabsList className='w-full mb-4'>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='sites'>Sites</TabsTrigger>
					<TabsTrigger value='billing'>Billing</TabsTrigger>
					<TabsTrigger value='support'>Support</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent
					value='overview'
					className='space-y-4'
				>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						<Card>
							<CardHeader className='p-3'>
								<CardTitle className='text-sm'>
									Contact Info
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 pt-0 space-y-2'>
								<div>
									<div className='text-xs text-muted-foreground'>
										Email
									</div>
									<div className='text-sm'>{user.email}</div>
								</div>
								{user.phone && (
									<div>
										<div className='text-xs text-muted-foreground'>
											Phone
										</div>
										<div className='text-sm'>
											{user.phone}
										</div>
									</div>
								)}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='p-3'>
								<CardTitle className='text-sm'>
									Account Details
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 pt-0 space-y-2'>
								<div>
									<div className='text-xs text-muted-foreground'>
										Signup Date
									</div>
									<div className='text-sm'>
										{formatDate(user.signupDate)}
									</div>
								</div>
								<div>
									<div className='text-xs text-muted-foreground'>
										Active Sites
									</div>
									<div className='text-sm'>
										{sites?.length || 0} site
										{sites?.length !== 1 ? 's' : ''}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Current Plan */}
						{user.plan && (
							<Card className='col-span-1 sm:col-span-2'>
								<CardHeader className='p-3 pb-0 flex flex-row items-center justify-between'>
									<CardTitle className='text-sm'>
										Current Plan
									</CardTitle>
									<Button
										variant='outline'
										size='sm'
										className='h-7 text-xs'
									>
										<Edit className='h-3 w-3 mr-1' />
										Change Plan
									</Button>
								</CardHeader>
								<CardContent className='p-3'>
									<div className='rounded-lg border p-3'>
										<div className='flex justify-between items-start mb-1'>
											<div className='font-medium'>
												{user.plan}
											</div>
											<div className='text-sm font-bold'>
												$
												{billingPlans
													.find(
														(p) =>
															p.name === user.plan
													)
													?.price?.toFixed(2)}
												/mo
											</div>
										</div>
										<div className='text-xs text-muted-foreground mb-2'>
											Next billing:{' '}
											{user.nextBillingDate
												? formatDate(
														user.nextBillingDate
												  )
												: 'N/A'}
										</div>
										<div className='text-xs'>
											{billingPlans
												.find(
													(p) => p.name === user.plan
												)
												?.features?.slice(0, 3)
												.map((feature, i) => (
													<div
														key={i}
														className='flex items-center'
													>
														<CheckCircle2 className='h-3 w-3 mr-1 text-green-500' />
														{feature}
													</div>
												))}
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Quick Actions */}
						<Card className='col-span-1 sm:col-span-2'>
							<CardHeader className='p-3'>
								<CardTitle className='text-sm'>
									Quick Actions
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 pt-0'>
								<div className='grid grid-cols-2 gap-2'>
									<Button
										size='sm'
										variant='outline'
									>
										<MessageCircle className='h-4 w-4 mr-2' />
										Message User
									</Button>
									<Button
										size='sm'
										variant='outline'
									>
										<UserCog className='h-4 w-4 mr-2' />
										Edit Account
									</Button>
									<Button
										size='sm'
										variant='outline'
									>
										<CreditCard className='h-4 w-4 mr-2' />
										View Invoices
									</Button>
									<Button
										size='sm'
										variant='destructive'
										className='bg-red-500'
									>
										Delete Account
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Sites Tab */}
				<TabsContent
					value='sites'
					className='space-y-4'
				>
					<div className='flex justify-between items-center'>
						<h3 className='text-sm font-medium'>User Sites</h3>
						<Button
							size='sm'
							variant='outline'
						>
							<FileEdit className='h-4 w-4 mr-2' />
							Add New Site
						</Button>
					</div>

					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Site Name</TableHead>
									<TableHead className='hidden md:table-cell'>
										Domain
									</TableHead>
									<TableHead>Stage</TableHead>
									<TableHead className='hidden md:table-cell'>
										Progress
									</TableHead>
									<TableHead className='hidden lg:table-cell'>
										Est. Completion
									</TableHead>
									<TableHead className='text-right'>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sites && sites.length > 0 ? (
									sites.map((site) => (
										<TableRow key={site.id}>
											<TableCell className='font-medium'>
												{site.siteName}
											</TableCell>
											<TableCell className='hidden md:table-cell text-xs text-muted-foreground'>
												{site.domain}
											</TableCell>
											<TableCell>
												<Select
													defaultValue={site.stage}
												>
													<SelectTrigger className='h-8 w-[110px]'>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='requirements'>
															Requirements
														</SelectItem>
														<SelectItem value='design'>
															Design
														</SelectItem>
														<SelectItem value='development'>
															Development
														</SelectItem>
														<SelectItem value='content'>
															Content
														</SelectItem>
														<SelectItem value='testing'>
															Testing
														</SelectItem>
														<SelectItem value='launch'>
															Launch
														</SelectItem>
													</SelectContent>
												</Select>
											</TableCell>
											<TableCell className='hidden md:table-cell'>
												<div className='flex items-center gap-2'>
													<Progress
														value={site.progress}
														className='h-2 w-20'
													/>
													<Input
														type='number'
														min='0'
														max='100'
														defaultValue={
															site.progress
														}
														className='h-7 w-16'
													/>
												</div>
											</TableCell>
											<TableCell className='hidden lg:table-cell'>
												<Input
													type='date'
													defaultValue={
														new Date(
															site.estimatedCompletion
														)
															.toISOString()
															.split('T')[0]
													}
													className='h-7'
												/>
											</TableCell>
											<TableCell className='text-right'>
												<div className='flex justify-end gap-2'>
													<Button
														size='sm'
														variant='outline'
														className='h-8 px-2'
													>
														<Eye className='h-3.5 w-3.5' />
													</Button>
													<Button
														size='sm'
														className='h-8 px-2'
													>
														Save
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={6}
											className='h-24 text-center'
										>
											No sites found for this user
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</TabsContent>

				{/* Billing Tab */}
				<TabsContent
					value='billing'
					className='space-y-4'
				>
					{user.plan ? (
						<>
							<div className='flex justify-between items-center'>
								<h3 className='text-sm font-medium'>
									Current Plan
								</h3>
								<div className='flex gap-2'>
									<Button
										size='sm'
										variant='outline'
									>
										<Edit className='h-4 w-4 mr-2' />
										Change Plan
									</Button>
									<Button
										size='sm'
										variant='outline'
									>
										<CreditCard className='h-4 w-4 mr-2' />
										Update Payment
									</Button>
								</div>
							</div>

							<Card>
								<CardContent className='p-4 space-y-4'>
									<div className='flex justify-between items-start'>
										<div>
											<h4 className='font-medium text-lg'>
												{user.plan}
											</h4>
											<p className='text-sm text-muted-foreground'>
												$
												{billingPlans
													.find(
														(p) =>
															p.name === user.plan
													)
													?.price?.toFixed(2)}
												/month
											</p>
										</div>
										<Badge
											variant={
												user.status === 'active'
													? 'default'
													: 'outline'
											}
										>
											{user.status === 'active'
												? 'Active'
												: user.status}
										</Badge>
									</div>

									<div className='text-sm'>
										<div className='grid grid-cols-2 gap-2'>
											<div>
												<div className='text-xs text-muted-foreground'>
													Next Billing Date
												</div>
												<div>
													{user.nextBillingDate ? (
														<div className='flex items-center gap-2'>
															<span>
																{formatDate(
																	user.nextBillingDate
																)}
															</span>
															<Button
																size='sm'
																variant='ghost'
																className='h-6 px-2'
															>
																<Edit className='h-3 w-3' />
															</Button>
														</div>
													) : (
														'Not set'
													)}
												</div>
											</div>
											<div>
												<div className='text-xs text-muted-foreground'>
													Payment Method
												</div>
												<div>
													{user.paymentMethod ||
														'None'}
												</div>
											</div>
										</div>
									</div>

									<div>
										<div className='text-xs text-muted-foreground mb-1'>
											Plan Features
										</div>
										<div className='text-sm grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1'>
											{billingPlans
												.find(
													(p) => p.name === user.plan
												)
												?.features?.map(
													(feature, i) => (
														<div
															key={i}
															className='flex items-center'
														>
															<CheckCircle2 className='h-3 w-3 mr-1 text-green-500' />
															{feature}
														</div>
													)
												)}
										</div>
									</div>
								</CardContent>
							</Card>

							<div>
								<h3 className='text-sm font-medium mb-2'>
									Billing Adjustments
								</h3>
								<Card className='p-4'>
									<div className='space-y-4'>
										<div className='grid grid-cols-2 gap-3'>
											<div>
												<div className='text-xs text-muted-foreground mb-1'>
													Adjustment Type
												</div>
												<Select defaultValue='none'>
													<SelectTrigger>
														<SelectValue placeholder='Select type' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='none'>
															Select type...
														</SelectItem>
														<SelectItem value='credit'>
															Add Credit
														</SelectItem>
														<SelectItem value='discount'>
															Add Discount
														</SelectItem>
														<SelectItem value='refund'>
															Issue Refund
														</SelectItem>
														<SelectItem value='charge'>
															Additional Charge
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div>
												<div className='text-xs text-muted-foreground mb-1'>
													Amount ($)
												</div>
												<Input
													type='number'
													min='0'
													step='0.01'
													placeholder='0.00'
												/>
											</div>
										</div>
										<div>
											<div className='text-xs text-muted-foreground mb-1'>
												Reason
											</div>
											<Input placeholder='Reason for adjustment' />
										</div>
										<Button>Apply Adjustment</Button>
									</div>
								</Card>
							</div>
						</>
					) : (
						<div className='text-center p-8'>
							<div className='mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3'>
								<CreditCard className='h-6 w-6 text-muted-foreground' />
							</div>
							<h3 className='font-medium mb-1'>
								No Billing Plan
							</h3>
							<p className='text-sm text-muted-foreground mb-4'>
								This user doesn't have an active billing plan
								yet.
							</p>
							<Button>
								<PlusCircle className='h-4 w-4 mr-2' />
								Add Billing Plan
							</Button>
						</div>
					)}

					<div className='mt-6'>
						<h3 className='text-sm font-medium mb-2'>
							Billing History
						</h3>
						<div className='rounded-md border'>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Date</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className='text-right'>
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{user.billingHistory &&
									user.billingHistory.length > 0 ? (
										user.billingHistory.map((entry) => (
											<TableRow key={entry.id}>
												<TableCell>
													{formatDate(entry.date)}
												</TableCell>
												<TableCell>
													{entry.type}
												</TableCell>
												<TableCell>
													${entry.amount.toFixed(2)}
												</TableCell>
												<TableCell>
													<Badge
														variant='outline'
														className={
															entry.status ===
															'paid'
																? 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
																: 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
														}
													>
														{entry.status}
													</Badge>
												</TableCell>
												<TableCell className='text-right'>
													<DropdownMenu>
														<DropdownMenuTrigger
															asChild
														>
															<Button
																variant='ghost'
																size='sm'
															>
																<MoreButton />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align='end'>
															<DropdownMenuItem>
																<Eye className='mr-2 h-4 w-4' />
																View Invoice
															</DropdownMenuItem>
															<DropdownMenuItem>
																<PencilLine className='mr-2 h-4 w-4' />
																Resend Invoice
															</DropdownMenuItem>
															{entry.status !==
																'paid' && (
																<DropdownMenuItem>
																	<CheckCircle2 className='mr-2 h-4 w-4' />
																	Mark as Paid
																</DropdownMenuItem>
															)}
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={5}
												className='h-24 text-center'
											>
												No billing history found
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					</div>
				</TabsContent>

				{/* Support Tab */}
				<TabsContent
					value='support'
					className='space-y-4'
				>
					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Issue</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Priority</TableHead>
									<TableHead className='hidden md:table-cell'>
										Date Opened
									</TableHead>
									<TableHead className='text-right'>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tickets.map((ticket) => (
									<TableRow key={ticket.id}>
										<TableCell className='font-medium'>
											{ticket.issue}
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
										<TableCell className='hidden md:table-cell'>
											{formatDate(ticket.dateOpened)}
										</TableCell>
										<TableCell className='text-right'>
											<Button
												size='sm'
												variant='ghost'
											>
												<ChevronRight className='h-4 w-4' />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</TabsContent>
			</Tabs>
		</>
	);
}

// Helper components
function DashboardCard({
	title,
	value,
	icon,
	description,
	trend,
	trendUp,
	color,
}) {
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

function StageIndicator({ stage }) {
	const stageColors = {
		requirements: {
			bg: 'bg-blue-100',
			text: 'text-blue-800',
			label: 'Requirements',
		},
		design: {
			bg: 'bg-purple-100',
			text: 'text-purple-800',
			label: 'Design',
		},
		development: {
			bg: 'bg-amber-100',
			text: 'text-amber-800',
			label: 'Development',
		},
		testing: {
			bg: 'bg-green-100',
			text: 'text-green-800',
			label: 'Testing',
		},
		launch: { bg: 'bg-teal-100', text: 'text-teal-800', label: 'Launch' },
	};

	const { bg, text, label } = stageColors[stage] || {
		bg: 'bg-gray-100',
		text: 'text-gray-800',
		label: stage,
	};

	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
		>
			{label}
		</span>
	);
}

function RequestStatusBadge({ status }) {
	if (status === 'pending') {
		return (
			<Badge
				variant='outline'
				className='bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
			>
				Pending
			</Badge>
		);
	} else if (status === 'in-progress') {
		return (
			<Badge
				variant='outline'
				className='bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200'
			>
				In Progress
			</Badge>
		);
	} else {
		return (
			<Badge
				variant='outline'
				className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
			>
				Completed
			</Badge>
		);
	}
}

function TicketStatusBadge({ status }) {
	if (status === 'open') {
		return (
			<Badge
				variant='outline'
				className='bg-red-100 text-red-800 hover:bg-red-100 border-red-200'
			>
				Open
			</Badge>
		);
	} else if (status === 'in-progress') {
		return (
			<Badge
				variant='outline'
				className='bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200'
			>
				In Progress
			</Badge>
		);
	} else {
		return (
			<Badge
				variant='outline'
				className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
			>
				Closed
			</Badge>
		);
	}
}

function TicketPriorityBadge({ priority }) {
	if (priority === 'high') {
		return (
			<Badge
				variant='outline'
				className='bg-red-100 text-red-800 hover:bg-red-100 border-red-200'
			>
				High
			</Badge>
		);
	} else if (priority === 'medium') {
		return (
			<Badge
				variant='outline'
				className='bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
			>
				Medium
			</Badge>
		);
	} else {
		return (
			<Badge
				variant='outline'
				className='bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200'
			>
				Low
			</Badge>
		);
	}
}

function UserStatusBadge({ status }) {
	if (status === 'active') {
		return (
			<Badge
				variant='outline'
				className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
			>
				Active
			</Badge>
		);
	} else if (status === 'pending') {
		return (
			<Badge
				variant='outline'
				className='bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
			>
				Pending
			</Badge>
		);
	} else {
		return (
			<Badge
				variant='outline'
				className='bg-red-100 text-red-800 hover:bg-red-100 border-red-200'
			>
				Inactive
			</Badge>
		);
	}
}

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

// Helper functions
function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

function getDaysRemaining(dateString) {
	const today = new Date();
	const targetDate = new Date(dateString);
	const diffTime = targetDate - today;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays > 0 ? diffDays : 0;
}

// Unified Inbox View - For managing all submissions, tickets, and requests
function UnifiedInboxView({ editRequests, supportTickets }) {
	const [viewMode, setViewMode] = useState('list');
	const [selectedItem, setSelectedItem] = useState(null);

	// Combine all inbox items and sort by date (newest first)
	const allItems = [
		...editRequests.map((req) => ({ ...req, type: 'edit' })),
		...supportTickets.map((ticket) => ({ ...ticket, type: 'support' })),
	].sort((a, b) => {
		const dateA = new Date(a.requestDate || a.dateOpened);
		const dateB = new Date(b.requestDate || b.dateOpened);
		return dateB - dateA;
	});

	return (
		<div>
			{viewMode === 'list' ? (
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Type</TableHead>
								<TableHead>Client</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className='hidden md:table-cell'>
									Status
								</TableHead>
								<TableHead className='hidden md:table-cell'>
									Date
								</TableHead>
								<TableHead className='hidden lg:table-cell'>
									Priority
								</TableHead>
								<TableHead className='text-right'>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{allItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell>
										{item.type === 'edit' ? (
											<Badge
												variant='outline'
												className='bg-purple-100 text-purple-800 border-purple-200'
											>
												Edit Request
											</Badge>
										) : (
											<Badge
												variant='outline'
												className='bg-blue-100 text-blue-800 border-blue-200'
											>
												Support
											</Badge>
										)}
									</TableCell>
									<TableCell className='font-medium'>
										{item.clientName}
										<div className='text-xs text-muted-foreground truncate max-w-[150px]'>
											{item.siteName}
										</div>
									</TableCell>
									<TableCell>
										<div className='font-medium truncate max-w-[200px]'>
											{item.description || item.issue}
										</div>
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										{item.type === 'edit' ? (
											<RequestStatusBadge
												status={item.status}
											/>
										) : (
											<TicketStatusBadge
												status={item.status}
											/>
										)}
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										{formatDate(
											item.requestDate || item.dateOpened
										)}
									</TableCell>
									<TableCell className='hidden lg:table-cell'>
										{item.priority && (
											<TicketPriorityBadge
												priority={item.priority}
											/>
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
														setSelectedItem(item)
													}
												>
													<span className='sr-only md:not-sr-only md:inline-block'>
														View
													</span>
													<ChevronRight className='h-4 w-4' />
												</Button>
											</SheetTrigger>
											<SheetContent className='w-full sm:max-w-xl overflow-auto'>
												{item.type === 'edit' ? (
													<EditRequestDetailView
														request={item}
													/>
												) : (
													<SupportTicketDetailView
														ticket={item}
													/>
												)}
											</SheetContent>
										</Sheet>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{selectedItem && (
						<div className='col-span-2'>
							{selectedItem.type === 'edit' ? (
								<EditRequestDetailView
									request={selectedItem}
									onBack={() => setSelectedItem(null)}
								/>
							) : (
								<SupportTicketDetailView
									ticket={selectedItem}
									onBack={() => setSelectedItem(null)}
								/>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

// Edit Request Detail View Component
function EditRequestDetailView({ request, onBack }) {
	const [status, setStatus] = useState(request.status);

	return (
		<div>
			<SheetHeader className='border-b pb-4 mb-4'>
				<div className='flex items-center justify-between'>
					<SheetTitle className='text-xl'>Edit Request</SheetTitle>
					<RequestStatusBadge status={status} />
				</div>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2'>
					<div className='text-sm text-muted-foreground'>
						Site:{' '}
						<span className='font-medium text-foreground'>
							{request.siteName}
						</span>
					</div>
					<div className='text-sm'>
						Requested: {formatDate(request.requestDate)}
					</div>
				</div>
			</SheetHeader>

			<div className='space-y-6'>
				{/* Request Details */}
				<div>
					<h3 className='text-sm font-medium mb-2'>
						Request Details
					</h3>
					<Card>
						<CardContent className='p-4 space-y-3'>
							<div>
								<div className='text-xs text-muted-foreground'>
									Description
								</div>
								<div className='font-medium'>
									{request.description}
								</div>
							</div>
							<div>
								<div className='text-xs text-muted-foreground'>
									Details
								</div>
								<div className='text-sm'>{request.details}</div>
							</div>
							<div>
								<div className='text-xs text-muted-foreground'>
									Priority
								</div>
								<div className='mt-1'>
									<TicketPriorityBadge
										priority={request.priority}
									/>
								</div>
							</div>
							<div>
								<div className='text-xs text-muted-foreground'>
									Deadline
								</div>
								<div className='text-sm'>
									{formatDate(request.deadline)}
								</div>
								<div className='text-xs text-muted-foreground'>
									{getDaysRemaining(request.deadline)} days
									remaining
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Attachments */}
				{request.attachments && request.attachments.length > 0 && (
					<div>
						<h3 className='text-sm font-medium mb-2'>
							Attachments
						</h3>
						<div className='space-y-2'>
							{request.attachments.map((attachment, index) => (
								<Card
									key={index}
									className='p-3 flex items-center justify-between'
								>
									<div className='flex items-center'>
										<div className='bg-muted p-2 rounded mr-3'>
											<FileEdit className='h-4 w-4' />
										</div>
										<div>
											<div className='text-sm font-medium'>
												{attachment.name}
											</div>
											<div className='text-xs text-muted-foreground'>
												{attachment.size}
											</div>
										</div>
									</div>
									<Button
										variant='ghost'
										size='sm'
									>
										<Eye className='h-4 w-4' />
									</Button>
								</Card>
							))}
						</div>
					</div>
				)}

				{/* Action Section */}
				<div>
					<h3 className='text-sm font-medium mb-2'>Update Status</h3>
					<div className='flex gap-3 mb-4'>
						<Select
							value={status}
							onValueChange={setStatus}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='pending'>Pending</SelectItem>
								<SelectItem value='in-progress'>
									In Progress
								</SelectItem>
								<SelectItem value='completed'>
									Completed
								</SelectItem>
							</SelectContent>
						</Select>
						<Button>Update Status</Button>
					</div>

					<div className='grid grid-cols-2 gap-2'>
						<Button variant='outline'>
							<MessageCircle className='h-4 w-4 mr-2' />
							Contact Client
						</Button>
						<Button variant='outline'>
							<User className='h-4 w-4 mr-2' />
							Assign Team Member
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Support Ticket Detail View Component
function SupportTicketDetailView({ ticket, onBack }) {
	const [status, setStatus] = useState(ticket.status);

	return (
		<>
			<SheetHeader className='border-b pb-4 mb-4'>
				<div className='flex items-center justify-between'>
					<SheetTitle className='text-xl'>Support Ticket</SheetTitle>
					<TicketStatusBadge status={status} />
				</div>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2'>
					<div className='text-sm text-muted-foreground'>
						Site:{' '}
						<span className='font-medium text-foreground'>
							{ticket.siteName}
						</span>
					</div>
					<div className='text-sm'>
						Opened: {formatDate(ticket.dateOpened)}
					</div>
				</div>
			</SheetHeader>

			<div className='space-y-6'>
				{/* Ticket Details */}
				<div>
					<h3 className='text-sm font-medium mb-2'>Issue Details</h3>
					<Card>
						<CardContent className='p-4 space-y-3'>
							<div>
								<div className='text-xs text-muted-foreground'>
									Issue
								</div>
								<div className='font-medium'>
									{ticket.issue}
								</div>
							</div>
							<div>
								<div className='text-xs text-muted-foreground'>
									Description
								</div>
								<div className='text-sm'>
									{ticket.description}
								</div>
							</div>
							{ticket.steps && (
								<div>
									<div className='text-xs text-muted-foreground'>
										Steps to Reproduce
									</div>
									<div className='text-sm'>
										{ticket.steps}
									</div>
								</div>
							)}
							<div className='flex gap-4'>
								<div>
									<div className='text-xs text-muted-foreground'>
										Priority
									</div>
									<div className='mt-1'>
										<TicketPriorityBadge
											priority={ticket.priority}
										/>
									</div>
								</div>
								{ticket.browser && (
									<div>
										<div className='text-xs text-muted-foreground'>
											Browser
										</div>
										<div className='text-sm'>
											{ticket.browser}
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Attachments */}
				{ticket.attachments && ticket.attachments.length > 0 && (
					<div>
						<h3 className='text-sm font-medium mb-2'>
							Attachments
						</h3>
						<div className='space-y-2'>
							{ticket.attachments.map((attachment, index) => (
								<Card
									key={index}
									className='p-3 flex items-center justify-between'
								>
									<div className='flex items-center'>
										<div className='bg-muted p-2 rounded mr-3'>
											<FileEdit className='h-4 w-4' />
										</div>
										<div>
											<div className='text-sm font-medium'>
												{attachment.name}
											</div>
											<div className='text-xs text-muted-foreground'>
												{attachment.size}
											</div>
										</div>
									</div>
									<Button
										variant='ghost'
										size='sm'
									>
										<Eye className='h-4 w-4' />
									</Button>
								</Card>
							))}
						</div>
					</div>
				)}

				{/* Update Section */}
				{ticket.lastUpdated && (
					<div>
						<h3 className='text-sm font-medium mb-2'>
							Latest Update
						</h3>
						<Card className='p-4'>
							<div className='text-xs text-muted-foreground'>
								{formatDate(ticket.lastUpdated)}
							</div>
							<div className='text-sm'>
								{ticket.lastUpdateNote}
							</div>
							{ticket.assignedTo && (
								<div className='text-xs text-muted-foreground mt-2'>
									Assigned to: {ticket.assignedTo}
								</div>
							)}
						</Card>
					</div>
				)}

				{/* Resolution Section */}
				{ticket.resolution && (
					<div>
						<h3 className='text-sm font-medium mb-2'>Resolution</h3>
						<Card className='p-4'>
							<div className='text-sm'>{ticket.resolution}</div>
							{ticket.closedDate && (
								<div className='text-xs text-muted-foreground mt-2'>
									Closed on: {formatDate(ticket.closedDate)}{' '}
									by {ticket.closedBy}
								</div>
							)}
						</Card>
					</div>
				)}

				{/* Action Section */}
				{ticket.status !== 'closed' && (
					<div>
						<h3 className='text-sm font-medium mb-2'>
							Update Status
						</h3>
						<div className='flex gap-3 mb-4'>
							<Select
								value={status}
								onValueChange={setStatus}
							>
								<SelectTrigger>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='open'>Open</SelectItem>
									<SelectItem value='in-progress'>
										In Progress
									</SelectItem>
									<SelectItem value='closed'>
										Closed
									</SelectItem>
								</SelectContent>
							</Select>
							<Button>Update Status</Button>
						</div>

						<div className='grid grid-cols-2 gap-2'>
							<Button variant='outline'>
								<MessageCircle className='h-4 w-4 mr-2' />
								Reply to Client
							</Button>
							<Button variant='outline'>
								<User className='h-4 w-4 mr-2' />
								Assign Support Agent
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
