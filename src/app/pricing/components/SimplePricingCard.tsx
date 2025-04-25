import { Check, Shield, Globe, Clock, Zap, Activity, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';

export function SimplePricingCard() {
	const { user } = useAuth();

	const features = [
		{
			icon: <Globe className='h-4 w-4 text-primary mr-2' />,
			text: 'Edge content delivery with global CDN',
		},
		{
			icon: <Clock className='h-4 w-4 text-primary mr-2' />,
			text: '24/7 WordPress technical expertise',
		},
		{
			icon: <Activity className='h-4 w-4 text-primary mr-2' />,
			text: 'Managed WP, PHP & MySQL updates',
		},
		{
			icon: <Shield className='h-4 w-4 text-primary mr-2' />,
			text: 'Proactive WordPress security',
		},
		{
			icon: <Activity className='h-4 w-4 text-primary mr-2' />,
			text: 'Site monitoring alerts',
		},
		{
			icon: <Zap className='h-4 w-4 text-primary mr-2' />,
			text: 'Auto plugin & theme management',
		},
		{
			icon: <Zap className='h-4 w-4 text-primary mr-2' />,
			text: 'Optimal front & backend performance',
		},
	];

	const limits = [
		{ value: '75,000', label: 'Visits/mo' },
		{ value: '15 GB', label: 'Storage' },
		{ value: '150 GB', label: 'Bandwidth/mo' },
	];

	return (
		<div className='mb-16'>
			<div className='flex justify-center'>
				<Card className='w-full max-w-md border-2 border-primary shadow-lg'>
					<div className='bg-primary text-primary-foreground text-center py-2 text-sm font-medium'>
						Managed WordPress Hosting
					</div>

					<CardHeader className='text-center'>
						<CardTitle className='text-3xl font-bold mb-4'>
							Professional Plan
						</CardTitle>
						<div className='flex items-center justify-center mb-2'>
							<span className='text-4xl font-bold'>$29.99</span>
							<span className='text-muted-foreground ml-2'>
								/month
							</span>
						</div>
					</CardHeader>

					<CardContent>
						{/* Resource Limits */}
						<div className='flex justify-between mb-6 border-b border-border pb-6'>
							{limits.map((limit, index) => (
								<div
									key={index}
									className='text-center'
								>
									<div className='text-xl font-bold'>
										{limit.value}
									</div>
									<div className='text-xs text-muted-foreground'>
										{limit.label}
									</div>
								</div>
							))}
						</div>

						{/* Features List */}
						<div>
							<h3 className='font-medium mb-3'>
								Everything you need:
							</h3>
							<ul className='space-y-3'>
								{features.map((feature, index) => (
									<li
										key={index}
										className='flex items-center'
									>
										{feature.icon}
										<span>{feature.text}</span>
									</li>
								))}
							</ul>
						</div>
					</CardContent>

					<CardFooter className='flex flex-col space-y-4'>
						<Button
							className='w-full rounded-full'
							size='lg'
						>
							{user ? 'Select Plan' : 'Start 14-Day Free Trial'}
						</Button>
						<div className='text-xs text-center text-muted-foreground'>
							No credit card required for trial. Cancel anytime.
						</div>
					</CardFooter>
				</Card>
			</div>

			
		</div>
	);
}
