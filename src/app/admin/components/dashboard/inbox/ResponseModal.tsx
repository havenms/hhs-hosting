import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link as LinkIcon, Send, X } from 'lucide-react';

interface ResponseModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	ticketId: string;
	onResponseSubmit: (data: {
		message: string;
		url?: string;
		urlLabel?: string;
	}) => Promise<void>;
}

export function ResponseModal({
	isOpen,
	onOpenChange,
	ticketId,
	onResponseSubmit,
}: ResponseModalProps) {
	const [replyText, setReplyText] = useState('');
	const [showUrlSection, setShowUrlSection] = useState(false);
	const [urlReference, setUrlReference] = useState('');
	const [urlLabel, setUrlLabel] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Validate URL
	const isValidUrl =
		!urlReference ||
		/^(https?:\/\/)[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(urlReference);

	const handleSubmit = async () => {
		if (!replyText.trim()) return;

		if (urlReference && !isValidUrl) {
			setError('Please enter a valid URL');
			return;
		}

		setError(null);
		setIsSubmitting(true);

		try {
			// Create payload based on whether URL is included
			const payload = {
				message: replyText,
				...(urlReference && urlLabel
					? { url: urlReference, urlLabel }
					: {}),
			};

			await onResponseSubmit(payload);

			// Reset form and close modal
			setReplyText('');
			setUrlReference('');
			setUrlLabel('');
			setShowUrlSection(false);
			onOpenChange(false);
		} catch {
			setError('Failed to send response. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Reply to Ticket #{ticketId}</DialogTitle>
					<DialogDescription>
						Your response will be sent to the client who submitted
						this ticket.
					</DialogDescription>
				</DialogHeader>

				{error && (
					<div className='bg-destructive/15 text-destructive text-sm p-3 rounded-md'>
						{error}
					</div>
				)}

				<div className='space-y-4'>
					<div>
						<Label htmlFor='response'>Response</Label>
						<Textarea
							id='response'
							placeholder='Type your response here...'
							className='min-h-[150px] mt-1.5'
							value={replyText}
							onChange={(e) => setReplyText(e.target.value)}
						/>
					</div>

					{showUrlSection ? (
						<div className='border rounded-md p-4 relative space-y-3'>
							<Button
								variant='ghost'
								size='icon'
								className='absolute right-2 top-2 h-6 w-6'
								onClick={() => setShowUrlSection(false)}
							>
								<X className='h-3 w-3' />
							</Button>

							<div>
								<Label htmlFor='urlReference'>
									Reference URL
								</Label>
								<Input
									id='urlReference'
									placeholder='https://example.com'
									value={urlReference}
									onChange={(e) =>
										setUrlReference(e.target.value)
									}
									className={
										!isValidUrl ? 'border-destructive' : ''
									}
								/>
								{!isValidUrl && (
									<p className='text-xs text-destructive mt-1'>
										Please enter a valid URL
									</p>
								)}
							</div>

							<div>
								<Label htmlFor='urlLabel'>Link Text</Label>
								<Input
									id='urlLabel'
									placeholder='Label for the URL'
									value={urlLabel}
									onChange={(e) =>
										setUrlLabel(e.target.value)
									}
								/>
							</div>
						</div>
					) : (
						<Button
							variant='outline'
							type='button'
							onClick={() => setShowUrlSection(true)}
							className='flex items-center gap-2'
						>
							<LinkIcon className='h-4 w-4' />
							Add URL Reference
						</Button>
					)}
				</div>

				<DialogFooter>
					<Button
						variant='ghost'
						onClick={() => onOpenChange(false)}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={!replyText.trim() || isSubmitting}
						className='gap-2'
					>
						{isSubmitting ? (
							<>Sending...</>
						) : (
							<>
								<Send className='h-4 w-4' />
								Send Response
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
