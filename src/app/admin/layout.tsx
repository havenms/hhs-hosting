'use client';

import { useAuth } from '@/hooks/useAuth'; // Use the correct import path!
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { AdminDebug } from '@/components/admin-debug';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isAdmin, isLoading } = useAuth(); // Get isLoading from useAuth
	const router = useRouter();

	// Protection at layout level
	useEffect(() => {
		// Only redirect if we've finished loading and the user is definitely not an admin
		if (!isLoading && user && !isAdmin) {
			router.push('/dashboard');
		}
	}, [isLoading, user, isAdmin, router]);

	// Show loading while checking auth (check isLoading from useAuth)
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='h-8 w-8 animate-spin text-primary' />
				<span className='ml-2'>Checking authorization...</span>
			</div>
		);
	}

	// If not authenticated at all, redirect to sign-in
	if (!user) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='h-8 w-8 animate-spin text-primary' />
				<span className='ml-2'>Please sign in to continue...</span>
			</div>
		);
	}

	// If not admin, show access denied (we're redirecting)
	if (!isAdmin) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='h-8 w-8 animate-spin text-primary' />
				<span className='ml-2'>Access denied, redirecting...</span>
			</div>
		);
	}

	// Render children for admin users
	return (
		<>
			{children}
			{process.env.NODE_ENV === 'development' && <AdminDebug />}
		</>
	);
}
