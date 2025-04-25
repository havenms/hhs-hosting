'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { ExternalLink, Users } from 'lucide-react';

// Page Traffic Table Component
export function PageTrafficTable() {
	return (
		<div>
			<h3 className='text-sm font-medium mb-3'>Top Pages</h3>
			<div className='border rounded-lg overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-muted/50 text-xs'>
						<tr>
							<th className='text-left p-2'>Page</th>
							<th className='text-right p-2'>Views</th>
						</tr>
					</thead>
					<tbody className='text-sm'>
						<tr className='border-t'>
							<td className='p-2'>Homepage</td>
							<td className='text-right p-2'>523</td>
						</tr>
						<tr className='border-t'>
							<td className='p-2'>About</td>
							<td className='text-right p-2'>248</td>
						</tr>
						<tr className='border-t'>
							<td className='p-2'>Services</td>
							<td className='text-right p-2'>187</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

// Device Breakdown Component
export function DeviceBreakdown() {
	return (
		<div>
			<h3 className='text-sm font-medium mb-3'>Device Breakdown</h3>
			<div className='border rounded-lg p-4'>
				<div className='space-y-2'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<div className='w-3 h-3 rounded-full bg-blue-500 mr-2'></div>
							<span>Mobile</span>
						</div>
						<div>58%</div>
					</div>
					<div className='w-full bg-muted/30 rounded-full h-1'>
						<div
							className='bg-blue-500 h-1 rounded-full'
							style={{ width: '58%' }}
						></div>
					</div>

					<div className='flex items-center justify-between mt-3'>
						<div className='flex items-center'>
							<div className='w-3 h-3 rounded-full bg-purple-500 mr-2'></div>
							<span>Desktop</span>
						</div>
						<div>34%</div>
					</div>
					<div className='w-full bg-muted/30 rounded-full h-1'>
						<div
							className='bg-purple-500 h-1 rounded-full'
							style={{ width: '34%' }}
						></div>
					</div>

					<div className='flex items-center justify-between mt-3'>
						<div className='flex items-center'>
							<div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
							<span>Tablet</span>
						</div>
						<div>8%</div>
					</div>
					<div className='w-full bg-muted/30 rounded-full h-1'>
						<div
							className='bg-green-500 h-1 rounded-full'
							style={{ width: '8%' }}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Visitor Insights Component
export function VisitorInsights() {
	return (
		<Card className='md:col-span-2'>
			<CardHeader>
				<CardTitle>Visitor Insights</CardTitle>
				<CardDescription>
					Learn more about your audience
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex items-center justify-center'>
					<div className='bg-muted/20 border rounded-lg p-6 text-center w-full'>
						<Users className='h-10 w-10 mx-auto text-muted-foreground opacity-50 mb-3' />
						<h3 className='font-medium mb-1'>
							Connected with Google Analytics
						</h3>
						<p className='text-sm text-muted-foreground mb-4'>
							Your site is connected to Google Analytics for
							detailed visitor tracking.
						</p>
						<Button
							variant='outline'
							size='sm'
						>
							View in Google Analytics
							<ExternalLink className='h-3 w-3 ml-2' />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
