'use client';

import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { AreaChart, MapPin, Activity, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { StatsCard } from './shared/StatsCard';



export function SiteAnalytics() {
	const [timeRange, setTimeRange] = useState('7d');

	// Mock data for charts
	

	return (
		<section className='mb-8 animate-fadeIn'>
			<Card className='overflow-hidden border shadow-sm'>
				<CardHeader className='flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 bg-muted/20 pb-4'>
					<div>
						<CardTitle className='text-lg md:text-xl font-semibold flex items-center'>
							<Activity className='mr-2 h-5 w-5 text-primary' />
							Site Analytics
						</CardTitle>
						<CardDescription className='text-sm md:text-base'>
							View your website&apos;s performance metrics
						</CardDescription>
					</div>
					<div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0'>
						<Select
							value={timeRange}
							onValueChange={setTimeRange}
						>
							<SelectTrigger className='w-full sm:w-[140px]'>
								<SelectValue placeholder='Time range' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='7d'>Last 7 days</SelectItem>
								<SelectItem value='30d'>
									Last 30 days
								</SelectItem>
								<SelectItem value='90d'>
									Last 90 days
								</SelectItem>
								<SelectItem value='12m'>
									Last 12 months
								</SelectItem>
							</SelectContent>
						</Select>
						<Button
							size='sm'
							variant='outline'
							className='flex items-center justify-center'
						>
							<Download className='h-4 w-4 mr-2' />
							<span>Export</span>
						</Button>
					</div>
				</CardHeader>

				<CardContent className='space-y-6 pt-6'>
					{/* Stats Overview - Responsive grid with increasing columns by breakpoint */}
					<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
						<StatsCard
							title='Page Views'
							value='4,269'
							change='+12.6%'
							trendUp={true}
							icon={
								<AreaChart className='h-4 w-4 text-blue-500' />
							}
						/>
						<StatsCard
							title='Unique Visitors'
							value='1,847'
							change='+9.3%'
							trendUp={true}
							icon={<Users className='h-4 w-4 text-indigo-500' />}
						/>
						<StatsCard
							title='Avg. Time on Site'
							value='2:34'
							change='+0:15'
							trendUp={true}
							icon={
								<Activity className='h-4 w-4 text-green-500' />
							}
						/>
						<StatsCard
							title='Bounce Rate'
							value='32.1%'
							change='-4.3%'
							trendUp={false}
							icon={<MapPin className='h-4 w-4 text-amber-500' />}
						/>
					</div>

					
				</CardContent>
			</Card>
		</section>
	);
}
