'use client';

import { useUser } from '@clerk/nextjs';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export function BillingDebug() {
	const { user } = useUser();
	const { isLoading } = useAuth();
	const [visible, setVisible] = useState(true);

	if (process.env.NODE_ENV !== 'development' || !visible) return null;

	return (
		<div className='fixed bottom-4 left-4 bg-black/80 text-white p-4 text-xs rounded-lg shadow-lg z-50 max-w-xs'>
			<div className='flex justify-between mb-2'>
				<span className='font-bold'>Billing Debug</span>
				<button onClick={() => setVisible(false)}>×</button>
			</div>
			<div className='mb-2 text-yellow-300 font-medium'>
				This will be rendering billing API data
			</div>
			<div>
				<strong>API Status:</strong>{' '}
				<span className='text-green-400'>Mock Data</span>
			</div>
			<div>
				<strong>User ID:</strong> {user?.id || 'Not signed in'}
			</div>
			<div>
				<strong>isLoading:</strong> {String(isLoading)}
			</div>
			<div>
				<strong>Subscription:</strong>
				<pre className='mt-1 overflow-auto max-h-24 bg-black/30 p-1 rounded'>
					{JSON.stringify(
						{
							plan: 'Managed Basic',
							status: 'active',
							nextBilling: new Date(
								Date.now() + 15 * 24 * 60 * 60 * 1000
							).toISOString(),
						},
						null,
						2
					)}
				</pre>
			</div>
		</div>
	);
}
