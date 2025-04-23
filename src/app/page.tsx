'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import { GuestHomePage } from '@/components/guest-homepage';
import { UserDashboard } from '@/components/user-dashboard';
import { LoadingState } from '@/components/loading-state';
import { DiscoMode } from '@/components/disco-mode';

export default function Home() {
	const { user, isLoading } = useAuth();

	// Using isLoading from auth for disco mode
	// This will automatically handle the fade-out transition
	// after loading completes (via the 2-second delay)

	if (isLoading) {
		return <LoadingState />;
	}

	// Show different homepage based on authentication status
	return (
		<>
			{/* DiscoMode aware of loading state */}
			<DiscoMode
				isLoading={isLoading}
				showButton={true}
			/>

			{/* Content */}
			{user ? <UserDashboard /> : <GuestHomePage />}
		</>
	);
}
