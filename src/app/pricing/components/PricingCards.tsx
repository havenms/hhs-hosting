import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { plans } from '../data';
import { useAuth } from '@/components/auth-provider';

interface PricingCardsProps {
	billingInterval: 'monthly' | 'annually';
}

export function PricingCards({ billingInterval }: PricingCardsProps) {
	const { user } = useAuth();

	return (
		<div className='grid md:grid-cols-3 gap-8 mb-16'>
			{plans.map((plan) => (
				<Card
					key={plan.name}
					className={`flex flex-col ${
						plan.popular
							? 'border-2 border-secondary shadow-lg'
							: ''
					}`}
				>
					{plan.popular && (
						<div className='bg-secondary text-secondary-foreground text-center py-1 text-sm font-medium'>
							Most Popular
						</div>
					)}

					<CardHeader>
						<CardTitle className={`text-${plan.color}`}>
							{plan.name}
						</CardTitle>
						<CardDescription>{plan.description}</CardDescription>
						<div className='mt-4'>
							<span className='text-4xl font-bold'>
								{plan.price[billingInterval]}
							</span>
							<span className='text-muted-foreground ml-2'>
								{billingInterval === 'monthly'
									? '/month'
									: '/year'}
							</span>
						</div>

						{billingInterval === 'annually' && (
							<p className='text-sm text-primary mt-1'>
								{plan.savings}
							</p>
						)}
					</CardHeader>

					<CardContent className='flex-grow'>
						<div className='space-y-4'>
							<div>
								<h3 className='text-sm font-medium mb-2'>
									What's included:
								</h3>
								<ul className='space-y-2'>
									{plan.features.map((feature) => (
										<li
											key={feature}
											className='flex items-center'
										>
											<Check className='h-4 w-4 mr-2 text-primary flex-shrink-0' />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</div>

							{plan.limitations.length > 0 && (
								<div>
									<h3 className='text-sm font-medium text-muted-foreground mb-2'>
										Limitations:
									</h3>
									<ul className='space-y-2'>
										{plan.limitations.map((limitation) => (
											<li
												key={limitation}
												className='flex items-start text-sm text-muted-foreground'
											>
												<span className='mr-2'>•</span>
												<span>{limitation}</span>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</CardContent>

					<CardFooter>
						<Button
							className='w-full rounded-full'
							variant={plan.popular ? 'default' : 'outline'}
						>
							{user ? 'Select Plan' : 'Start 14-Day Free Trial'}
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
