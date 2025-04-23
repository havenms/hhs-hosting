'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { DiscoMode } from '@/components/disco-mode';

// Dummy pricing data
const billingOptions = ['monthly', 'annually'] as const;

const plans = [
	{
		name: 'Starter',
		description: 'Perfect for personal projects and small blogs',
		price: {
			monthly: '$9.99',
			annually: '$99.90',
		},
		savings: '$19.98 saved annually',
		features: [
			'1 website',
			'5GB storage',
			'Free SSL certificate',
			'Basic analytics',
			'Email support',
		],
		limitations: [
			'No custom domains',
			'HHS Hosting subdomain only',
			'No priority support',
		],
		color: 'primary',
		popular: false,
	},
	{
		name: 'Professional',
		description: 'Enhanced tools for growing businesses',
		price: {
			monthly: '$29.99',
			annually: '$299.90',
		},
		savings: '$59.98 saved annually',
		features: [
			'5 websites',
			'25GB storage',
			'Free SSL certificates',
			'Advanced analytics',
			'Priority support',
			'Custom domains',
			'Site backups',
		],
		limitations: ['No white labeling', 'Limited API access'],
		color: 'secondary',
		popular: true,
	},
	{
		name: 'Enterprise',
		description: 'Maximum power for professional organizations',
		price: {
			monthly: '$99.99',
			annually: '$999.90',
		},
		savings: '$199.98 saved annually',
		features: [
			'Unlimited websites',
			'100GB storage',
			'Free SSL certificates',
			'Premium analytics',
			'24/7 dedicated support',
			'Custom domains',
			'White label options',
			'Custom integrations',
			'Advanced security',
			'Dedicated server resources',
		],
		limitations: [],
		color: 'accent',
		popular: false,
	},
];

// Feature comparison table data
const featureComparisonData = [
	{
		category: 'Websites & Storage',
		features: [
			{
				name: 'Number of websites',
				starter: '1',
				professional: '5',
				enterprise: 'Unlimited',
			},
			{
				name: 'Storage space',
				starter: '5GB',
				professional: '25GB',
				enterprise: '100GB',
			},
			{
				name: 'Bandwidth',
				starter: '50GB/month',
				professional: '250GB/month',
				enterprise: '1TB/month',
			},
		],
	},
	{
		category: 'Domain & SSL',
		features: [
			{
				name: 'Free SSL certificate',
				starter: true,
				professional: true,
				enterprise: true,
			},
			{
				name: 'Custom domains',
				starter: false,
				professional: true,
				enterprise: true,
			},
			{
				name: 'Wildcard SSL',
				starter: false,
				professional: false,
				enterprise: true,
			},
		],
	},
	{
		category: 'Support & Security',
		features: [
			{
				name: 'Support response time',
				starter: '24 hours',
				professional: '8 hours',
				enterprise: '1 hour',
			},
			{
				name: 'Dedicated account manager',
				starter: false,
				professional: false,
				enterprise: true,
			},
			{
				name: 'Advanced security',
				starter: false,
				professional: true,
				enterprise: true,
			},
			{
				name: 'Daily backups',
				starter: false,
				professional: true,
				enterprise: true,
			},
		],
	},
	{
		category: 'Features & Tools',
		features: [
			{
				name: 'One-click installations',
				starter: true,
				professional: true,
				enterprise: true,
			},
			{
				name: 'Staging environments',
				starter: false,
				professional: true,
				enterprise: true,
			},
			{
				name: 'Git integration',
				starter: false,
				professional: true,
				enterprise: true,
			},
			{
				name: 'White labeling',
				starter: false,
				professional: false,
				enterprise: true,
			},
			{
				name: 'API access',
				starter: false,
				professional: 'Limited',
				enterprise: 'Full',
			},
		],
	},
];

// Frequently asked questions
const faqs = [
	{
		question: 'Can I upgrade or downgrade my plan at any time?',
		answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated difference for the remainder of your billing cycle. When you downgrade, your new rate will take effect at the start of your next billing cycle.",
	},
	{
		question: 'Is there a setup fee?',
		answer: 'No, there are no setup fees for any of our plans. You can get started immediately after subscribing.',
	},
	{
		question: 'What payment methods do you accept?',
		answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans.',
	},
	{
		question: 'Do you offer a free trial?',
		answer: 'Yes! We offer a 14-day free trial on all plans with no credit card required. You can try all features before committing.',
	},
	{
		question: 'What happens when I reach my storage limit?',
		answer: "When you approach your storage limit, we'll notify you via email. You can either upgrade to a higher plan or remove files to free up space.",
	},
	{
		question: 'Can I cancel my subscription at any time?',
		answer: 'Yes, you can cancel your subscription at any time from your billing settings. There are no cancellation fees.',
	},
];

