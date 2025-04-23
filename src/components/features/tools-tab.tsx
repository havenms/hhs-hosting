'use client';

import { Code, Server, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

// Re-use the FeatureItem component here as well
function FeatureItem({ icon, title, description, bgColor }) {
	return (
		<li className='flex items-start'>
			<div
				className={`mr-3 sm:mr-4 mt-1 ${bgColor} p-1.5 sm:p-2 rounded-full flex-shrink-0`}
			>
				{icon}
			</div>
			<div>
				<h4 className='font-semibold text-base'>{title}</h4>
				<p className='text-sm sm:text-base text-muted-foreground'>
					{description}
				</p>
			</div>
		</li>
	);
}

export function ToolsTab({ templates }) {
	return (
		<div className='space-y-8 sm:space-y-12'>
			{/* Templates Section */}
			<div>
				<h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center'>
					Ready-to-Deploy Templates
				</h2>
				<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
					{templates.map((template) => (
						<TemplateCard
							key={template.id}
							template={template}
						/>
					))}
				</div>
			</div>

			{/* Dev Tools Section */}
			<div className='grid md:grid-cols-2 gap-4 sm:gap-8'>
				<div>
					<h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
						Development Tools
					</h3>
					<ul className='space-y-3 sm:space-y-4'>
						<FeatureItem
							icon={
								<Code className='h-4 w-4 sm:h-5 sm:w-5 text-primary' />
							}
							title='One-Click Installations'
							description='WordPress, Joomla, and more with a single click.'
							bgColor='bg-primary/10'
						/>
						<FeatureItem
							icon={
								<Server className='h-4 w-4 sm:h-5 sm:w-5 text-secondary' />
							}
							title='Git Integration'
							description='Push to deploy with built-in Git workflow.'
							bgColor='bg-secondary/10'
						/>
						<FeatureItem
							icon={
								<Globe className='h-4 w-4 sm:h-5 sm:w-5 text-accent' />
							}
							title='Custom Domain Management'
							description='Connect any domain with easy DNS management.'
							bgColor='bg-accent/10'
						/>
					</ul>
				</div>
				<div className='bg-muted rounded-lg p-4 sm:p-6'>
					<h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
						Site Editor
					</h3>
					<div className='rounded bg-background p-3 sm:p-4 mb-3 sm:mb-4 font-mono text-xs sm:text-sm'>
						<div className='text-green-500'>
							// Example: Quick site customization
						</div>
						<div className='text-muted-foreground'>
							const site = new HHSHosting.Site('my-awesome-site');
						</div>
						<div className='text-muted-foreground'>
							site.setTheme('midcentury-modern');
						</div>
						<div className='text-muted-foreground'>
							site.addFeature('contact-form');
						</div>
						<div className='text-muted-foreground'>
							site.deploy();
						</div>
					</div>
					<p className='text-xs sm:text-sm text-muted-foreground'>
						Our visual editor makes it easy to build and customize
						your site without coding. For developers, we provide
						full access to the codebase.
					</p>
				</div>
			</div>

			{/* WordPress Integration */}
			<div className='grid md:grid-cols-2 gap-4 sm:gap-8'>
				<div>
					<h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
						WordPress Integration
					</h3>
					<ul className='space-y-3 sm:space-y-4'>
						<FeatureItem
							icon={
								<Code className='h-4 w-4 sm:h-5 sm:w-5 text-primary' />
							}
							title='Custom WordPress Setup'
							description='Pre-configured with essential plugins and optimized settings.'
							bgColor='bg-primary/10'
						/>
						<FeatureItem
							icon={
								<Lock className='h-4 w-4 sm:h-5 sm:w-5 text-secondary' />
							}
							title='Secure Single Sign-On'
							description='Token-based WordPress login with JWT for seamless access.'
							bgColor='bg-secondary/10'
						/>
						<FeatureItem
							icon={
								<Globe className='h-4 w-4 sm:h-5 sm:w-5 text-accent' />
							}
							title='Domain Integration'
							description='Connect your existing domain or get a new one through us.'
							bgColor='bg-accent/10'
						/>
					</ul>
				</div>
			</div>
		</div>
	);
}

function TemplateCard({ template }) {
	return (
		<Card className='overflow-hidden border-2 hover:border-primary transition-colors h-full'>
			<div className='aspect-video bg-muted flex items-center justify-center p-4 sm:p-6'>
				<Image
					src={template.image}
					alt={template.name}
					width={200}
					height={150}
					className='max-w-full h-auto'
				/>
			</div>
			<CardHeader className='pb-2'>
				<CardTitle className='text-lg'>{template.name}</CardTitle>
				<CardDescription className='text-sm'>
					{template.description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex justify-between items-center'>
					<div className='text-xs sm:text-sm text-muted-foreground'>
						Popularity: {template.popularity}%
					</div>
					<Button
						variant='outline'
						size='sm'
						className='text-xs'
					>
						Preview
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
