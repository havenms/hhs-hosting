// src/components/dashboard/status-banners/PreBuildBanner.tsx
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

export function PreBuildBanner() {
	return (
		<Card className='border-secondary'>
			<CardHeader className='bg-secondary/10 border-b border-secondary/20'>
				<Badge
					variant='outline'
					className='mb-2 bg-secondary/20 text-secondary border-secondary w-fit'
				>
					Getting Started
				</Badge>
				<CardTitle className='text-2xl'>
					Welcome to HHS Hosting!
				</CardTitle>
				<CardDescription>
					Let's get started building your WordPress site.
				</CardDescription>
			</CardHeader>
			<CardContent className='pt-6'>
				<div className='grid md:grid-cols-2 gap-6'>
					<div>
						<h3 className='text-lg font-medium mb-3'>Next Steps</h3>
						<div className='space-y-4'>
							<Button
								className='w-full sm:w-auto rounded-full'
								asChild
							>
								<Link href='/site-requirements'>
									<FileText className='mr-2 h-4 w-4' />
									Submit Site Requirements
								</Link>
							</Button>
							<Button
								className='w-full sm:w-auto rounded-full'
								variant='outline'
								asChild
							>
								<Link href='/schedule'>
									<Calendar className='mr-2 h-4 w-4' />
									Schedule Consultation
								</Link>
							</Button>
						</div>
					</div>

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
