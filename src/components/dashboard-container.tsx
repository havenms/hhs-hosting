'use client';

import { useAuth } from '@/hooks/useAuth';
import { Dashboard } from '@/components/dashboard'; // Import the new component
import { AdminDashboard } from '@/components/admin-dashboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function DashboardContainer() {
	const { user, isAdmin, isLoading } = useAuth();
	const [mounted, setMounted] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);

	// Handle redirect for admin users
	useEffect(() => {
		if (mounted && !isLoading) {
			if (!user) {
				router.push('/sign-in');
			} else if (isAdmin) {
				router.push('/admin');
			}
		}
	}, [mounted, isLoading, user, isAdmin, router]);

	// Show loading state
	if (isLoading || !mounted) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='h-8 w-8 animate-spin text-primary' />
			</div>
		);
	}

	// Non-admin users see the user dashboard - now using the new Dashboard component
	return <Dashboard />;
}
