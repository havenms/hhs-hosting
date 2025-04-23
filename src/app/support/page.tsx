'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/components/auth-provider';
import { DiscoMode } from '@/components/disco-mode';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	LifeBuoy,
	HelpCircle,
	FileQuestion,
	CheckCircle2,
	Upload,
	AlertCircle,
	Clock,
	MessageSquare,
	Paperclip,
	DatabaseIcon,
	Globe,
	RefreshCw,
	CreditCard,
	Lock,
	Search,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { LoadingState } from '@/components/loading-state';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

// Dummy FAQ data
const faqs = [
	{
		id: 1,
		category: 'domains',
		question: 'How do I connect a custom domain to my site?',
		answer: 'To connect a custom domain, go to your site settings and click "Add Domain". You\'ll need to update your DNS settings at your domain registrar. Point your A record to our IP address (145.32.44.75) and your CNAME record for "www" to your-site.hhshosting.com.',
	},
	{
		id: 2,
		category: 'domains',
		question: 'How long does domain propagation take?',
		answer: 'Domain changes can take anywhere from 15 minutes to 48 hours to fully propagate across the internet. This depends on your DNS provider and various caching settings.',
	},
	{
		id: 3,
		category: 'billing',
		question: 'How do I downgrade my hosting plan?',
		answer: 'To downgrade your plan, visit the Billing page and click "Change Plan". Select your desired plan and follow the instructions. Note that downgrading takes effect at the end of your current billing cycle.',
	},
	{
		id: 4,
		category: 'billing',
		question: 'Will I get a refund if I cancel mid-month?',
		answer: "We don't offer prorated refunds for cancellations. Your service will continue until the end of your current billing period.",
	},
	{
		id: 5,
		category: 'technical',
		question: "How do I access my site's database?",
		answer: 'You can access your database through phpMyAdmin by logging into your cPanel. Go to your site settings, click "cPanel Access", then find the phpMyAdmin icon under the "Databases" section.',
	},
	{
		id: 6,
		category: 'technical',
		question: 'How do I set up an SSL certificate?',
		answer: "SSL certificates are automatically provisioned for all sites hosted with us. If you're having issues, please check that your domain is properly pointed to our servers first, then contact support if problems persist.",
	},
	{
		id: 7,
		category: 'account',
		question: 'How do I enable two-factor authentication?',
		answer: 'To enable 2FA, go to your Profile page and click on "Security". Under the two-factor authentication section, click "Enable" and follow the steps to scan the QR code with your authenticator app.',
	},
	{
		id: 8,
		category: 'account',
		question: 'How do I reset my password?',
		answer: 'Click the "Forgot Password" link on the login page. Enter your email address and we\'ll send you instructions to reset your password. For security reasons, password reset links expire after 24 hours.',
	},
];

// Dummy ticket history data
const ticketHistory = [
	{
		id: 'TKT-1234',
		subject: "Can't access cPanel",
		createdAt: '2023-05-10T14:32:00Z',
		status: 'Closed',
		priority: 'High',
		lastUpdated: '2023-05-10T16:45:00Z',
		messages: 3,
	},
	{
		id: 'TKT-1235',
		subject: 'Need help with domain configuration',
		createdAt: '2023-05-12T09:15:00Z',
		status: 'Open',
		priority: 'Medium',
		lastUpdated: '2023-05-14T11:20:00Z',
		messages: 5,
	},
	{
		id: 'TKT-1236',
		subject: 'Billing cycle question',
		createdAt: '2023-05-15T11:45:00Z',
		status: 'Open',
		priority: 'Low',
		lastUpdated: '2023-05-15T13:10:00Z',
		messages: 2,
	},
	{
		id: 'TKT-1237',
		subject: 'Site loading slowly',
		createdAt: '2023-05-05T15:30:00Z',
		status: 'Closed',
		priority: 'Medium',
		lastUpdated: '2023-05-07T10:15:00Z',
		messages: 6,
	},
];

