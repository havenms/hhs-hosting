'use client';

import { useState } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
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
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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
} from '@/components/ui/dropdown-menu';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
	ChevronRight,
	Eye,
	Edit,
	PencilLine,
	CreditCard,
	CheckCircle2,
	MoreHorizontal,
	PlusCircle,
} from 'lucide-react';
import { formatDate } from '../../shared/utils';
import {
	UserStatusBadge,
	TicketStatusBadge,
	TicketPriorityBadge,
} from '../../shared/StatusBadges';

interface User {
	name: string;
	email: string;
	company?: string;
	status: string;
	phone?: string;
	plan?: string;
	nextBillingDate?: string | Date;
	signupDate: string | Date;
	paymentMethod?: string;
	billingHistory?: Array<{
		id: string | number;
		date: string | Date;
		type: string;
		amount: number;
		status: string;
	}>;
}

interface Site {
	id: string | number;
	siteName: string;
	domain: string;
	stage: string;
	progress: number;
	estimatedCompletion: string | Date;
}

interface Ticket {
	id: string | number;
	issue: string;
	status: string;
	priority: string;
	dateOpened: string | Date;
}

interface EditRequest {
	id: string | number;
	// Add other properties as needed
}

interface BillingPlan {
	name: string;
	price: number;
	features: string[];
}

interface UserDetailViewProps {
	user: User;
	sites: Site[];
	tickets: Ticket[];
	editRequests: EditRequest[];
	billingPlans: BillingPlan[];
	onClose?: () => void;
}

