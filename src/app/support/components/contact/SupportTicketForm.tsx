'use client';

import { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Import auth hook

interface SupportTicketFormProps {
	onTabChange: (tab: string) => void;
	onError: (error: string) => void;
}

export function SupportTicketForm({
	onTabChange,
	onError,
}: SupportTicketFormProps) {
	const { user } = useAuth(); // Get current user data
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const [form, setForm] = useState({
		subject: '',
		category: 'general',
		description: '',
		priority: 'medium',
		// Don't store email in form state as it comes from auth
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form
		if (!form.subject.trim() || !form.description.trim()) {
			onError('Please fill in all required fields');
			return;
		}

		setIsSubmitting(true);

		try {
			// Get the user's email from auth context
			const userEmail =
				user?.emailAddresses?.[0]?.emailAddress || user?.email;

			if (!userEmail) {
				throw new Error(
					'User email not available. Please try again or contact support.'
				);
			}

			// Create submission payload with user email
			const payload = {
				...form,
				clientEmail: userEmail, // Add client email to the payload
				clientName: user?.firstName
					? `${user.firstName} ${user.lastName || ''}`
					: userEmail.split('@')[0], // Format name or use email username
			};

			console.log('Submitting ticket with client info:', payload);

			// Submit to the API endpoint
			const response = await fetch('/api/tickets', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to submit ticket');
			}

			// Success
			setSubmitSuccess(true);

			// Reset form
			formRef.current?.reset();
			setForm({
				subject: '',
				category: 'general',
				description: '',
				priority: 'medium',
			});

			// Show success for 3 seconds then redirect to tickets list
			setTimeout(() => {
				onTabChange('tickets');
			}, 3000);
		} catch (error) {
			console.error('Error submitting support ticket:', error);
			onError(
				error.message ||
					'An error occurred while submitting your ticket'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Show user's email in the form for confirmation
	const userEmail = user?.emailAddresses?.[0]?.emailAddress || user?.email;

	return (
		<form
			onSubmit={handleSubmit}
			ref={formRef}
			className='space-y-4'
		>
			{submitSuccess ? (
				<div className='bg-green-50 border border-green-200 rounded-lg p-4 flex items-start'>
					<CheckCircle className='text-green-600 h-5 w-5 mt-0.5 mr-3' />
					<div>
						<h3 className='font-medium text-green-800'>
							Ticket Submitted Successfully
						</h3>
						<p className='text-sm text-green-700 mt-1'>
							Your support request has been received. We&apos;ll get
							back to you soon!
						</p>
					</div>
				</div>
			) : (
				<>
					{/* Show user email for confirmation */}
					<div className='bg-muted/50 p-3 rounded-md mb-2'>
						<div className='text-sm'>
							<span className='text-muted-foreground'>
								Submitting as:
							</span>{' '}
							<span className='font-medium'>
								{userEmail || 'Loading user information...'}
							</span>
						</div>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='subject'>
								Subject<span className='text-red-500'>*</span>
							</Label>
							<Input
								id='subject'
								name='subject'
								value={form.subject}
								onChange={handleChange}
								placeholder='Brief description of your issue'
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='category'>Category</Label>
							<Select
								name='category'
								value={form.category}
								onValueChange={(value) =>
									handleSelectChange('category', value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Select a category' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='general'>
										General Question
									</SelectItem>
									<SelectItem value='technical'>
										Technical Support
									</SelectItem>
									<SelectItem value='billing'>
										Billing Issue
									</SelectItem>
									<SelectItem value='feature'>
										Feature Request
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='description'>
							Description<span className='text-red-500'>*</span>
						</Label>
						<Textarea
							id='description'
							name='description'
							value={form.description}
							onChange={handleChange}
							placeholder='Please describe your issue in detail'
							rows={5}
							required
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='priority'>Priority</Label>
						<Select
							name='priority'
							value={form.priority}
							onValueChange={(value) =>
								handleSelectChange('priority', value)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select priority' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='low'>Low</SelectItem>
								<SelectItem value='medium'>Medium</SelectItem>
								<SelectItem value='high'>High</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button
						type='submit'
						disabled={isSubmitting || !userEmail}
						className='w-full'
					>
						{isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Submitting...
							</>
						) : (
							'Submit Support Request'
						)}
					</Button>
				</>
			)}
		</form>
	);
}
