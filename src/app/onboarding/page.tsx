'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function OnboardingPage() {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Redirect if not authenticated
	useEffect(() => {
		if (!isLoading && !user) {
			router.push('/sign-in');
		}
	}, [isLoading, user, router]);

	const handleCompleteOnboarding = async () => {
		setIsSubmitting(true);

		// Here you would typically update user profile or preferences
		// For now, we'll just navigate to dashboard after a short delay
		setTimeout(() => {
			router.push('/dashboard');
		}, 1000);
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<Loader2 className='h-8 w-8 animate-spin text-primary' />
			</div>
		);
	}

	return (
		<div className='container max-w-md mx-auto py-12'>
			<Card>
				<CardHeader>
					<CardTitle>Welcome to HHS Hosting!</CardTitle>
					<CardDescription>
						Let's complete your account setup
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<p>
						Thanks for signing up,{' '}
						{user?.firstName || user?.username || 'New User'}!
					</p>
					<p>
						Your account has been created successfully. We're
						excited to have you join us.
					</p>
				</CardContent>
				<CardFooter>
					<Button
						className='w-full'
						onClick={handleCompleteOnboarding}
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Setting up your account...
							</>
						) : (
							'Continue to Dashboard'
						)}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