export default function SupportPage() {
	const { user, isLoading } = useAuth();
	const [activeTab, setActiveTab] = useState('contact');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [ticketForm, setTicketForm] = useState({
		subject: '',
		description: '',
		priority: 'medium',
		files: [],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	if (isLoading) {
		return <LoadingState />;
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			// Convert FileList to Array and limit to 5 files
			const fileArray = Array.from(e.target.files).slice(0, 5);
			setTicketForm({
				...ticketForm,
				files: fileArray,
			});
		}
	};

	const handleTicketSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitSuccess(true);

			// Reset form after success
			setTimeout(() => {
				setTicketForm({
					subject: '',
					description: '',
					priority: 'medium',
					files: [],
				});
				setSubmitSuccess(false);
			}, 3000);
		}, 1500);
	};

	// Filter FAQs based on search query and category
	const filteredFaqs = faqs.filter((faq) => {
		const matchesSearch =
			searchQuery === '' ||
			faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesCategory =
			selectedCategory === 'all' || faq.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	return (
		<div className='min-h-screen bg-background'>
			<Navbar />
			<DiscoMode isLoading={isLoading} />

			<main className='container mx-auto px-4 py-12'>
				{/* Page Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						<span className='text-primary'>Support</span> &
						Resources
					</h1>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
						Get help with your hosting account and find answers to
						common questions.
					</p>
				</div>

				{/* Support Tabs */}
				<Tabs
					defaultValue='contact'
					value={activeTab}
					onValueChange={setActiveTab}
					className='space-y-8'
				>
					<TabsList className='grid grid-cols-3 max-w-xl mx-auto'>
						<TabsTrigger
							value='contact'
							className='text-base py-3'
						>
							<MessageSquare className='w-4 h-4 mr-2' />
							Contact Us
						</TabsTrigger>
						<TabsTrigger
							value='faq'
							className='text-base py-3'
						>
							<HelpCircle className='w-4 h-4 mr-2' />
							FAQs
						</TabsTrigger>
						<TabsTrigger
							value='tickets'
							className='text-base py-3'
							disabled={!user}
						>
							<Clock className='w-4 h-4 mr-2' />
							My Tickets
						</TabsTrigger>
					</TabsList>

					{/* Contact Form */}
					<TabsContent value='contact'>
						<div className='grid md:grid-cols-3 gap-8'>
							<div className='md:col-span-2'>
								<Card>
									<CardHeader>
										<CardTitle className='flex items-center'>
											<LifeBuoy className='mr-2 h-5 w-5 text-primary' />
											Submit a Support Ticket
										</CardTitle>
										<CardDescription>
											Our support team typically responds
											within 2 hours during business
											hours.
										</CardDescription>
									</CardHeader>
									<CardContent>
										{submitSuccess ? (
											<div className='bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-900 rounded-lg p-6 text-center'>
												<CheckCircle2 className='h-12 w-12 text-green-500 dark:text-green-400 mx-auto mb-4' />
												<h3 className='text-xl font-semibold mb-2'>
													Ticket Submitted
													Successfully
												</h3>
												<p className='text-muted-foreground mb-4'>
													We've received your request
													and will respond as soon as
													possible.
												</p>
												<Button
													onClick={() =>
														setActiveTab('tickets')
													}
													disabled={!user}
												>
													View My Tickets
												</Button>
											</div>
										) : (
											<form
												onSubmit={handleTicketSubmit}
												className='space-y-6'
											>
												<div className='grid gap-4'>
													<div className='space-y-2'>
														<Label htmlFor='subject'>
															Subject
														</Label>
														<Input
															id='subject'
															placeholder='Brief description of your issue'
															value={
																ticketForm.subject
															}
															onChange={(e) =>
																setTicketForm({
																	...ticketForm,
																	subject:
																		e.target
																			.value,
																})
															}
															required
														/>
													</div>

													<div className='space-y-2'>
														<Label htmlFor='description'>
															Description
														</Label>
														<Textarea
															id='description'
															placeholder='Please provide detailed information about your issue'
															className='min-h-[200px]'
															value={
																ticketForm.description
															}
															onChange={(e) =>
																setTicketForm({
																	...ticketForm,
																	description:
																		e.target
																			.value,
																})
															}
															required
														/>
													</div>

													<div className='grid grid-cols-2 gap-4'>
														<div className='space-y-2'>
															<Label htmlFor='priority'>
																Priority
															</Label>
															<Select
																value={
																	ticketForm.priority
																}
																onValueChange={(
																	value
																) =>
																	setTicketForm(
																		{
																			...ticketForm,
																			priority:
																				value,
																		}
																	)
																}
															>
																<SelectTrigger>
																	<SelectValue placeholder='Select priority' />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value='low'>
																		Low
																	</SelectItem>
																	<SelectItem value='medium'>
																		Medium
																	</SelectItem>
																	<SelectItem value='high'>
																		High
																	</SelectItem>
																</SelectContent>
															</Select>
														</div>

														<div className='space-y-2'>
															<Label htmlFor='attachments'>
																Attachments (max
																5)
															</Label>
															<div className='flex items-center'>
																<Button
																	type='button'
																	variant='outline'
																	onClick={() =>
																		document
																			.getElementById(
																				'file-upload'
																			)
																			?.click()
																	}
																	className='w-full h-10'
																>
																	<Upload className='h-4 w-4 mr-2' />
																	Upload Files
																</Button>
																<input
																	id='file-upload'
																	type='file'
																	multiple
																	onChange={
																		handleFileChange
																	}
																	className='hidden'
																	accept='image/*,.pdf,.doc,.docx,.txt'
																/>
															</div>
														</div>
													</div>

													{/* Show selected files */}
													{ticketForm.files.length >
														0 && (
														<div className='bg-muted/50 p-3 rounded-md'>
															<p className='text-sm font-medium mb-2'>
																Selected files (
																{
																	ticketForm
																		.files
																		.length
																}
																):
															</p>
															<ul className='space-y-1'>
																{ticketForm.files.map(
																	(
																		file,
																		index
																	) => (
																		<li
																			key={
																				index
																			}
																			className='text-sm flex items-center'
																		>
																			<Paperclip className='h-3 w-3 mr-2 text-muted-foreground' />
																			<span className='truncate'>
																				{
																					file.name
																				}
																			</span>
																			<span className='text-xs text-muted-foreground ml-2'>
																				(
																				{(
																					file.size /
																					1024
																				).toFixed(
																					1
																				)}{' '}
																				KB)
																			</span>
																		</li>
																	)
																)}
															</ul>
														</div>
													)}
												</div>

												<div className='flex justify-end'>
													<Button
														type='submit'
														className='rounded-full'
														disabled={isSubmitting}
													>
														{isSubmitting
															? 'Submitting...'
															: 'Submit Ticket'}
													</Button>
												</div>
											</form>
										)}
									</CardContent>
								</Card>
							</div>

							<div>
								<Card>
									<CardHeader>
										<CardTitle>Need Help?</CardTitle>
										<CardDescription>
											Other ways to get support
										</CardDescription>
									</CardHeader>
									<CardContent className='space-y-6'>
										<div className='flex flex-col space-y-4'>
											<div className='bg-muted/50 p-4 rounded-lg'>
												<h3 className='font-medium mb-1 flex items-center'>
													<FileQuestion className='h-4 w-4 mr-2 text-primary' />
													Check our FAQs
												</h3>
												<p className='text-sm text-muted-foreground mb-3'>
													Find quick answers to common
													questions.
												</p>
												<Button
													variant='outline'
													className='w-full rounded-full'
													onClick={() =>
														setActiveTab('faq')
													}
												>
													Browse FAQs
												</Button>
											</div>

											<div className='bg-muted/50 p-4 rounded-lg'>
												<h3 className='font-medium mb-1 flex items-center'>
													<MessageSquare className='h-4 w-4 mr-2 text-secondary' />
													Live Chat
												</h3>
												<p className='text-sm text-muted-foreground mb-3'>
													Available Monday-Friday,
													9am-5pm EST
												</p>
												<Button
													variant='outline'
													className='w-full rounded-full'
												>
													Start Chat
												</Button>
											</div>

											<div className='bg-muted/50 p-4 rounded-lg'>
												<h3 className='font-medium mb-1 flex items-center'>
													<AlertCircle className='h-4 w-4 mr-2 text-accent' />
													System Status
												</h3>
												<p className='text-sm text-muted-foreground mb-1'>
													Check if there are any
													ongoing issues.
												</p>
												<div className='flex items-center'>
													<div className='w-2 h-2 rounded-full bg-green-500 mr-2'></div>
													<span className='text-sm'>
														All systems operational
													</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>

					{/* FAQ Section */}
					<TabsContent value='faq'>
						<div className='space-y-8'>
							<div className='grid md:grid-cols-4 gap-6'>
								<div className='md:col-span-1 space-y-6'>
									<Card>
										<CardHeader>
											<CardTitle className='text-lg'>
												Categories
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className='space-y-2'>
												<button
													onClick={() =>
														setSelectedCategory(
															'all'
														)
													}
													className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
														selectedCategory ===
														'all'
															? 'bg-primary text-primary-foreground'
															: 'hover:bg-muted/50'
													}`}
												>
													<HelpCircle className='h-4 w-4 mr-3' />
													<span>All Topics</span>
												</button>

												<button
													onClick={() =>
														setSelectedCategory(
															'domains'
														)
													}
													className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
														selectedCategory ===
														'domains'
															? 'bg-primary text-primary-foreground'
															: 'hover:bg-muted/50'
													}`}
												>
													<Globe className='h-4 w-4 mr-3' />
													<span>Domains</span>
												</button>

												<button
													onClick={() =>
														setSelectedCategory(
															'billing'
														)
													}
													className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
														selectedCategory ===
														'billing'
															? 'bg-primary text-primary-foreground'
															: 'hover:bg-muted/50'
													}`}
												>
													<CreditCard className='h-4 w-4 mr-3' />
													<span>Billing</span>
												</button>

												<button
													onClick={() =>
														setSelectedCategory(
															'technical'
														)
													}
													className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
														selectedCategory ===
														'technical'
															? 'bg-primary text-primary-foreground'
															: 'hover:bg-muted/50'
													}`}
												>
													<DatabaseIcon className='h-4 w-4 mr-3' />
													<span>Technical</span>
												</button>

												<button
													onClick={() =>
														setSelectedCategory(
															'account'
														)
													}
													className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
														selectedCategory ===
														'account'
															? 'bg-primary text-primary-foreground'
															: 'hover:bg-muted/50'
													}`}
												>
													<Lock className='h-4 w-4 mr-3' />
													<span>Account</span>
												</button>
											</div>
										</CardContent>
									</Card>
								</div>

								<div className='md:col-span-3'>
									<Card>
										<CardHeader>
											<CardTitle>
												Frequently Asked Questions
											</CardTitle>
											<CardDescription>
												Find answers to common questions
												about our hosting platform
											</CardDescription>

											<div className='relative mt-4'>
												<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
												<Input
													placeholder='Search FAQs...'
													className='pl-10'
													value={searchQuery}
													onChange={(e) =>
														setSearchQuery(
															e.target.value
														)
													}
												/>
											</div>
										</CardHeader>
										<CardContent>
											<div className='space-y-6'>
												{filteredFaqs.length === 0 ? (
													<div className='text-center py-8'>
														<FileQuestion className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
														<h3 className='text-lg font-medium'>
															No matching results
														</h3>
														<p className='text-muted-foreground'>
															Try adjusting your
															search or category
															filters
														</p>
													</div>
												) : (
													filteredFaqs.map((faq) => (
														<div
															key={faq.id}
															className='border border-border rounded-lg p-4'
														>
															<h3 className='text-lg font-medium mb-2 flex items-start'>
																<HelpCircle className='h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5' />
																<span>
																	{
																		faq.question
																	}
																</span>
															</h3>
															<p className='text-muted-foreground pl-7'>
																{faq.answer}
															</p>
															<div className='mt-3 pl-7'>
																<span className='inline-block text-xs font-medium bg-muted px-2 py-1 rounded'>
																	{faq.category
																		.charAt(
																			0
																		)
																		.toUpperCase() +
																		faq.category.slice(
																			1
																		)}
																</span>
															</div>
														</div>
													))
												)}
											</div>
										</CardContent>
										<CardFooter className='flex flex-col items-start border-t pt-6'>
											<h3 className='text-lg font-medium mb-2'>
												Still need help?
											</h3>
											<p className='text-muted-foreground mb-4'>
												If you can't find an answer to
												your question, you can always
												contact our support team.
											</p>
											<Button
												className='rounded-full'
												onClick={() =>
													setActiveTab('contact')
												}
											>
												<MessageSquare className='h-4 w-4 mr-2' />
												Contact Support
											</Button>
										</CardFooter>
									</Card>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Ticket History */}
					<TabsContent value='tickets'>
						{!user ? (
							<Card>
								<CardContent className='py-12 text-center'>
									<AlertCircle className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
									<h3 className='text-xl font-medium mb-2'>
										Please log in to view your tickets
									</h3>
									<p className='text-muted-foreground mb-6'>
										You need to be logged in to access your
										support ticket history.
									</p>
									<Button asChild>
										<Link href='/login'>Log In</Link>
									</Button>
								</CardContent>
							</Card>
						) : (
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
												You haven't submitted any
												support tickets yet.
											</p>
											<Button
												onClick={() =>
													setActiveTab('contact')
												}
												className='rounded-full'
											>
												Create a Ticket
											</Button>
										</div>
									) : (
										<div className='overflow-x-auto'>
											<table className='w-full border-collapse'>
												<thead>
													<tr className='border-b border-border'>
														<th className='text-left py-3 px-4'>
															Ticket ID
														</th>
														<th className='text-left py-3 px-4'>
															Subject
														</th>
														<th className='text-left py-3 px-4'>
															Status
														</th>
														<th className='text-left py-3 px-4'>
															Priority
														</th>
														<th className='text-left py-3 px-4'>
															Created
														</th>
														<th className='text-center py-3 px-4'>
															Actions
														</th>
													</tr>
												</thead>
												<tbody>
													{ticketHistory.map(
														(ticket) => (
															<tr
																key={ticket.id}
																className='border-b border-border'
															>
																<td className='py-3 px-4 font-mono text-sm'>
																	{ticket.id}
																</td>
																<td className='py-3 px-4'>
																	<div className='flex items-center'>
																		<span className='font-medium'>
																			{
																				ticket.subject
																			}
																		</span>
																		<span className='ml-2 text-xs bg-muted px-1.5 py-0.5 rounded'>
																			{
																				ticket.messages
																			}{' '}
																			{ticket.messages ===
																			1
																				? 'reply'
																				: 'replies'}
																		</span>
																	</div>
																</td>
																<td className='py-3 px-4'>
																	<span
																		className={`inline-flex items-center rounded-full px-2 py-1 text-xs 
                                  ${
										ticket.status === 'Open'
											? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
											: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
									}`}
																	>
																		{ticket.status ===
																		'Open' ? (
																			<>
																				<span className='w-1.5 h-1.5 rounded-full bg-green-500 mr-1'></span>
																				{
																					ticket.status
																				}
																			</>
																		) : (
																			ticket.status
																		)}
																	</span>
																</td>
																<td className='py-3 px-4'>
																	<span
																		className={`inline-block rounded-full px-2 py-1 text-xs 
                                  ${
										ticket.priority === 'High'
											? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
											: ticket.priority === 'Medium'
											? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
											: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
									}`}
																	>
																		{
																			ticket.priority
																		}
																	</span>
																</td>
																<td className='py-3 px-4 text-muted-foreground text-sm'>
																	{formatDate(
																		ticket.createdAt
																	)}
																</td>
																<td className='py-3 px-4 text-center'>
																	<Button
																		variant='ghost'
																		size='sm'
																	>
																		View
																		Details
																	</Button>
																</td>
															</tr>
														)
													)}
												</tbody>
											</table>
										</div>
									)}
								</CardContent>
								<CardFooter className='flex justify-between border-t pt-6'>
									<Button
										variant='outline'
										className='rounded-full'
									>
										<RefreshCw className='h-4 w-4 mr-2' />
										Refresh
									</Button>

									<Button
										className='rounded-full'
										onClick={() => setActiveTab('contact')}
									>
										Create New Ticket
									</Button>
								</CardFooter>
							</Card>
						)}
					</TabsContent>
				</Tabs>
			</main>

			<footer className='bg-muted py-8 px-4 mt-12'>
				<div className='container mx-auto text-center text-muted-foreground'>
					<p>&copy; 2023 HHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
