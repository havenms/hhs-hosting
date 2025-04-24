// src/components/admin/dashboard/inbox/TicketDetailView.tsx
// Extract from your original SupportTicketDetailView function

// src/components/admin/dashboard/inbox/RequestDetailView.tsx
// Extract from your original EditRequestDetailView function

// src/components/admin/dashboard/inbox/InboxTab.tsx
import { useState } from 'react';
import { UnifiedInboxView } from './UnifiedInboxView';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function InboxTab({ editRequests, supportTickets }) {
	return (
		<div className='space-y-4'>
			<div className='flex flex-col sm:flex-row gap-3 justify-between'>
				<div className='relative flex-1'>
					<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Search inbox...'
						className='pl-8'
					/>
				</div>
				<div className='flex gap-2'>
					<Select defaultValue='all'>
						<SelectTrigger className='w-full sm:w-[180px]'>
							<SelectValue placeholder='All requests' />
						</SelectTrigger>
						<SelectContent>{/* Select options */}</SelectContent>
					</Select>
					<Button
						size='icon'
						variant='outline'
					>
						<Filter className='h-4 w-4' />
					</Button>
				</div>
			</div>

			{/* Unified Inbox Component */}
			<UnifiedInboxView
				editRequests={editRequests}
				supportTickets={supportTickets}
			/>
		</div>
	);
}
