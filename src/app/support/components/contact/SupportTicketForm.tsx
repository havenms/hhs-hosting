import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Upload, Paperclip, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SupportTicketFormProps {
	onTabChange: (tab: string) => void;
}

// Define ticket categories
const TICKET_CATEGORIES = [
	{ value: 'account', label: 'Account Issue' },
	{ value: 'billing', label: 'Billing Question' },
	{ value: 'technical', label: 'Technical Support' },
	{ value: 'feature', label: 'Feature Request' },
	{ value: 'other', label: 'Other' },
];

// Define priority levels with colors
const PRIORITY_LEVELS = [
	{ value: 'low', label: 'Low', color: 'bg-blue-500' },
	{ value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
	{ value: 'high', label: 'High', color: 'bg-red-500' },
];

export function SupportTicketForm({ onTabChange }: SupportTicketFormProps) {
	const [ticketForm, setTicketForm] = useState({
		subject: '',
		category: '',
		description: '',
		priority: 'medium',
		files: [] as File[],
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Validate form before submission
	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!ticketForm.subject.trim()) {
			newErrors.subject = 'Subject is required';
		} else if (ticketForm.subject.length < 5) {
			newErrors.subject = 'Subject must be at least 5 characters';
		}

		if (!ticketForm.category) {
			newErrors.category = 'Please select a category';
		}

		if (!ticketForm.description.trim()) {
			newErrors.description = 'Description is required';
		} else if (ticketForm.description.length < 20) {
			newErrors.description =
				'Please provide more details (at least 20 characters)';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle file upload
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			// Convert FileList to Array and limit to 5 files
			const fileArray = Array.from(e.target.files).slice(0, 5);
			setTicketForm({
				...ticketForm,
				files: fileArray,
			});

			// Show simulated upload progress
			setUploadProgress(0);
			const interval = setInterval(() => {
				setUploadProgress((prev) => {
					const newProgress = prev + 20;
					if (newProgress >= 100) {
						clearInterval(interval);
						return 100;
					}
					return newProgress;
				});
			}, 200);
		}
	};

	const removeFile = (index: number) => {
		setTicketForm({
			...ticketForm,
			files: ticketForm.files.filter((_, i) => i !== index),
		});
	};

	// Handle form submission
	const handleTicketSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setUploadProgress(0);

		// Simulate API call with progress
		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				const newProgress = prev + 15;
				if (newProgress >= 100) {
					clearInterval(interval);
					setTimeout(() => {
						setIsSubmitting(false);
						setSubmitSuccess(true);

						// Reset form after success
						setTimeout(() => {
							setTicketForm({
								subject: '',
								category: '',
								description: '',
								priority: 'medium',
								files: [],
							});
							setSubmitSuccess(false);
						}, 4000);
					}, 500);
					return 100;
				}
				return newProgress;
			});
		}, 300);
	};

	// Success state with animation
	if (submitSuccess) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				className='bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-900 rounded-lg p-8 text-center'
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', damping: 8 }}
				>
					<CheckCircle2 className='h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-6' />
				</motion.div>
				<h3 className='text-2xl font-semibold mb-2'>
					Ticket Submitted Successfully
				</h3>
				<p className='text-muted-foreground mb-6 max-w-md mx-auto'>
					We've received your request and will respond as soon as
					possible. You'll receive a confirmation email shortly.
				</p>
				<div className='space-x-3'>
					<Button
						onClick={() => onTabChange('tickets')}
						className='rounded-full'
					>
						View My Tickets
					</Button>
					<Button
						variant='outline'
						onClick={() => setSubmitSuccess(false)}
						className='rounded-full'
					>
						Submit Another Ticket
					</Button>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.form
			onSubmit={handleTicketSubmit}
			className='space-y-6'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<AnimatePresence mode='wait'>
				{isSubmitting && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className='bg-primary/10 rounded-lg p-4 mb-4 overflow-hidden'
					>
						<p className='text-center font-medium mb-2'>
							Submitting your ticket...
						</p>
						<Progress
							value={uploadProgress}
							className='h-2'
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<div className='grid gap-5'>
				{/* Top section with category and priority */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='category'>
							Category <span className='text-red-500'>*</span>
						</Label>
						<Select
							value={ticketForm.category}
							onValueChange={(value) => {
								setTicketForm({
									...ticketForm,
									category: value,
								});
								if (errors.category) {
									const { category, ...rest } = errors;
									setErrors(rest);
								}
							}}
						>
							<SelectTrigger
								id='category'
								className={cn(
									errors.category && 'border-red-500'
								)}
							>
								<SelectValue placeholder='Select issue category' />
							</SelectTrigger>
							<SelectContent>
								{TICKET_CATEGORIES.map((category) => (
									<SelectItem
										key={category.value}
										value={category.value}
									>
										{category.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.category && (
							<p className='text-red-500 text-sm mt-1 flex items-center'>
								<AlertCircle className='h-3 w-3 mr-1' />
								{errors.category}
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='priority'>Priority Level</Label>
						<div className='flex items-center gap-3'>
							{PRIORITY_LEVELS.map((priority) => (
								<button
									key={priority.value}
									type='button'
									onClick={() =>
										setTicketForm({
											...ticketForm,
											priority: priority.value,
										})
									}
									className={`relative flex-1 px-3 py-2 border rounded-md text-sm transition-all ${
										ticketForm.priority === priority.value
											? 'border-primary bg-primary/10'
											: 'border-border hover:border-primary/50'
									}`}
								>
									<div className='flex flex-col items-center'>
										<div
											className={`w-2 h-2 ${priority.color} rounded-full mb-1`}
										></div>
										{priority.label}
									</div>
									{ticketForm.priority === priority.value && (
										<motion.div
											layoutId='priorityOutline'
											className='absolute inset-0 border-2 border-primary rounded-md pointer-events-none'
											initial={false}
											transition={{
												type: 'spring',
												bounce: 0.2,
												duration: 0.4,
											}}
										/>
									)}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Subject field */}
				<div className='space-y-2'>
					<Label htmlFor='subject'>
						Subject <span className='text-red-500'>*</span>
					</Label>
					<Input
						id='subject'
						placeholder='Brief description of your issue'
						value={ticketForm.subject}
						onChange={(e) => {
							setTicketForm({
								...ticketForm,
								subject: e.target.value,
							});
							if (errors.subject) {
								const { subject, ...rest } = errors;
								setErrors(rest);
							}
						}}
						className={cn(errors.subject && 'border-red-500')}
					/>
					{errors.subject && (
						<p className='text-red-500 text-sm mt-1 flex items-center'>
							<AlertCircle className='h-3 w-3 mr-1' />
							{errors.subject}
						</p>
					)}
				</div>

				{/* Description textarea */}
				<div className='space-y-2'>
					<Label htmlFor='description'>
						Description <span className='text-red-500'>*</span>
					</Label>
					<Textarea
						id='description'
						placeholder='Please provide detailed information about your issue'
						className={cn(
							'min-h-[200px]',
							errors.description && 'border-red-500'
						)}
						value={ticketForm.description}
						onChange={(e) => {
							setTicketForm({
								...ticketForm,
								description: e.target.value,
							});
							if (errors.description) {
								const { description, ...rest } = errors;
								setErrors(rest);
							}
						}}
					/>
					{errors.description ? (
						<p className='text-red-500 text-sm mt-1 flex items-center'>
							<AlertCircle className='h-3 w-3 mr-1' />
							{errors.description}
						</p>
					) : (
						<p className='text-xs text-muted-foreground'>
							Please include any relevant details that might help
							us understand your issue better.
						</p>
					)}
				</div>

				{/* File upload section */}
				<div className='space-y-3'>
					<Label htmlFor='file-upload'>Attachments (Optional)</Label>
					<div
						className='border-2 border-dashed border-border rounded-lg p-4 transition-colors hover:bg-muted/50 cursor-pointer text-center'
						onClick={() =>
							document.getElementById('file-upload')?.click()
						}
					>
						<input
							id='file-upload'
							type='file'
							multiple
							onChange={handleFileChange}
							className='hidden'
							accept='image/*,.pdf,.doc,.docx,.txt'
							disabled={isSubmitting}
						/>
						<div className='flex flex-col items-center justify-center gap-2 py-2'>
							<Upload className='h-6 w-6 text-muted-foreground' />
							<p className='text-sm font-medium'>
								Click to upload or drag and drop
							</p>
							<p className='text-xs text-muted-foreground'>
								Support images, PDFs and documents (max 5 files)
							</p>
						</div>
					</div>

					{/* Show progress when uploading */}
					{uploadProgress > 0 && uploadProgress < 100 && (
						<div className='space-y-2'>
							<div className='flex justify-between text-xs'>
								<span>Uploading...</span>
								<span>{uploadProgress}%</span>
							</div>
							<Progress
								value={uploadProgress}
								className='h-1'
							/>
						</div>
					)}

					{/* Display selected files */}
					{ticketForm.files.length > 0 && (
						<div className='bg-muted/50 rounded-lg p-3'>
							<p className='text-sm font-medium mb-2 flex items-center justify-between'>
								<span>
									Selected files ({ticketForm.files.length})
								</span>
								<Badge variant='outline'>
									{(
										ticketForm.files.reduce(
											(total, file) => total + file.size,
											0
										) / 1024
									).toFixed(1)}{' '}
									KB
								</Badge>
							</p>
							<ul className='space-y-2'>
								{ticketForm.files.map((file, index) => (
									<motion.li
										key={`${file.name}-${index}`}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										className='bg-background rounded border flex items-center justify-between p-2 text-sm'
									>
										<div className='flex items-center gap-2 overflow-hidden'>
											<Paperclip className='h-4 w-4 text-muted-foreground flex-shrink-0' />
											<span className='truncate'>
												{file.name}
											</span>
											<span className='text-xs text-muted-foreground'>
												({(file.size / 1024).toFixed(1)}{' '}
												KB)
											</span>
										</div>
										<Button
											size='sm'
											variant='ghost'
											className='h-6 w-6 p-0 rounded-full'
											onClick={(e) => {
												e.stopPropagation();
												removeFile(index);
											}}
											disabled={isSubmitting}
										>
											<X className='h-4 w-4' />
										</Button>
									</motion.li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className='flex justify-end gap-3'>
				<Button
					type='button'
					variant='outline'
					className='rounded-full'
					onClick={() => {
						setTicketForm({
							subject: '',
							category: '',
							description: '',
							priority: 'medium',
							files: [],
						});
						setErrors({});
					}}
					disabled={isSubmitting}
				>
					Reset Form
				</Button>
				<Button
					type='submit'
					className='rounded-full min-w-[120px]'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Submitting...' : 'Submit Ticket'}
				</Button>
			</div>
		</motion.form>
	);
}
