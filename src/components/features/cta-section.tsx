'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
	return (
		<div className='bg-accent/10 p-4 sm:p-8 rounded-lg text-center'>
			<h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4'>
				Ready to Experience Modern Hosting?
			</h2>
			<p className='mb-4 sm:mb-6 max-w-xl mx-auto text-sm sm:text-base text-muted-foreground'>
				Join thousands of satisfied customers who trust HHS Hosting for
				their web presence. Get started today with our 14-day free
				trial.
			</p>
			<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
				<Button
					size='lg'
					className='rounded-full text-sm sm:text-base'
				>
					Start Free Trial
				</Button>
				<Button
					size='lg'
					variant='outline'
					className='rounded-full text-sm sm:text-base'
					asChild
				>
					<Link href='/support'>Contact Sales</Link>
				</Button>
			</div>
		</div>
	);
}
