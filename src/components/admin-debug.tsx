// src/components/admin-debug.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export function AdminDebug() {
	const { user } = useUser();
	const { isAdmin, isLoading } = useAuth();
	const [visible, setVisible] = useState(true);

	if (process.env.NODE_ENV !== 'development' || !visible) return null;

	return (
		<div className='fixed bottom-4 right-4 bg-black/80 text-white p-4 text-xs rounded-lg shadow-lg z-50 max-w-xs'>
			<div className='flex justify-between mb-2'>
				<span className='font-bold'>Admin Debug</span>
				<button onClick={() => setVisible(false)}>×</button>
			</div>
			<div>
				<strong>isAdmin:</strong> {String(isAdmin)}
			</div>
			<div>
				<strong>isLoading:</strong> {String(isLoading)}
			</div>
			<div>
				<strong>User ID:</strong> {user?.id || 'Not signed in'}
			</div>
			<div>
				<strong>Metadata:</strong>
				<pre className='mt-1 overflow-auto max-h-24 bg-black/30 p-1 rounded'>
					{JSON.stringify(user?.publicMetadata, null, 2) || 'None'}
				</pre>
			</div>
		</div>
	);
}
