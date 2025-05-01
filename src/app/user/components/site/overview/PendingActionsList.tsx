'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, Clock } from 'lucide-react';

interface Action {
	id: string;
	title: string;
	description: string;
	dueDate: Date;
	priority: string;
}

interface PendingActionsListProps {
	actions: Action[];
	formatDate: (date: Date) => string;
}

export function PendingActionsList({
	actions,
	formatDate,
}: PendingActionsListProps) {
	if (!actions || actions.length === 0) return null;

	return (
		<div className='mt-6'>
			<h3 className='text-lg font-medium mb-3'>Action Required</h3>
			<div className='space-y-3'>
				{actions.map((action) => (
					<div
						key={action.id}
						className='border rounded-lg p-3 flex items-start'
					>
						<div
							className={`p-1.5 rounded-full mr-3 mt-0.5 ${
								action.priority === 'high'
									? 'bg-red-100 text-red-600'
									: 'bg-amber-100 text-amber-600'
							}`}
						>
							<AlertCircle className='h-5 w-5' />
						</div>
						<div className='flex-1'>
							<h4 className='font-medium'>{action.title}</h4>
							<p className='text-sm text-muted-foreground mt-1'>
								{action.description}
							</p>
							<div className='flex items-center mt-2'>
								<Clock className='h-3.5 w-3.5 text-muted-foreground mr-1.5' />
								<span className='text-xs text-muted-foreground'>
									Due: {formatDate(action.dueDate)}
								</span>
							</div>
						</div>
						<Button size='sm'>Complete</Button>
					</div>
				))}
			</div>
		</div>
	);
}
