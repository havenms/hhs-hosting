// src/components/clerk-provider-wrapper.tsx
'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function ClerkProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	if (!publishableKey) {
		console.error('Missing Publishable Key');
		return (
			<div>Error loading authentication. Please check the console.</div>
		);
	}

	return (
		<ClerkProvider
			publishableKey={publishableKey}
			appearance={{
				variables: { colorPrimary: '#008891' },
			}}
			navigate={(to) => router.push(to)}
		>
			{children}
		</ClerkProvider>
	);
}
