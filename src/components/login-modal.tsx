'use client';

import { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function LoginModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('sign-in');

	// Shared appearance settings for Clerk components
	const clerkAppearance = {
		elements: {
			rootBox: 'w-full flex justify-center',
			card: 'w-full shadow-none p-0 m-0',
			header: 'hidden',
			footer: 'hidden',
			formButtonPrimary: 'mx-auto',
			formFieldInput: 'max-h-10',
			formFieldLabel: 'text-sm',
			formFieldErrorText: 'text-xs',
			otpCodeFieldInput: 'h-10',
			identityPreviewEditButton: 'h-auto py-1',
			formResendCodeLink: 'text-sm',
			socialButtonsBlockButton: 'max-h-10',
			socialButtonsBlockButtonText: 'text-sm',
			formFieldAction: 'text-xs',
			footerActionLink: 'text-sm',
			card__main: 'p-0 gap-3',
		},
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger asChild>
				<Button
					size='lg'
					className='rounded-full px-8'
				>
					Login
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[450px] w-[95%] p-4 sm:p-6 flex flex-col'>
				<DialogTitle className='sr-only'>
					{activeTab === 'sign-in' ? 'Sign In' : 'Sign Up'}
				</DialogTitle>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className='w-full'
				>
					<TabsList className='grid w-full grid-cols-2 mb-3'>
						<TabsTrigger value='sign-in'>Sign In</TabsTrigger>
						<TabsTrigger value='sign-up'>Sign Up</TabsTrigger>
					</TabsList>

					<TabsContent
						value='sign-in'
						className='mt-0 space-y-0'
					>
						<SignIn
							routing='hash'
							afterSignInUrl='/dashboard'
							appearance={clerkAppearance}
						/>
					</TabsContent>

					<TabsContent
						value='sign-up'
						className='mt-0 space-y-0'
					>
						<SignUp
							routing='hash'
							afterSignUpUrl='/onboarding'
							appearance={clerkAppearance}
						/>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
