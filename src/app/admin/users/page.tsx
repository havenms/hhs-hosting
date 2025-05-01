'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { AdminLayout } from '../components/admin-layout';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { UserPlus, FileDown, Loader2, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { authFetch } from '@/lib/auth-utils';

// User type definition
interface User {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	role: string;
	_count?: {
		sites: number;
		tickets: number;
		editRequests: number;
	};
}

export default function UsersPage() {
	const { user } = useUser();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			setError(null);

			console.log('Fetching users...');

			const response = await authFetch('/api/users');

			// Safer handling of response
			if (!response) {
				throw new Error('No response from server');
			}

			const data = await response.json();

			console.log('Fetched users:', data);
			setUsers(Array.isArray(data) ? data : []);
		} catch (err) {
			console.error('Error fetching users:', err);
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleDeleteUser = async (userId: string) => {
		if (confirm('Are you sure you want to delete this user?')) {
			try {
				await authFetch(`/api/users/${userId}`, { method: 'DELETE' });
				fetchUsers(); // Refresh the list
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Failed to delete user'
				);
			}
		}
	};

	const actions = (
		<>
			<Button
				variant='outline'
				size='sm'
			>
				<FileDown className='h-4 w-4 mr-2' />
				Export
			</Button>
			<Link href='/admin/users/new'>
				<Button size='sm'>
					<UserPlus className='h-4 w-4 mr-2' />
					Add User
				</Button>
			</Link>
		</>
	);

	return (
		<AdminLayout
			title='User Management'
			actions={actions}
		>
			{loading ? (
				<div className='flex justify-center p-8'>
					<Loader2 className='h-8 w-8 animate-spin text-primary' />
				</div>
			) : error ? (
				<div className='text-center text-red-500 p-4'>{error}</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Sites</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className='text-center py-8'
								>
									No users found
								</TableCell>
							</TableRow>
						) : (
							users.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded text-xs ${
												user.isAdmin
													? 'bg-blue-100 text-blue-800'
													: 'bg-gray-100'
											}`}
										>
											{user.role}
										</span>
									</TableCell>
									<TableCell>
										{user._count?.sites || 0}
									</TableCell>
									<TableCell>
										<div className='flex space-x-2'>
											<Link
												href={`/admin/users/${user.id}`}
											>
												<Button
													size='sm'
													variant='ghost'
												>
													View
												</Button>
											</Link>
											<Link
												href={`/admin/users/${user.id}/edit`}
											>
												<Button
													size='sm'
													variant='ghost'
												>
													<Pencil className='h-4 w-4' />
												</Button>
											</Link>
											<Button
												size='sm'
												variant='ghost'
												onClick={() =>
													handleDeleteUser(user.id)
												}
											>
												<Trash className='h-4 w-4 text-red-500' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			)}
			{process.env.NODE_ENV === 'development' && (
				<div className='mt-8 border-t pt-4 text-xs'>
					<h3 className='font-semibold mb-2'>Debug Info:</h3>
					<div>
						<strong>Current User ID:</strong>{' '}
						{user?.id || 'Not signed in'}
					</div>
					<div>
						<strong>Admin Role:</strong>{' '}
						{user?.publicMetadata?.role || 'None'}
					</div>
					<div>
						<strong>Admin Flag:</strong>{' '}
						{String(Boolean(user?.publicMetadata?.isAdmin))}
					</div>
					<div>
						<strong>Loading State:</strong> {String(loading)}
					</div>
					<div>
						<strong>Error State:</strong> {error || 'None'}
					</div>
					<div>
						<strong>Users Count:</strong> {users.length}
					</div>
					<button
						onClick={fetchUsers}
						className='mt-2 px-2 py-1 bg-gray-200 rounded text-xs'
					>
						Retry Fetch
					</button>
				</div>
			)}
		</AdminLayout>
	);
}
