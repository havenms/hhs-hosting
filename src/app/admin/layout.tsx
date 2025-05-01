'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { AdminDebug } from './components/admin-debug';
import { AdminNavbar } from './components/admin-navbar'; // Import the navbar
import { AdminSidebar } from './components/admin-sidebar'; // Import the sidebar

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isAdmin, isLoading } = useAuth();
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

	// Render layout with navbar, sidebar and children for admin users
	return (
		<div className='min-h-screen bg-background flex flex-col'>
			{/* Add the UserNavbar at the top */}
			<AdminNavbar />

			{/* Create a flex container for sidebar and main content */}
			<div className='flex flex-1'>
				{/* Add AdminSidebar */}
				<AdminSidebar />

				{/* Main content area */}
				<main className='flex-1 p-4 md:p-6 overflow-auto'>
					{children}
				</main>
			</div>

			{process.env.NODE_ENV === 'development' && <AdminDebug />}
		</div>
	);
}
