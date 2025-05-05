'use client';

import Link from 'next/link';
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
	Globe,
	FileEdit,
	RefreshCw,
	Clock,
	CheckCircle2,
	Server,
	Shield,
} from 'lucide-react';

interface SiteStatusCardProps {
	siteData: {
		domain: string;
		status: 'pre-build' | 'building' | 'deployed';
		progress?: number;
		startDate: Date;
		estimatedCompletion?: Date;
		lastUpdated?: Date;
		uptime?: number;
		uniqueVisitors?: number;
	};
	formatDate: (date: Date) => string;
	getDaysRemaining: () => number;
}

export function SiteStatusCard({
	siteData,
	formatDate,
	getDaysRemaining,
}: SiteStatusCardProps) {
	const isPreBuild = siteData.status === 'pre-build';
	const isBuilding = siteData.status === 'building';
	const isDeployed = siteData.status === 'deployed';

	return (
		<Card>
			<CardHeader>
				<CardTitle>Site Status</CardTitle>
				<CardDescription>
					{isPreBuild && 'Ready to start building your website'}
					{isBuilding && 'Your site is currently in development'}
					{isDeployed && 'Your website is live and performing well'}
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-6'>
				{/* Building Progress Bar */}
				{isBuilding && (
					<div className='space-y-4'>
						

						<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
							<div className='bg-muted/40 p-3 rounded-lg'>
								<div className='text-xs text-muted-foreground mb-1'>
									Started
								</div>
								<div className='font-medium'>
									{formatDate(siteData.startDate)}
								</div>
							</div>

							<div className='bg-muted/40 p-3 rounded-lg'>
								<div className='text-xs text-muted-foreground mb-1'>
									Estimated Completion
								</div>
								<div className='font-medium'>
									{formatDate(siteData.estimatedCompletion)}
								</div>
							</div>

							<div className='bg-primary/5 p-3 rounded-lg'>
								<div className='text-xs text-muted-foreground mb-1'>
									Time Remaining
								</div>
								<div className='font-medium flex items-center'>
									<Clock className='h-4 w-4 mr-2 text-primary' />
									{getDaysRemaining()} days
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Deployed Site Status */}
				{isDeployed && (
					<div className='space-y-4'>
						<div className='bg-green-50 border border-green-200 rounded-lg p-4 flex items-center'>
							<Server className='h-5 w-5 text-green-600 mr-3' />
							<div>
								<h4 className='font-medium text-green-800'>
									All Systems Operational
								</h4>
								<p className='text-sm text-green-700'>
									Your website is running smoothly with{' '}
									{siteData.uptime}% uptime
								</p>
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
							<div className='bg-muted/40 p-3 rounded-lg'>
								<div className='text-xs text-muted-foreground mb-1'>
									Last Updated
								</div>
								<div className='font-medium'>
									{formatDate(siteData.lastUpdated)}
								</div>
							</div>

							<div className='bg-muted/40 p-3 rounded-lg'>
								<div className='text-xs text-muted-foreground mb-1'>
									Security Status
								</div>
								<div className='font-medium flex items-center'>
									<Shield className='h-4 w-4 mr-2 text-green-600' />
									Protected
								</div>
							</div>

							<div className='bg-muted/40 p-3 rounded-lg'>
								<div className='text-xs text-muted-foreground mb-1'>
									Weekly Visitors
								</div>
								<div className='font-medium'>
									{siteData.uniqueVisitors}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Pre-build get started */}
				{isPreBuild && (
					<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
						<h4 className='font-medium text-blue-800 mb-2'>
							Let&apos;s Build Your Website
						</h4>
						<p className='text-sm text-blue-700 mb-4'>
							We&apos;re ready to start creating your professional
							website. The first step is to complete our site
							requirements form so we understand your goals and
							needs.
						</p>
						<Button>
							Start Requirements Form
							<CheckCircle2 className='h-4 w-4 ml-2' />
						</Button>
					</div>
				)}
			</CardContent>

			<CardFooter>
				{isDeployed && (
					<div className='w-full flex flex-col sm:flex-row gap-3'>
						<Button
							className='flex-1'
							asChild
						>
							<Link
								href={`https://${siteData.domain}`}
								target='_blank'
							>
								<Globe className='h-4 w-4 mr-2' />
								Visit Your Site
							</Link>
						</Button>
						<Button
							variant='outline'
							className='flex-1'
							asChild
						>
							<Link href='/support/'>
								<FileEdit className='h-4 w-4 mr-2' />
								Support
							</Link>
						</Button>
					</div>
				)}

				{isBuilding && (
					<div className='w-full flex flex-col sm:flex-row gap-3'>
						<Button className='flex-1'>
							<RefreshCw className='h-4 w-4 mr-2' />
							Check for Updates
						</Button>
						<Button
							variant='outline'
							className='flex-1'
							asChild
						>
							<Link href='/support'>
								<FileEdit className='h-4 w-4 mr-2' />
								Submit Feedback
							</Link>
						</Button>
					</div>
				)}

				{isPreBuild && (
					<div className='w-full flex flex-col sm:flex-row gap-3'>
						<Button className='flex-1'>
							<CheckCircle2 className='h-4 w-4 mr-2' />
							Start Requirements Form
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
