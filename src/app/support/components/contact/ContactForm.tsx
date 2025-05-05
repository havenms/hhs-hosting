import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { LifeBuoy, AlertCircle } from 'lucide-react';
import { SupportTicketForm } from './SupportTicketForm';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ContactFormProps {
	onTabChange: (tab: string) => void;
}

export function ContactForm({ onTabChange }: ContactFormProps) {
	const [submissionError, setSubmissionError] = useState<string | null>(null);

	return (
		<div className='grid gap-8'>
			{submissionError && (
				<Alert variant='destructive'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{submissionError}</AlertDescription>
				</Alert>
			)}

			<div>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<LifeBuoy className='mr-2 h-5 w-5 text-primary' />
							Have a Question?
						</CardTitle>
						<CardDescription>
							We would like to hear from you
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SupportTicketForm
							onTabChange={onTabChange}
							onError={(error) => setSubmissionError(error)}
						/>
					</CardContent>
					<CardFooter className='text-xs text-muted-foreground'>
						Your request will be processed by our support team
						within 24 hours.
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
