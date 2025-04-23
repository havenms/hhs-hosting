'use client';

import { Zap, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

export function PlatformTab() {
	return (
		<div className='grid md:grid-cols-2 gap-4 sm:gap-8'>
			<div className='order-2 md:order-1'>
				<h2 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>
					Robust Web Hosting Platform
				</h2>
				<p className='text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6'>
					Our infrastructure is built for speed, security, and
					reliability. With data centers around the world, your
					content is delivered quickly to your audience.
				</p>
				<ul className='space-y-3 sm:space-y-4'>
					<FeatureItem
						icon={
							<Zap className='h-4 w-4 sm:h-5 sm:w-5 text-primary' />
						}
						title='99.9% Uptime Guarantee'
						description='Your site stays online, even during traffic spikes.'
						bgColor='bg-primary/10'
					/>
					<FeatureItem
						icon={
							<Clock className='h-4 w-4 sm:h-5 sm:w-5 text-secondary' />
						}
						title='Blazing Fast Load Times'
						description='Optimized servers and CDN integration for speed.'
						bgColor='bg-secondary/10'
					/>
					<FeatureItem
						icon={
							<Shield className='h-4 w-4 sm:h-5 sm:w-5 text-accent' />
						}
						title='Enterprise Security'
						description='DDoS protection, WAF, and free SSL certificates.'
						bgColor='bg-accent/10'
					/>
				</ul>
			</div>
			<div className='order-1 md:order-2 bg-muted p-4 sm:p-8 rounded-lg flex items-center justify-center mb-6 md:mb-0'>
				<div className='w-full md:max-w-md'>
					<div className='rounded-lg overflow-hidden shadow-xl mb-4 sm:mb-6'>
						<Image
							src='/globe.svg'
							alt='Global Server Network'
							width={400}
							height={300}
							className='bg-white w-full h-auto'
						/>
					</div>
					<div className='grid grid-cols-3 gap-2 sm:gap-4 text-center'>
						<StatItem
							value='12'
							label='Global Locations'
							textColor='text-primary'
						/>
						<StatItem
							value='99.9%'
							label='Uptime'
							textColor='text-secondary'
						/>
						<StatItem
							value='24/7'
							label='Monitoring'
							textColor='text-accent'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function FeatureItem({ icon, title, description, bgColor }) {
	return (
		<li className='flex items-start'>
			<div
				className={`mr-3 sm:mr-4 mt-1 ${bgColor} p-1.5 sm:p-2 rounded-full flex-shrink-0`}
			>
				{icon}
			</div>
			<div>
				<h3 className='font-semibold text-base sm:text-lg'>{title}</h3>
				<p className='text-sm sm:text-base text-muted-foreground'>
					{description}
				</p>
			</div>
		</li>
	);
}

function StatItem({ value, label, textColor }) {
	return (
		<div>
			<div className={`text-xl sm:text-3xl font-bold ${textColor}`}>
				{value}
			</div>
			<div className='text-xs sm:text-sm text-muted-foreground'>
				{label}
			</div>
		</div>
	);
}
