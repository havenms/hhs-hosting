// src/components/dashboard/status-banners/BuildingBanner.tsx
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, FileText, LifeBuoy } from 'lucide-react';

interface BuildingBannerProps {
	domain: string;
}

export function BuildingBanner({ domain }: BuildingBannerProps) {
	return (
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
					Your site is currently being built. Here's your temporary
					URL:
				</CardDescription>
				<p className='mt-2 font-mono text-sm bg-background px-3 py-2 rounded border'>
					{domain}
				</p>
			</CardHeader>
			<CardContent className='pt-6'>
				<div className='grid gap-6'>
					
					<div>
						<h3 className='text-lg font-medium mb-3'>Need Help?</h3>
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
	);
}
