import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { LifeBuoy } from 'lucide-react';
import { SupportTicketForm } from './SupportTicketForm';
import { QuickSupportLinks } from './QuickSupportLinks';

interface ContactFormProps {
	onTabChange: (tab: string) => void;
}

export function ContactForm({ onTabChange }: ContactFormProps) {
	return (
		<div className='grid  gap-8'>
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
						<SupportTicketForm onTabChange={onTabChange} />
					</CardContent>
				</Card>
			</div>

			
		</div>
	);
}
