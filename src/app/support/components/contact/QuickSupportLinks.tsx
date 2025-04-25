import { Button } from '@/components/ui/button';
import { FileQuestion, MessageSquare, AlertCircle } from 'lucide-react';

interface QuickSupportLinksProps {
	onTabChange: (tab: string) => void;
}

export function QuickSupportLinks({ onTabChange }: QuickSupportLinksProps) {
	return (
		<div className='flex flex-col space-y-4'>
			<div className='bg-muted/50 p-4 rounded-lg'>
				<h3 className='font-medium mb-1 flex items-center'>
					<FileQuestion className='h-4 w-4 mr-2 text-primary' />
					Check our FAQs
				</h3>
				<p className='text-sm text-muted-foreground mb-3'>
					Find quick answers to common questions.
				</p>
				<Button
					variant='outline'
					className='w-full rounded-full'
					onClick={() => onTabChange('faq')}
				>
					Browse FAQs
				</Button>
			</div>

			<div className='bg-muted/50 p-4 rounded-lg'>
				<h3 className='font-medium mb-1 flex items-center'>
					<MessageSquare className='h-4 w-4 mr-2 text-secondary' />
					Live Chat
				</h3>
				<p className='text-sm text-muted-foreground mb-3'>
					Available Monday-Friday, 9am-5pm EST
				</p>
				<Button
					variant='outline'
					className='w-full rounded-full'
				>
					Start Chat
				</Button>
			</div>

			<div className='bg-muted/50 p-4 rounded-lg'>
				<h3 className='font-medium mb-1 flex items-center'>
					<AlertCircle className='h-4 w-4 mr-2 text-accent' />
					System Status
				</h3>
				<p className='text-sm text-muted-foreground mb-1'>
					Check if there are any ongoing issues.
				</p>
				<div className='flex items-center'>
					<div className='w-2 h-2 rounded-full bg-green-500 mr-2'></div>
					<span className='text-sm'>All systems operational</span>
				</div>
			</div>
		</div>
	);
}
