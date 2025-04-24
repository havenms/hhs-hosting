'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { UserNavbar } from '@/components/user-navbar';
import {
	BarChart3,
	PlusCircle,
	CreditCard,
	LifeBuoy,
	Settings,
	ExternalLink,
	Calendar,
	FileText,
	Clock,
	CheckCircle2,
	Circle,
	ArrowRight,
	LogIn,
	RefreshCw,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

// Mock data for the site at different stages
const siteData = {
	id: 'site-1',
	name: 'My WordPress Site',
	domain: 'my-site.hhshosting.com',
	projectStage: 'building',
	visitors: [
		45, 38, 52, 48, 53, 39, 55, 42, 49, 50, 47, 54, 51, 46, 43, 55, 57, 52,
		54, 49, 51, 48, 53, 47, 56, 49, 52, 50, 48,
	],
	lastUpdated: '2023-05-15T14:30:00Z',
	timeline: [
		{ stage: 'requirements', completed: true, date: '2023-04-15' },
		{ stage: 'design', completed: true, date: '2023-05-01' },
		{
			stage: 'development',
			completed: false,
			date: null,
			current: true,
		},
		{ stage: 'content', completed: false, date: null },
		{ stage: 'testing', completed: false, date: null },
		{ stage: 'launch', completed: false, date: null },
	],
};

// Project stages for simulation
const projectStages = [
	{ value: 'building', label: 'Building' },
	{ value: 'deployed', label: 'Deployed' },
];

export function UserDashboard() {
	const { user, isAdmin } = useAuth();
	// Simulation state for project stage
	const [simulatedStage, setSimulatedStage] = useState('building');

	// Determine current site state based on simulated stage
	const isBuilding = simulatedStage === 'building';
	const isDeployed = simulatedStage === 'deployed';

	return (
		<div className='min-h-screen bg-background'>
			<UserNavbar />

			<div className='flex'>
				<main className='flex-1 container px-4 py-8'>
					{/* Simulation Control */}
					<Card className='mb-8'>
						<CardHeader className='bg-muted'>
							<CardTitle className='text-lg'>
								Project Stage Simulator
							</CardTitle>
							<CardDescription>
								Explore how your dashboard changes throughout
								your site's lifecycle
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-6'>
							<div className='flex items-center gap-4 flex-wrap'>
								<div className='font-medium'>
									Simulate project stage:
								</div>
								<Select
									value={simulatedStage}
									onValueChange={setSimulatedStage}
								>
									<SelectTrigger className='w-[180px]'>
										<SelectValue placeholder='Select a stage' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>
												Project Stages
											</SelectLabel>
											{projectStages.map((stage) => (
												<SelectItem
													key={stage.value}
													value={stage.value}
												>
													{stage.label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<div className='ml-auto text-muted-foreground text-sm'>
									<span className='font-medium'>
										Current view:
									</span>{' '}
									{
										projectStages.find(
											(stage) =>
												stage.value === simulatedStage
										)?.label
									}{' '}
									stage
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Project Status Banner - Different based on project stage */}
					<section className='mb-8'>
						

						{isBuilding && (
							/* User's site is being built */
							<Card className='border-primary'>
								<CardHeader className='bg-primary/10 border-b border-primary/20'>
									<Badge
										variant='outline'
										className='mb-2 bg-primary/20 text-primary border-primary w-fit'
									>
										In Progress
									</Badge>
									<CardTitle className='text-2xl'>
										Your Site is Being Built
									</CardTitle>
									<CardDescription>
										Your site is currently being built.
										Here's your temporary URL:
									</CardDescription>
									<p className='mt-2 font-mono text-sm bg-background px-3 py-2 rounded border'>
										{siteData.domain}
									</p>
								</CardHeader>
								<CardContent className='pt-6'>
									<div className='grid md:grid-cols-2 gap-6'>
										<div>
											<h3 className='text-lg font-medium mb-3'>
												Next Steps
											</h3>
											<div className='space-y-4'>
												<Button
													className='w-full sm:w-auto rounded-full'
													asChild
												>
													<Link href='/site-requirements'>
														<FileText className='mr-2 h-4 w-4' />
														Update Requirements
													</Link>
												</Button>
												<Button
													className='w-full sm:w-auto rounded-full'
													variant='outline'
													asChild
												>
													<Link href='/schedule'>
														<Calendar className='mr-2 h-4 w-4' />
														Schedule Follow-up
													</Link>
												</Button>
											</div>
										</div>

										<div>
											<h3 className='text-lg font-medium mb-3'>
												Need Help?
											</h3>
											<div className='space-y-4'>
												<Button
													className='w-full sm:w-auto rounded-full'
													variant='outline'
													asChild
												>
													<Link href='/support'>
														<LifeBuoy className='mr-2 h-4 w-4' />
														Contact Support
													</Link>
												</Button>
												<Button
													className='w-full sm:w-auto rounded-full'
													variant='outline'
													asChild
												>
													<Link href='/billing'>
														<CreditCard className='mr-2 h-4 w-4' />
														View Billing
													</Link>
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{isDeployed && (
							/* User's site is live */
							<Card className='border-primary'>
								<CardHeader className='bg-primary/10 border-b border-primary/20'>
									<Badge
										variant='outline'
										className='mb-2 bg-success/20 text-success border-success w-fit'
									>
										Live
									</Badge>
									<CardTitle className='text-2xl'>
										Welcome to Your Site!
									</CardTitle>
									<CardDescription>
										Your WordPress site is live and ready to
										manage.
									</CardDescription>
								</CardHeader>
								<CardContent className='pt-6'>
									<div className='grid md:grid-cols-2 gap-6'>
										<div>
											<h3 className='text-lg font-medium mb-3'>
												Quick Actions
											</h3>
											<div className='space-y-4'>
												<Button
													className='w-full sm:w-auto rounded-full'
													asChild
												>
													<Link
														href={`https://${siteData.domain}/wp-admin`}
														target='_blank'
														rel='noopener'
													>
														<LogIn className='mr-2 h-4 w-4' />
														WordPress Login
														<ExternalLink className='ml-2 h-3 w-3' />
													</Link>
												</Button>
												<Button
													className='w-full sm:w-auto rounded-full'
													variant='outline'
													asChild
												>
													<Link
														href={`https://${siteData.domain}`}
														target='_blank'
														rel='noopener'
													>
														<ArrowRight className='mr-2 h-4 w-4' />
														View Your Site
														<ExternalLink className='ml-2 h-3 w-3' />
													</Link>
												</Button>
											</div>
										</div>

										<div>
											<h3 className='text-lg font-medium mb-3'>
												Manage Your Site
											</h3>
											<div className='space-y-4'>
												<Button
													className='w-full sm:w-auto rounded-full'
													variant='outline'
													asChild
												>
													<Link
														href={`/sites/${siteData.id}/analytics`}
													>
														<BarChart3 className='mr-2 h-4 w-4' />
														View Analytics
													</Link>
												</Button>
												<Button
													className='w-full sm:w-auto rounded-full'
													variant='outline'
													asChild
												>
													<Link href='/support/edit-request'>
														<FileText className='mr-2 h-4 w-4' />
														Request Site Edit
													</Link>
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
					</section>

					{/* Project Timeline - Only shown when site is being built */}
					{isBuilding && (
						<section className='mb-8'>
							<Card>
								<CardHeader>
									<CardTitle className='flex items-center'>
										<Clock className='mr-2 h-5 w-5 text-primary' />
										Project Timeline
									</CardTitle>
									<CardDescription>
										Track the progress of your website build
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-6'>
										{/* Progress bar */}
										<div className='relative pt-1'>
											<div className='flex mb-2 items-center justify-between'>
												<div>
													<span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground'>
														In Progress
													</span>
												</div>
												<div className='text-right'>
													<span className='text-xs font-semibold inline-block text-muted-foreground'>
														{Math.round(
															(siteData.timeline.filter(
																(item) =>
																	item.completed
															).length /
																siteData
																	.timeline
																	.length) *
																100
														)}
														% Complete
													</span>
												</div>
											</div>
											<div className='overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-muted'>
												<div
													style={{
														width: `${
															(siteData.timeline.filter(
																(item) =>
																	item.completed
															).length /
																siteData
																	.timeline
																	.length) *
															100
														}%`,
													}}
													className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary'
												></div>
											</div>
										</div>

										{/* Timeline steps */}
										<ol className='relative border-l border-primary/30'>
											{siteData.timeline.map(
												(step, index) => (
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
																step.stage.slice(
																	1
																)}
															{step.current && (
																<span className='bg-primary text-primary-foreground text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3'>
																	Current
																</span>
															)}
														</h3>
														{step.completed &&
															step.date && (
																<time className='block mb-2 text-xs font-normal leading-none text-muted-foreground'>
																	Completed on{' '}
																	{new Date(
																		step.date
																	).toLocaleDateString()}
																</time>
															)}
														{step.current && (
															<p className='mb-4 text-sm font-normal text-muted-foreground'>
																Our team is
																currently
																working on this
																stage.
															</p>
														)}
													</li>
												)
											)}
										</ol>
									</div>
								</CardContent>
								<CardFooter className='border-t pt-6'>
									<div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4'>
										<div className='text-sm text-muted-foreground'>
											<span className='font-medium'>
												Estimated completion:
											</span>{' '}
											4-6 weeks from start date
										</div>
										<Button
											variant='outline'
											size='sm'
											className='rounded-full'
											asChild
										>
											<Link href='/support/timeline-question'>
												Have questions about the
												timeline?
											</Link>
										</Button>
									</div>
								</CardFooter>
							</Card>
						</section>
					)}

					{/* Analytics section - only shown for live sites */}
					{isDeployed && (
						<section className='mb-8'>
							<Card>
								<CardHeader>
									<CardTitle className='flex items-center'>
										<BarChart3 className='mr-2 h-5 w-5 text-primary' />
										Visitor Analytics
									</CardTitle>
									<CardDescription>
										Site traffic for the last 30 days
									</CardDescription>
								</CardHeader>

								<CardContent>
									{/* Graph visualization - in real implementation this would use a chart library */}
									<div className='h-64 bg-background border border-border rounded-md p-4'>
										<div className='flex h-full items-end justify-between gap-2'>
											{siteData.visitors.map(
												(count, i) => (
													<div
														key={i}
														className='bg-primary/80 hover:bg-primary transition-all w-full rounded-t-sm'
														style={{
															height: `${
																(count / 100) *
																100
															}%`,
														}}
														title={`Day ${
															i + 1
														}: ${count} visitors`}
													></div>
												)
											)}
										</div>
										<div className='text-center text-sm text-muted-foreground mt-2'>
											Total:{' '}
											{siteData.visitors.reduce(
												(sum, count) => sum + count,
												0
											)}{' '}
											visitors
										</div>
									</div>
								</CardContent>
							</Card>
						</section>
					)}

					{/* Site Information - Replaces the "Your Sites" section */}
					<section>
						<h2 className='text-xl font-semibold mb-4'>
							{isDeployed
								? 'Your WordPress Site'
								: isBuilding
								? 'Your Project'
								: 'Getting Started'}
						</h2>
						<Card>
							<CardHeader>
								<div className='flex justify-between items-center mb-1'>
									<CardTitle className='mr-2'>
										{siteData.name}
									</CardTitle>
									<Badge
										variant={
											isDeployed ? 'default' : 'outline'
										}
									>
										{isDeployed
											? 'Live'
											: isBuilding
											? 'In Progress'
											: 'Not Started'}
									</Badge>
								</div>
								{(isBuilding || isDeployed) && (
									<CardDescription className='truncate'>
										{siteData.domain}
									</CardDescription>
								)}
							</CardHeader>
							<CardContent>
								<div className='flex flex-col gap-4'>
									{isPreBuild && (
										<>
											<div className='text-sm text-muted-foreground mb-2'>
												Let us know your requirements to
												get started with your WordPress
												site.
											</div>
											<Button
												className='rounded-full'
												asChild
											>
												<Link href='/site-requirements'>
													<FileText className='mr-2 h-4 w-4' />
													Start Your Site
												</Link>
											</Button>
										</>
									)}

									{isBuilding && (
										<div className='space-y-4'>
											<div className='bg-muted p-4 rounded-lg'>
												<h3 className='font-medium mb-2'>
													Project Stage
												</h3>
												<div className='flex items-center'>
													<RefreshCw className='h-4 w-4 text-primary mr-2 animate-spin' />
													<span>
														Development in progress
													</span>
												</div>
											</div>
											
										</div>
									)}

									{isDeployed && (
										<>
											<div className='grid grid-cols-2 gap-4'>
												<div className='bg-muted p-4 rounded-lg'>
													<h4 className='text-sm font-medium mb-1'>
														Last Updated
													</h4>
													<p>
														{new Date(
															siteData.lastUpdated
														).toLocaleDateString()}
													</p>
												</div>
												<div className='bg-muted p-4 rounded-lg'>
													<h4 className='text-sm font-medium mb-1'>
														Monthly Visitors
													</h4>
													<p>
														{siteData.visitors.reduce(
															(sum, count) =>
																sum + count,
															0
														)}
													</p>
												</div>
											</div>
											<div className='flex flex-col gap-2 mt-2'>
												<Button
													variant='outline'
													size='sm'
													className='justify-start'
													asChild
												>
													<Link
														href={`https://${siteData.domain}/wp-admin`}
														target='_blank'
														rel='noopener'
													>
														<LogIn className='mr-2 h-4 w-4' />
														WordPress Admin
														<ExternalLink className='ml-auto h-4 w-4' />
													</Link>
												</Button>
												<Button
													variant='outline'
													size='sm'
													className='justify-start'
													asChild
												>
													<Link href='/support/edit-request'>
														<FileText className='mr-2 h-4 w-4' />
														Request Site Edit
													</Link>
												</Button>
												<Button
													variant='outline'
													size='sm'
													className='justify-start'
													asChild
												>
													<Link
														href={`/sites/${siteData.id}/settings`}
													>
														<Settings className='mr-2 h-4 w-4' />
														Site Settings
													</Link>
												</Button>
											</div>
										</>
									)}
								</div>
							</CardContent>
							<CardFooter className='border-t pt-6'>
								<div className='w-full text-center text-sm text-muted-foreground'>
									{isPreBuild &&
										'Submit your requirements to begin the process'}
									{isBuilding &&
										'Your site is currently in development'}
									{isDeployed &&
										'Your site is live and ready to manage'}
								</div>
							</CardFooter>
						</Card>
					</section>
				</main>
			</div>

			<footer className='bg-muted py-4 px-4 border-t border-border'>
				<div className='container mx-auto text-center text-sm text-muted-foreground'>
					<p>&copy; 2023 HHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
