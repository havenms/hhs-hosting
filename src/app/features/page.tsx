'use client';

import { Navbar } from '@/components/navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroSection } from '@/components/features/hero-section';
import { PlatformTab } from '@/components/features/platform-tab';
import { ToolsTab } from '@/components/features/tools-tab';
import { ProcessTab } from '@/components/features/process-tab';
import { PricingSection } from '@/components/features/pricing-section';
import { CTASection } from '@/components/features/cta-section';
import { BarChart3, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button'

// Dummy feature data
const featureCategories = [
	{
		id: 'platform',
		name: 'Platform',
		description: 'Modern hosting infrastructure designed for performance',
	},
	{
		id: 'tools',
		name: 'Tools',
		description: 'Powerful developer tools to build your perfect site',
	},
	{
		id: 'analytics',
		name: 'Analytics',
		description: 'Data-driven insights to grow your web presence',
	},
	{
		id: 'support',
		name: 'Support',
		description: '24/7 expert assistance when you need it most',
	},
	{
		id: 'process',
		name: 'Process',
		description: 'Our streamlined approach to building your custom site',
	},
];

// Dummy template data
const templates = [
	{
		id: 'template-1',
		name: 'Business Portfolio',
		description: 'Perfect for small businesses and freelancers',
		image: '/window.svg',
		popularity: 92,
	},
	{
		id: 'template-2',
		name: 'E-Commerce Store',
		description: 'Ready-to-go online shop with payment processing',
		image: '/globe.svg',
		popularity: 88,
	},
	{
		id: 'template-3',
		name: 'Personal Blog',
		description: 'Clean, minimalist design focused on content',
		image: '/file.svg',
		popularity: 79,
	},
];

// Dummy plan data
const plans = [
	{
		name: 'Starter',
		price: '$9.99',
		period: 'per month',
		description: 'Perfect for personal projects and small blogs',
		features: [
			'1 website',
			'5GB storage',
			'Free SSL certificate',
			'Basic analytics',
			'Email support',
		],
		color: 'text-primary',
	},
	{
		name: 'Professional',
		price: '$29.99',
		period: 'per month',
		description: 'Enhanced tools for growing businesses',
		features: [
			'5 websites',
			'25GB storage',
			'Free SSL certificates',
			'Advanced analytics',
			'Priority support',
			'Custom domains',
		],
		color: 'text-secondary',
		popular: true,
	},
	{
		name: 'Enterprise',
		price: '$99.99',
		period: 'per month',
		description: 'Maximum power for professional organizations',
		features: [
			'Unlimited websites',
			'100GB storage',
			'Free SSL certificates',
			'Premium analytics',
			'24/7 dedicated support',
			'Custom domains',
			'White label options',
			'Custom integrations',
		],
		color: 'text-accent',
	},
];

export default function FeaturesPage() {
	return (
		<div className='min-h-screen bg-background'>
			<Navbar />

			<main className='container mx-auto py-8 sm:py-12 px-4 sm:px-6'>
				{/* Hero Section */}
				<HeroSection />

				{/* Feature Categories Tabs */}
				<Tabs
					defaultValue='platform'
					className='mb-8 sm:mb-12 lg:mb-16'
				>
					<TabsList className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6 sm:mb-8 overflow-x-auto'>
						{featureCategories.map((category) => (
							<TabsTrigger
								key={category.id}
								value={category.id}
								className='text-xs sm:text-sm md:text-base py-2 sm:py-3'
							>
								<span className='hidden sm:inline'>
									{category.name}
								</span>
								<span className='sm:hidden'>
									{category.name.substring(0, 4)}...
								</span>
							</TabsTrigger>
						))}
					</TabsList>

					{/* Platform Features */}
					<TabsContent
						value='platform'
						className='mt-4'
					>
						<PlatformTab />
					</TabsContent>

					{/* Tools Features */}
					<TabsContent
						value='tools'
						className='mt-4'
					>
						<ToolsTab templates={templates} />
					</TabsContent>

					{/* Analytics Features */}
					<TabsContent
						value='analytics'
						className='mt-4'
					>
						<div className='grid md:grid-cols-2 gap-4 sm:gap-8'>
							<div>
								<h2 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>
									Real-Time Analytics
								</h2>
								<p className='text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6'>
									Monitor your site's performance, traffic,
									and user behavior with our comprehensive
									analytics dashboard.
								</p>
							</div>
							<div className='bg-muted p-4 sm:p-6 rounded-lg'>
								<h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
									Sample Analytics Dashboard
								</h3>
								<div className='text-center mt-4'>
									<Button className='rounded-full text-xs sm:text-sm'>
										<BarChart3 className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
										View Demo Dashboard
									</Button>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Support Features */}
					<TabsContent
						value='support'
						className='mt-4'
					>
						<div className='grid md:grid-cols-2 gap-4 sm:gap-8'>
							<div>
								<h2 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>
									Expert Support
								</h2>
								<p className='text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6'>
									Our team of hosting specialists is available
									24/7 to help you with any questions or
									issues.
								</p>
							</div>
							<div className='bg-muted p-4 sm:p-6 rounded-lg'>
								<h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
									Customer Satisfaction
								</h3>
								<div className='mt-4 sm:mt-6 text-center'>
									<Button
										variant='outline'
										className='rounded-full text-xs sm:text-sm'
									>
										<LifeBuoy className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
										View Support Options
									</Button>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Process/Timeline Features */}
					<TabsContent
						value='process'
						className='mt-4'
					>
						<ProcessTab />
					</TabsContent>
				</Tabs>

				{/* Pricing Plans */}
				<PricingSection plans={plans} />

				{/* CTA Section */}
				<CTASection />
			</main>

			<footer className='bg-muted py-6 sm:py-8 px-4 mt-8 sm:mt-12'>
				<div className='container mx-auto text-center text-muted-foreground text-xs sm:text-sm'>
					<p>&copy; 2023 HHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
