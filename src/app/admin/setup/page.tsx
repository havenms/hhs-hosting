'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface AdminSetupResponse {
	success: boolean;
	user: {
		id: string;
		email?: string;
		name?: string;
		isAdmin: boolean;
	};
	message?: string;
}

export default function AdminSetupPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<AdminSetupResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	const setupAdmin = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch('/api/users/updateAdmin', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || `Error ${response.status}`);
			}

			setResult(data);
		} catch (err) {
			console.error('Admin setup error:', err);
			setError(err instanceof Error ? err.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center items-center min-h-screen p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle>Admin Setup</CardTitle>
					<CardDescription>
						Make your current user an admin in the database
					</CardDescription>
				</CardHeader>
				<CardContent>
					{error && (
						<div className='bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4'>
							{error}
						</div>
					)}

					{result && (
						<div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-4'>
							<p>Success! User updated:</p>
							<pre className='text-xs mt-2 overflow-auto'>
								{JSON.stringify(result, null, 2)}
							</pre>
						</div>
					)}

					<p className='text-sm text-gray-600 mb-4'>
						This will update your current user to have admin
						privileges in the database.
					</p>
				</CardContent>
				<CardFooter>
					<Button
						onClick={setupAdmin}
						disabled={loading}
						className='w-full'
					>
						{loading ? 'Processing...' : 'Make Me Admin'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