export default function PricingPage() {
	const [billingInterval, setBillingInterval] =
		useState<(typeof billingOptions)[number]>('monthly');
	const { user, isLoading } = useAuth();

	return (
		<div className='min-h-screen bg-background'>
			<Navbar />

			<DiscoMode
				isLoading={isLoading}
				showButton={true}
			/>

			<main className='container mx-auto py-12 px-4 md:px-6'>
				{/* Hero Section */}
				<div className='mb-16 text-center'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
						Simple,{' '}
						<span className='text-primary'>Transparent</span>{' '}
						Pricing
					</h1>
					<p className='text-xl mb-8 text-muted-foreground max-w-3xl mx-auto'>
						Choose the perfect plan for your needs with no hidden
						fees or surprises. All plans include our award-winning
						mid-century modern inspired hosting platform.
					</p>
				</div>

				{/* Billing Toggle */}
				<div className='flex justify-center mb-12'>
					<Tabs
						defaultValue='monthly'
						value={billingInterval}
						onValueChange={(value) =>
							setBillingInterval(
								value as (typeof billingOptions)[number]
							)
						}
						className='w-full max-w-md'
					>
						<TabsList className='grid grid-cols-2'>
							<TabsTrigger value='monthly'>Monthly</TabsTrigger>
							<TabsTrigger value='annually'>
								Annually
								<span className='ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary'>
									Save 15%
								</span>
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				{/* Pricing Cards */}
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
								<CardDescription>
									{plan.description}
								</CardDescription>
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
												{plan.limitations.map(
													(limitation) => (
														<li
															key={limitation}
															className='flex items-start text-sm text-muted-foreground'
														>
															<span className='mr-2'>
																•
															</span>
															<span>
																{limitation}
															</span>
														</li>
													)
												)}
											</ul>
										</div>
									)}
								</div>
							</CardContent>

							<CardFooter>
								<Button
									className='w-full rounded-full'
									variant={
										plan.popular ? 'default' : 'outline'
									}
								>
									{user
										? 'Select Plan'
										: 'Start 14-Day Free Trial'}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>

				{/* Feature comparison */}
				<div className='mb-16'>
					<h2 className='text-3xl font-bold mb-6 text-center'>
						Feature Comparison
					</h2>
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse'>
							<thead>
								<tr className='border-b border-border'>
									<th className='py-4 px-6 text-left'>
										Feature
									</th>
									<th className='py-4 px-6 text-center'>
										Starter
									</th>
									<th className='py-4 px-6 text-center'>
										Professional
									</th>
									<th className='py-4 px-6 text-center'>
										Enterprise
									</th>
								</tr>
							</thead>
							<tbody>
								{featureComparisonData.map((category) => (
									<React.Fragment key={category.category}>
										<tr className='border-b border-border bg-muted/50'>
											<td
												colSpan={4}
												className='py-3 px-6 font-medium'
											>
												{category.category}
											</td>
										</tr>
										{category.features.map((feature) => (
											<tr
												key={feature.name}
												className='border-b border-border'
											>
												<td className='py-3 px-6'>
													{feature.name}
												</td>
												<td className='py-3 px-6 text-center'>
													{typeof feature.starter ===
													'boolean' ? (
														feature.starter ? (
															<Check className='h-4 w-4 text-primary mx-auto' />
														) : (
															<span className='text-muted-foreground'>
																—
															</span>
														)
													) : (
														feature.starter
													)}
												</td>
												<td className='py-3 px-6 text-center'>
													{typeof feature.professional ===
													'boolean' ? (
														feature.professional ? (
															<Check className='h-4 w-4 text-secondary mx-auto' />
														) : (
															<span className='text-muted-foreground'>
																—
															</span>
														)
													) : (
														feature.professional
													)}
												</td>
												<td className='py-3 px-6 text-center'>
													{typeof feature.enterprise ===
													'boolean' ? (
														feature.enterprise ? (
															<Check className='h-4 w-4 text-accent mx-auto' />
														) : (
															<span className='text-muted-foreground'>
																—
															</span>
														)
													) : (
														feature.enterprise
													)}
												</td>
											</tr>
										))}
									</React.Fragment>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* FAQ Section */}
				<div className='mb-16'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						Frequently Asked Questions
					</h2>
					<div className='grid md:grid-cols-2 gap-8'>
						{faqs.map((faq, index) => (
							<div
								key={index}
								className='space-y-2'
							>
								<h3 className='text-xl font-semibold flex items-center'>
									<HelpCircle className='h-5 w-5 mr-2 text-primary' />
									{faq.question}
								</h3>
								<p className='text-muted-foreground pl-7'>
									{faq.answer}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className='bg-accent/10 p-8 rounded-lg text-center'>
					<h2 className='text-2xl md:text-3xl font-bold mb-4'>
						Need a Custom Solution?
					</h2>
					<p className='mb-6 max-w-xl mx-auto text-muted-foreground'>
						Contact our sales team to create a custom plan tailored
						to your specific needs. Enterprise solutions with
						dedicated resources available.
					</p>
					<div className='flex gap-4 justify-center'>
						<Button
							size='lg'
							className='rounded-full'
							asChild
						>
							<Link href='/support'>Contact Sales</Link>
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='rounded-full'
						>
							View Documentation
						</Button>
					</div>
				</div>
			</main>

			<footer className='bg-muted py-8 px-4 mt-12'>
				<div className='container mx-auto text-center text-muted-foreground'>
					<p>&copy; 2023 HHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
