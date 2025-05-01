'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	CreditCard,
	Download,
	FileText,
	ChevronRight,
	Shield,
	CheckCircle2,
	Wallet,
	Receipt,
} from 'lucide-react';
import { BillingDebug } from '../components/billing-debug';


export default function BillingPage() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Mock data - would be fetched from API in production
	const subscription = {
		plan: 'Managed Basic',
		price: 39.99,
		nextBillingDate: new Date(
			Date.now() + 15 * 24 * 60 * 60 * 1000
		).toISOString(),
		status: 'active',
		features: [
			'WordPress Hosting',
			'SSL Certificate',
			'Daily Backups',
			'Core Updates',
			'Basic Support',
		],
	};

	const paymentMethod = {
		type: 'card',
		last4: '4242',
		expiry: '06/25',
		brand: 'Visa',
	};

	const billingHistory = [
		{
			id: 'inv_001',
			date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
			amount: 39.99,
			status: 'paid',
			type: 'Subscription Renewal',
		},
		{
			id: 'inv_002',
			date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
			amount: 39.99,
			status: 'paid',
			type: 'Subscription Renewal',
		},
	];

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		}).format(date);
	};

	const availablePlans = [
		{
			name: 'Managed Basic',
			price: 39.99,
			current: true,
			features: [
				'WordPress Hosting',
				'SSL Certificate',
				'Daily Backups',
				'Core Updates',
				'Basic Support',
			],
		},
		{
			name: 'Managed Pro',
			price: 79.99,
			current: false,
			features: [
				'All Basic Features',
				'Security Monitoring',
				'Performance Optimization',
				'Monthly Reports',
				'Priority Support',
			],
		},
		{
			name: 'Managed Premium',
			price: 149.99,
			current: false,
			features: [
				'All Pro Features',
				'Daily Malware Scans',
				'Advanced Optimization',
				'Weekly Site Reviews',
				'24/7 Emergency Support',
			],
		},
	];

	return (
		<div className='container max-w-5xl mx-auto py-8 px-4'>
            <BillingDebug />

            {/* Header Section */}
			<motion.div
				initial={mounted ? { opacity: 0, y: 20 } : false}
				animate={mounted ? { opacity: 1, y: 0 } : false}
				transition={{ duration: 0.5 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-3xl font-bold'>Billing</h1>
					<div className='flex items-center'>
						<Badge
							variant='outline'
							className='bg-green-100 text-green-800 border-green-200'
						>
							<CheckCircle2 className='h-3 w-3 mr-1' />
							Active Subscription
						</Badge>
					</div>
				</div>
			</motion.div>

			<Tabs
				defaultValue='overview'
				className='space-y-8'
			>
				<TabsList>
					<TabsTrigger value='overview'>Subscription</TabsTrigger>
					<TabsTrigger value='payment'>Payment Methods</TabsTrigger>
					<TabsTrigger value='history'>Billing History</TabsTrigger>
				</TabsList>

				<TabsContent
					value='overview'
					className='space-y-6'
				>
					<motion.div
						initial={mounted ? { opacity: 0, y: 10 } : false}
						animate={mounted ? { opacity: 1, y: 0 } : false}
						transition={{ duration: 0.4, delay: 0.1 }}
					>
						<div className='grid md:grid-cols-2 gap-6'>
							<Card className='overflow-hidden'>
								<CardHeader className='bg-muted/50'>
									<CardTitle>Current Plan</CardTitle>
									<CardDescription>
										Your active subscription
									</CardDescription>
								</CardHeader>
								<CardContent className='pt-6'>
									<div className='flex justify-between items-start mb-6'>
										<div>
											<h3 className='text-2xl font-bold'>
												{subscription.plan}
											</h3>
											<p className='text-muted-foreground'>
												${subscription.price}/month
											</p>
										</div>
										<Button variant='outline'>
											Change Plan
										</Button>
									</div>

									<div className='space-y-4'>
										<div>
											<p className='text-sm text-muted-foreground'>
												Next billing date
											</p>
											<p className='font-medium'>
												{formatDate(
													subscription.nextBillingDate
												)}
											</p>
										</div>

										<div>
											<p className='text-sm text-muted-foreground mb-2'>
												Plan includes
											</p>
											<ul className='space-y-1'>
												{subscription.features.map(
													(feature, index) => (
														<li
															key={index}
															className='flex items-center text-sm'
														>
															<CheckCircle2 className='h-4 w-4 mr-2 text-green-500' />
															{feature}
														</li>
													)
												)}
											</ul>
										</div>
									</div>
								</CardContent>
								<CardFooter className='bg-muted/30 flex justify-between'>
									<div className='flex items-center text-sm text-muted-foreground'>
										<Shield className='h-4 w-4 mr-1' />
										Secure subscription
									</div>
									<Button
										variant='ghost'
										size='sm'
									>
										Cancel Plan
									</Button>
								</CardFooter>
							</Card>

							<div className='space-y-6'>
								<Card>
									<CardHeader>
										<CardTitle>Payment Method</CardTitle>
										<CardDescription>
											Your default payment method
										</CardDescription>
									</CardHeader>
									<CardContent className='pt-2'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-4'>
												<div className='bg-muted rounded-md p-3'>
													<CreditCard className='h-6 w-6' />
												</div>
												<div>
													<p className='font-medium'>
														{paymentMethod.brand}{' '}
														••••{' '}
														{paymentMethod.last4}
													</p>
													<p className='text-sm text-muted-foreground'>
														Expires{' '}
														{paymentMethod.expiry}
													</p>
												</div>
											</div>
											<Button
												variant='ghost'
												size='sm'
												className='gap-1'
											>
												Edit{' '}
												<ChevronRight className='h-4 w-4' />
											</Button>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Need help?</CardTitle>
										<CardDescription>
											Contact our billing support team
										</CardDescription>
									</CardHeader>
									<CardContent className='pt-2'>
										<p className='text-sm text-muted-foreground mb-4'>
											Our team is available Monday to
											Friday, 9am - 5pm EST to help with
											any billing questions you may have.
										</p>
										<Button className='w-full'>
											<Wallet className='h-4 w-4 mr-2' />
											Contact Billing Support
										</Button>
									</CardContent>
								</Card>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={mounted ? { opacity: 0 } : false}
						animate={mounted ? { opacity: 1 } : false}
						transition={{ duration: 0.4, delay: 0.3 }}
						className='mt-8'
					>
						<h2 className='text-xl font-semibold mb-4'>
							Available Plans
						</h2>
						<div className='grid md:grid-cols-3 gap-4'>
							{availablePlans.map((plan) => (
								<Card
									key={plan.name}
									className={`${
										plan.current ? 'border-primary' : ''
									}`}
								>
									<CardHeader>
										<CardTitle>{plan.name}</CardTitle>
										<div className='mt-2'>
											<span className='text-2xl font-bold'>
												${plan.price}
											</span>
											<span className='text-sm text-muted-foreground'>
												{' '}
												/month
											</span>
										</div>
									</CardHeader>
									<CardContent>
										<ul className='space-y-2 mb-6'>
											{plan.features.map(
												(feature, index) => (
													<li
														key={index}
														className='flex items-center text-sm'
													>
														<CheckCircle2 className='h-4 w-4 mr-2 text-green-500' />
														<span>{feature}</span>
													</li>
												)
											)}
										</ul>
									</CardContent>
									<CardFooter>
										{plan.current ? (
											<Button
												className='w-full'
												disabled
											>
												Current Plan
											</Button>
										) : (
											<Button
												variant='outline'
												className='w-full'
											>
												Upgrade
											</Button>
										)}
									</CardFooter>
								</Card>
							))}
						</div>
					</motion.div>
				</TabsContent>

				<TabsContent value='payment'>
					<motion.div
						initial={mounted ? { opacity: 0 } : false}
						animate={mounted ? { opacity: 1 } : false}
						transition={{ duration: 0.4 }}
					>
						<Card className='mb-6'>
							<CardHeader>
								<CardTitle>Payment Methods</CardTitle>
								<CardDescription>
									Manage your payment methods
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='border rounded-md p-4 mb-4'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-4'>
											<div className='bg-muted rounded-md p-3'>
												<CreditCard className='h-6 w-6' />
											</div>
											<div>
												<p className='font-medium'>
													{paymentMethod.brand} ••••{' '}
													{paymentMethod.last4}
												</p>
												<p className='text-sm text-muted-foreground'>
													Expires{' '}
													{paymentMethod.expiry} ·
													Default
												</p>
											</div>
										</div>
										<div className='flex gap-2'>
											<Button
												variant='outline'
												size='sm'
											>
												Edit
											</Button>
											<Button
												variant='outline'
												size='sm'
											>
												Remove
											</Button>
										</div>
									</div>
								</div>

								<Button>
									<CreditCard className='h-4 w-4 mr-2' />
									Add Payment Method
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Billing Address</CardTitle>
								<CardDescription>
									Address used for invoices
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-1 mb-4'>
									<p className='font-medium'>Company Name</p>
									<p>123 Business Avenue</p>
									<p>Suite 100</p>
									<p>Austin, TX 78701</p>
									<p>United States</p>
								</div>
								<Button variant='outline'>
									Update Billing Address
								</Button>
							</CardContent>
						</Card>
					</motion.div>
				</TabsContent>

				<TabsContent value='history'>
					<motion.div
						initial={mounted ? { opacity: 0 } : false}
						animate={mounted ? { opacity: 1 } : false}
						transition={{ duration: 0.4 }}
					>
						<Card>
							<CardHeader>
								<CardTitle>Invoice History</CardTitle>
								<CardDescription>
									Your past invoices and payments
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='rounded-md border'>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>
													Invoice ID
												</TableHead>
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
											{billingHistory.length > 0 ? (
												billingHistory.map(
													(invoice) => (
														<TableRow
															key={invoice.id}
														>
															<TableCell className='font-mono'>
																{invoice.id}
															</TableCell>
															<TableCell>
																{formatDate(
																	invoice.date
																)}
															</TableCell>
															<TableCell>
																{invoice.type}
															</TableCell>
															<TableCell>
																$
																{invoice.amount.toFixed(
																	2
																)}
															</TableCell>
															<TableCell>
																<Badge
																	variant='outline'
																	className={
																		invoice.status ===
																		'paid'
																			? 'bg-green-100 text-green-800 border-green-200'
																			: 'bg-amber-100 text-amber-800 border-amber-200'
																	}
																>
																	{
																		invoice.status
																	}
																</Badge>
															</TableCell>
															<TableCell className='text-right'>
																<div className='flex justify-end gap-2'>
																	<Button
																		variant='outline'
																		size='sm'
																		className='h-8 px-2'
																	>
																		<FileText className='h-4 w-4' />
																		<span className='sr-only'>
																			View
																		</span>
																	</Button>
																	<Button
																		variant='outline'
																		size='sm'
																		className='h-8 px-2'
																	>
																		<Download className='h-4 w-4' />
																		<span className='sr-only'>
																			Download
																		</span>
																	</Button>
																</div>
															</TableCell>
														</TableRow>
													)
												)
											) : (
												<TableRow>
													<TableCell
														colSpan={6}
														className='text-center py-8 text-muted-foreground'
													>
														No invoice history found
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									variant='outline'
									className='ml-auto'
								>
									<Receipt className='h-4 w-4 mr-2' />
									Request Invoice
								</Button>
							</CardFooter>
						</Card>
					</motion.div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
