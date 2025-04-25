'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface UserViewWrapperProps {
	children: ReactNode;
	adminRedirect?: string;
	guestRedirect?: string;
}

export function UserViewWrapper({
	children,
	adminRedirect = '/dashboard',
	guestRedirect = '/',
}: UserViewWrapperProps) {
	const { user, isAdmin, isLoading } = useAuth();
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [isRedirecting, setIsRedirecting] = useState(false);
	const [authChecked, setAuthChecked] = useState(false);

	// Mark when component is mounted
	useEffect(() => {
		setMounted(true);
	}, []);

	// Handle access control and redirections - only after loading completes
	useEffect(() => {
		// Only proceed if auth data is loaded and component is mounted
		if (!isLoading && mounted && !authChecked) {
			setAuthChecked(true);

			if (!user) {
				// Guest user - redirect to home
				console.log('No user, redirecting to:', guestRedirect);
				setIsRedirecting(true);
				router.push(guestRedirect);
			} else if (isAdmin) {
				// Admin user - redirect to dashboard
				console.log('Admin user, redirecting to:', adminRedirect);
				setIsRedirecting(true);
				router.push(adminRedirect);
			}
			// Regular users stay on the page - no redirection needed
		}
	}, [
		user,
		isAdmin,
		isLoading,
		mounted,
		router,
		adminRedirect,
		guestRedirect,
		authChecked,
	]);

	// Initial loading - waiting for auth state
	if (isLoading || !mounted) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center'>
				<Loader2 className='h-10 w-10 text-primary animate-spin mb-4' />
				<p className='text-muted-foreground'>Loading...</p>
			</div>
		);
	}

	// Redirection in progress after auth check completed
	if (isRedirecting) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center'>
				<Loader2 className='h-10 w-10 text-primary animate-spin mb-4' />
				<p className='text-muted-foreground'>Redirecting...</p>
			</div>
		);
	}

	// Auth check completed without redirection - wrong user type
	// This is a fallback that should rarely show (redirection should happen before this)
	if (!user || isAdmin) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center'>
				<p className='text-lg font-medium mb-2'>Access Restricted</p>
				<p className='text-muted-foreground mb-4'>
					{!user
						? 'Please sign in to access this page.'
						: 'This page is for regular users only.'}
				</p>
				<button
					onClick={() =>
						router.push(!user ? guestRedirect : adminRedirect)
					}
					className='text-primary hover:underline'
				>
					{!user ? 'Go to Homepage' : 'Go to Dashboard'}
				</button>
			</div>
		);
	}

	// Render children for regular authenticated users
	return <>{children}</>;
}
