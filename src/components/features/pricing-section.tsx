'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export function PricingSection({ plans }) {
	return (
		<div className='mb-8 sm:mb-12 lg:mb-16'>
			<h2 className='text-2xl sm:text-3xl font-bold mb-2 text-center'>
				Hosting Plans
			</h2>
			<p className='text-base sm:text-xl text-muted-foreground text-center mb-6 sm:mb-8'>
				Choose the perfect plan for your needs
			</p>
			<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
				{plans.map((plan) => (
					<PricingCard
						key={plan.name}
						plan={plan}
					/>
				))}
			</div>
		</div>
	);
}

function PricingCard({ plan }) {
	return (
		<Card
			className={`${
				plan.popular ? 'border-primary border-2 shadow-md' : ''
			} h-full flex flex-col`}
		>
			{plan.popular && (
				<div className='bg-primary text-primary-foreground text-center py-1 text-xs sm:text-sm font-medium'>
					Most Popular
				</div>
			)}
			<CardHeader>
				<CardTitle className={plan.color}>{plan.name}</CardTitle>
				<div className='mt-2'>
					<span className='text-2xl sm:text-3xl font-bold'>
						{plan.price}
					</span>
					<span className='text-xs sm:text-sm text-muted-foreground'>
						{' '}
						{plan.period}
					</span>
				</div>
				<CardDescription className='text-xs sm:text-sm'>
					{plan.description}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-grow flex flex-col'>
				<ul className='space-y-2 mb-6 flex-grow'>
					{plan.features.map((feature) => (
						<li
							key={feature}
							className='flex items-center text-xs sm:text-sm'
						>
							<Check className='h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0' />
							<span>{feature}</span>
						</li>
					))}
				</ul>
				<Button className='w-full rounded-full mt-auto text-xs sm:text-sm'>
					Get Started
				</Button>
			</CardContent>
		</Card>
	);
}
