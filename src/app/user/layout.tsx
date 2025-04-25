'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { UserNavbar } from '@/components/user-navbar';

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isAdmin, isLoading } = useAuth();
	const router = useRouter();

	// Protection at layout level
	useEffect(() => {
		if (!isLoading) {
			// Not logged in - redirect to home
			if (!user) {
				router.push('/');
				return;
			}

			// Admin users - redirect to admin dashboard
			if (isAdmin) {
				router.push('/admin');
				return;
			}
		}
	}, [isLoading, user, isAdmin, router]);

	// Loading state
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='h-8 w-8 animate-spin text-primary mr-2' />
				<span>Checking access...</span>
			</div>
		);
	}

	// Access denied states
	if (!user) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='h-8 w-8 animate-spin text-primary mr-2' />
				<span>Redirecting to login...</span>
			</div>
		);
	}

	if (isAdmin) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='h-8 w-8 animate-spin text-primary mr-2' />
				<span>Redirecting to admin dashboard...</span>
			</div>
		);
	}

	// Render for regular users
	return (
		<>
			<UserNavbar />
			<main className='min-h-screen bg-background'>{children}</main>
		</>
	);
}
