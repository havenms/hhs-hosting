'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/components/auth-provider';
import { DiscoMode } from '@/components/disco-mode';

// Import components
import { PricingHero } from './components/PricingHero';
import { SimplePricingCard } from './components/SimplePricingCard';
import { PricingCTA } from './components/PricingCTA';

export default function PricingPage() {
	const { user, isLoading } = useAuth();

	return (
		<div className='min-h-screen bg-background'>
			<Navbar />
			<DiscoMode
				isLoading={isLoading}
				showButton={true}
			/>

			<main className='container mx-auto py-12 px-4 md:px-6'>
				<PricingHero />
				<SimplePricingCard />
			</main>

			<footer className='bg-muted py-8 px-4 mt-12'>
				<div className='container mx-auto text-center text-muted-foreground'>
					<p>&copy; 2023 HHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
