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
import { BarChart3, ArrowRight } from 'lucide-react';

interface AnalyticsProps {
	isDeployed: boolean;
	isBuilding: boolean;
	pageviews?: number;
	uniqueVisitors?: number;
	visitorData?: Array<{ day: string; visitors: number }>;
}

export function AnalyticsOverview({
	isDeployed,
	isBuilding,
	pageviews,
	uniqueVisitors,
	visitorData,
}: AnalyticsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Site Performance</CardTitle>
				<CardDescription>
					{isDeployed
						? "View your website's performance metrics and visitor data"
						: 'Analytics will be available once your site is deployed'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isDeployed ? (
					<div className='space-y-6'>
						{/* Summary metrics */}
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							<div className='bg-muted/30 p-4 rounded-lg'>
								<div className='text-sm text-muted-foreground mb-1'>
									Page Views
								</div>
								<div className='text-2xl font-bold'>
									{pageviews?.toLocaleString()}
								</div>
								<div className='text-xs text-green-600 flex items-center mt-1'>
									<ArrowRight className='h-3 w-3 rotate-45 mr-1' />
									12% increase
								</div>
							</div>

							<div className='bg-muted/30 p-4 rounded-lg'>
								<div className='text-sm text-muted-foreground mb-1'>
									Unique Visitors
								</div>
								<div className='text-2xl font-bold'>
									{uniqueVisitors?.toLocaleString()}
								</div>
								<div className='text-xs text-green-600 flex items-center mt-1'>
									<ArrowRight className='h-3 w-3 rotate-45 mr-1' />
									8% increase
								</div>
							</div>

							<div className='bg-muted/30 p-4 rounded-lg col-span-2 md:col-span-1'>
								<div className='text-sm text-muted-foreground mb-1'>
									Traffic Sources
								</div>
								<div className='text-base font-bold mt-1'>
									<div className='flex items-center justify-between'>
										<div>Search</div>
										<div>48%</div>
									</div>
									<div className='flex items-center justify-between'>
										<div>Direct</div>
										<div>36%</div>
									</div>
									<div className='flex items-center justify-between'>
										<div>Social</div>
										<div>16%</div>
									</div>
								</div>
							</div>
						</div>

						{/* Visitors Chart */}
						<VisitorChart visitorData={visitorData} />
					</div>
				) : (
					<div className='bg-muted/20 border-2 border-dashed border-muted rounded-lg p-8 flex flex-col items-center justify-center'>
						<BarChart3 className='h-16 w-16 text-muted-foreground opacity-30 mb-4' />
						<h3 className='text-lg font-medium mb-2'>
							Analytics Coming Soon
						</h3>
						<p className='text-muted-foreground text-center mb-6 max-w-md'>
							{isBuilding
								? 'Analytics will be available once your website is deployed and starts receiving traffic.'
								: 'Complete your site requirements to start the development process.'}
						</p>
					
					</div>
				)}
			</CardContent>

			{isDeployed && (
				<CardFooter>
					<Button
						className='w-full sm:w-auto'
						asChild
					>
						<Link href='/user/site/analytics-details'>
							<BarChart3 className='h-4 w-4 mr-2' />
							View Detailed Analytics
						</Link>
					</Button>
				</CardFooter>
			)}
		</Card>
	);
}

// Visitor chart subcomponent
interface VisitorChartProps {
	visitorData?: Array<{ day: string; visitors: number }>;
}

function VisitorChart({ visitorData }: VisitorChartProps) {
	if (!visitorData) return null;

	const maxVisitors = Math.max(...visitorData.map((d) => d.visitors));

	return (
		<div>
			<h3 className='text-sm font-medium mb-3'>Weekly Visitors</h3>
			<div className='h-64 bg-muted/10 border rounded-lg p-4'>
				<div className='h-full flex items-end justify-between gap-2'>
					{visitorData.map((item) => (
						<div
							key={item.day}
							className='flex flex-col items-center flex-1'
						>
							<div
								className='bg-primary/70 rounded-t-sm w-full'
								style={{
									height: `${
										(item.visitors / maxVisitors) * 80
									}%`,
								}}
							></div>
							<div className='text-xs mt-2'>{item.day}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
