'use client';

import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, DonutChart } from '@tremor/react';
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

interface SiteAnalyticsProps {
	visitors: any;
}

export function SiteAnalytics({ visitors }: SiteAnalyticsProps) {
	const [timeRange, setTimeRange] = useState('7d');

	// Mock data for charts
	const pageViewData = [
		{ date: 'Apr 04', views: 621 },
		{ date: 'Apr 05', views: 713 },
		{ date: 'Apr 06', views: 589 },
		{ date: 'Apr 07', views: 627 },
		{ date: 'Apr 08', views: 824 },
		{ date: 'Apr 09', views: 923 },
		{ date: 'Apr 10', views: 972 },
	];

	const trafficSourceData = [
		{ source: 'Direct', visitors: 456 },
		{ source: 'Search', visitors: 351 },
		{ source: 'Social', visitors: 271 },
		{ source: 'Referral', visitors: 191 },
		{ source: 'Email', visitors: 91 },
	];

	const deviceData = [
		{ name: 'Mobile', value: 58 },
		{ name: 'Desktop', value: 34 },
		{ name: 'Tablet', value: 8 },
	];

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
							View your website's performance metrics
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

					{/* Responsive Tabs */}
					<Tabs
						defaultValue='overview'
						className='space-y-4'
					>
						<div className='overflow-x-auto -mx-6 px-6'>
							<TabsList className='w-full sm:w-auto flex flex-nowrap'>
								<TabsTrigger
									value='overview'
									className='flex-1 sm:flex-initial'
								>
									Overview
								</TabsTrigger>
								<TabsTrigger
									value='traffic'
									className='flex-1 sm:flex-initial'
								>
									Traffic Sources
								</TabsTrigger>
								<TabsTrigger
									value='pages'
									className='flex-1 sm:flex-initial'
								>
									Top Pages
								</TabsTrigger>
								<TabsTrigger
									value='devices'
									className='flex-1 sm:flex-initial'
								>
									Devices
								</TabsTrigger>
							</TabsList>
						</div>

						<TabsContent
							value='overview'
							className='space-y-4 mt-4'
						>
							<div className='bg-card rounded-lg border p-4'>
								<div className='font-semibold text-sm mb-3'>
									Page Views
								</div>
								<div className='h-60 sm:h-72 md:h-80 lg:h-96'>
									<LineChart
										data={pageViewData}
										index='date'
										categories={['views']}
										colors={['blue']}
										valueFormatter={(value) =>
											`${value} views`
										}
										showLegend={false}
										yAxisWidth={40}
										showAnimation={true}
									/>
								</div>
							</div>
						</TabsContent>

						<TabsContent
							value='traffic'
							className='space-y-4 mt-4'
						>
							<div className='bg-card rounded-lg border p-4'>
								<div className='font-semibold text-sm mb-3'>
									Traffic Sources
								</div>
								<div className='h-60 sm:h-72 md:h-80 lg:h-96'>
									<BarChart
										data={trafficSourceData}
										index='source'
										categories={['visitors']}
										colors={['indigo']}
										valueFormatter={(value) =>
											`${value} visitors`
										}
										yAxisWidth={40}
										showAnimation={true}
									/>
								</div>
							</div>
						</TabsContent>

						<TabsContent
							value='pages'
							className='mt-4'
						>
							<div className='overflow-x-auto rounded-lg border'>
								<table className='w-full'>
									<thead>
										<tr className='border-b bg-muted/50'>
											<th className='text-left p-3 font-medium'>
												Page
											</th>
											<th className='text-right p-3 font-medium'>
												Views
											</th>
											<th className='text-right p-3 font-medium'>
												Avg. Time
											</th>
										</tr>
									</thead>
									<tbody className='divide-y'>
										<tr className='hover:bg-muted/30 transition-colors'>
											<td className='p-3 font-medium'>
												Homepage
											</td>
											<td className='text-right p-3'>
												1,243
											</td>
											<td className='text-right p-3'>
												1:32
											</td>
										</tr>
										<tr className='hover:bg-muted/30 transition-colors'>
											<td className='p-3 font-medium'>
												About Us
											</td>
											<td className='text-right p-3'>
												892
											</td>
											<td className='text-right p-3'>
												2:15
											</td>
										</tr>
										<tr className='hover:bg-muted/30 transition-colors'>
											<td className='p-3 font-medium'>
												Services
											</td>
											<td className='text-right p-3'>
												756
											</td>
											<td className='text-right p-3'>
												3:42
											</td>
										</tr>
										<tr className='hover:bg-muted/30 transition-colors'>
											<td className='p-3 font-medium'>
												Contact
											</td>
											<td className='text-right p-3'>
												621
											</td>
											<td className='text-right p-3'>
												1:17
											</td>
										</tr>
										<tr className='hover:bg-muted/30 transition-colors'>
											<td className='p-3 font-medium'>
												Blog
											</td>
											<td className='text-right p-3'>
												457
											</td>
											<td className='text-right p-3'>
												4:05
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</TabsContent>

						<TabsContent
							value='devices'
							className='space-y-4 mt-4'
						>
							<div className='bg-card rounded-lg border p-4'>
								<div className='font-semibold text-sm mb-3'>
									Device Distribution
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='h-60 sm:h-72'>
										<DonutChart
											data={deviceData}
											category='value'
											index='name'
											valueFormatter={(value) =>
												`${value}%`
											}
											colors={['blue', 'cyan', 'indigo']}
											showAnimation={true}
										/>
									</div>
									<div className='flex flex-col justify-center'>
										<ul className='space-y-4'>
											{deviceData.map((device) => (
												<li
													key={device.name}
													className='flex items-center justify-between'
												>
													<div className='flex items-center'>
														<div
															className={`w-3 h-3 rounded-full mr-2 ${
																device.name ===
																'Mobile'
																	? 'bg-blue-500'
																	: device.name ===
																	  'Desktop'
																	? 'bg-cyan-500'
																	: 'bg-indigo-500'
															}`}
														></div>
														<span className='font-medium'>
															{device.name}
														</span>
													</div>
													<span className='font-bold'>
														{device.value}%
													</span>
												</li>
											))}
										</ul>
										<p className='text-sm text-muted-foreground mt-4'>
											Mobile users make up the majority of
											your site visitors. Ensure your site
											is optimized for mobile devices.
										</p>
									</div>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</section>
	);
}