export function UserDetailView({
	user,
	sites,
	tickets,
	editRequests,
	billingPlans,
}: UserDetailViewProps) {
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
					<TabsTrigger value='support'>Support</TabsTrigger>
					<TabsTrigger value='billing'>Billing</TabsTrigger>
				</TabsList>

				{/* User Overview Tab */}
				<TabsContent
					value='overview'
					className='space-y-4'
				>
					<div className='grid gap-4 sm:grid-cols-2'>
						<Card>
							<CardHeader className='pb-2'>
								<CardTitle className='text-sm'>
									Contact Information
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2 text-sm'>
								<div className='grid grid-cols-[100px_1fr] gap-1'>
									<div className='text-muted-foreground'>
										Email
									</div>
									<div>{user.email}</div>

									<div className='text-muted-foreground'>
										Phone
									</div>
									<div>{user.phone || 'Not provided'}</div>

									<div className='text-muted-foreground'>
										Company
									</div>
									<div>{user.company || 'Not provided'}</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='pb-2'>
								<CardTitle className='text-sm'>
									Subscription
								</CardTitle>
							</CardHeader>
							<CardContent className='pt-0'>
								<div className='flex flex-col gap-2 text-sm'>
									<div className='flex justify-between'>
										<div className='font-medium'>
											{user.plan || 'No active plan'}
										</div>
										<div>
											$
											{billingPlans
												.find(
													(p) => p.name === user.plan
												)
												?.price?.toFixed(2)}
											/mo
										</div>
									</div>
									<div className='text-xs text-muted-foreground mb-2'>
										Next billing:{' '}
										{user.nextBillingDate
											? formatDate(user.nextBillingDate)
											: 'N/A'}
									</div>
									<div className='text-xs'>
										{billingPlans
											.find((p) => p.name === user.plan)
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
							<CardFooter>
								<Button
									size='sm'
									variant='outline'
									className='w-full'
								>
									<CreditCard className='h-4 w-4 mr-2' />
									Manage Subscription
								</Button>
							</CardFooter>
						</Card>

						<Card className='sm:col-span-2'>
							<CardHeader className='pb-2'>
								<CardTitle className='text-sm'>
									Account Summary
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
									<div className='bg-muted/50 p-3 rounded-lg'>
										<div className='text-xs text-muted-foreground'>
											Sites
										</div>
										<div className='text-xl font-semibold'>
											{sites.length}
										</div>
									</div>

									<div className='bg-muted/50 p-3 rounded-lg'>
										<div className='text-xs text-muted-foreground'>
											Tickets
										</div>
										<div className='text-xl font-semibold'>
											{tickets.length}
										</div>
									</div>

									<div className='bg-muted/50 p-3 rounded-lg'>
										<div className='text-xs text-muted-foreground'>
											Edit Requests
										</div>
										<div className='text-xl font-semibold'>
											{editRequests.length}
										</div>
									</div>

									<div className='bg-muted/50 p-3 rounded-lg'>
										<div className='text-xs text-muted-foreground'>
											Signup Date
										</div>
										<div className='text-sm font-semibold'>
											{formatDate(user.signupDate)}
										</div>
									</div>
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
					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Site Name</TableHead>
									<TableHead className='hidden md:table-cell'>
										Domain
									</TableHead>
									<TableHead className='hidden md:table-cell'>
										Stage
									</TableHead>
									<TableHead>Progress</TableHead>
									<TableHead className='hidden lg:table-cell'>
										Est. Completion
									</TableHead>
									<TableHead className='text-right'>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sites.length > 0 ? (
									sites.map((site) => (
										<TableRow key={site.id}>
											<TableCell className='font-medium'>
												{site.siteName}
											</TableCell>
											<TableCell className='hidden md:table-cell'>
												{site.domain}
											</TableCell>
											<TableCell className='hidden md:table-cell'>
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
											<TableCell>
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
														variant='outline'
														className='h-8 px-2'
													>
														<Edit className='h-3.5 w-3.5' />
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
											No sites found
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
							<Card>
								<CardHeader>
									<CardTitle className='text-lg'>
										Billing Information
									</CardTitle>
									<CardDescription>
										Manage billing information and view
										transaction history
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='grid sm:grid-cols-2 gap-4'>
										<div>
											<h3 className='text-sm font-medium mb-2'>
												Current Plan
											</h3>
											<Card>
												<CardContent className='p-4'>
													<div className='flex flex-col gap-3'>
														<div>
															<div className='font-medium text-lg'>
																{user.plan}
															</div>
															<div className='text-sm text-muted-foreground'>
																$
																{billingPlans
																	.find(
																		(p) =>
																			p.name ===
																			user.plan
																	)
																	?.price?.toFixed(
																		2
																	)}
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
																	(p) =>
																		p.name ===
																		user.plan
																)
																?.features?.map(
																	(
																		feature,
																		i
																	) => (
																		<div
																			key={
																				i
																			}
																			className='flex items-center'
																		>
																			<CheckCircle2 className='h-3 w-3 mr-1 text-green-500' />
																			{
																				feature
																			}
																		</div>
																	)
																)}
														</div>
													</div>
												</CardContent>
											</Card>
										</div>

										<div>
											<h3 className='text-sm font-medium mb-2'>
												Payment Information
											</h3>
											<Card>
												<CardContent className='p-4'>
													<div className='space-y-3 text-sm'>
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
												</CardContent>
											</Card>
										</div>
									</div>

									<div>
										<h3 className='text-sm font-medium mb-2'>
											Billing History
										</h3>
										<div className='rounded-md border'>
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead>
															Date
														</TableHead>
														<TableHead>
															Type
														</TableHead>
														<TableHead>
															Amount
														</TableHead>
														<TableHead>
															Status
														</TableHead>
														<TableHead className='text-right'>
															Actions
														</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{user.billingHistory &&
													user.billingHistory.length >
														0 ? (
														user.billingHistory.map(
															(entry) => (
																<TableRow
																	key={
																		entry.id
																	}
																>
																	<TableCell>
																		{formatDate(
																			entry.date
																		)}
																	</TableCell>
																	<TableCell>
																		{
																			entry.type
																		}
																	</TableCell>
																	<TableCell>
																		$
																		{entry.amount.toFixed(
																			2
																		)}
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
																			{
																				entry.status
																			}
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
																					<MoreHorizontal className='h-4 w-4' />
																				</Button>
																			</DropdownMenuTrigger>
																			<DropdownMenuContent align='end'>
																				<DropdownMenuItem>
																					<Eye className='mr-2 h-4 w-4' />
																					View
																					Invoice
																				</DropdownMenuItem>
																				<DropdownMenuItem>
																					<PencilLine className='mr-2 h-4 w-4' />
																					Resend
																					Invoice
																				</DropdownMenuItem>
																				{entry.status !==
																					'paid' && (
																					<DropdownMenuItem>
																						<CheckCircle2 className='mr-2 h-4 w-4' />
																						Mark
																						as
																						Paid
																					</DropdownMenuItem>
																				)}
																			</DropdownMenuContent>
																		</DropdownMenu>
																	</TableCell>
																</TableRow>
															)
														)
													) : (
														<TableRow>
															<TableCell
																colSpan={5}
																className='h-24 text-center'
															>
																No billing
																history found
															</TableCell>
														</TableRow>
													)}
												</TableBody>
											</Table>
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
							<h3 className='text-lg font-medium mb-2'>
								No Billing Plan
							</h3>
							<p className='text-muted-foreground mb-4'>
								This user doesn&apos;t have an active billing plan.
							</p>
							<Button>
								<PlusCircle className='h-4 w-4 mr-2' />
								Add Billing Plan
							</Button>
						</div>
					)}
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
