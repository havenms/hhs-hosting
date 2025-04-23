// src/app/admin/users/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function NewUserPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		isAdmin: false,
		role: 'user',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckboxChange = (checked: boolean) => {
		setFormData((prev) => ({
			...prev,
			isAdmin: checked,
			role: checked ? 'admin' : 'user',
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Failed to create user');
			}

			router.push('/admin/users');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AdminLayout
			title='Add New User'
			actions={
				<Button
					variant='outline'
					onClick={() => router.back()}
				>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Back
				</Button>
			}
		>
			<Card>
				<CardContent className='pt-6'>
					<form
						onSubmit={handleSubmit}
						className='space-y-6'
					>
						{error && (
							<div className='p-3 bg-red-50 border border-red-200 rounded-md text-red-600'>
								{error}
							</div>
						)}

						<div className='space-y-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='flex items-center space-x-2'>
							<Checkbox
								id='isAdmin'
								checked={formData.isAdmin}
								onCheckedChange={handleCheckboxChange}
							/>
							<Label htmlFor='isAdmin'>Admin User</Label>
						</div>

						<Button
							type='submit'
							disabled={loading}
							className='w-full'
						>
							{loading ? (
								<>
									<Loader2 className='h-4 w-4 mr-2 animate-spin' />
									Creating...
								</>
							) : (
								'Create User'
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</AdminLayout>
	);
}
