import { Card, CardContent } from '@/components/ui/card';
import { TicketStats as TicketStatsType } from '../types';

interface TicketStatsProps {
	stats: TicketStatsType;
}

export function TicketStats({ stats }: TicketStatsProps) {
	return (
		<div className='grid grid-cols-2 md:grid-cols-5 gap-3 mb-6'>
			<Card>
				<CardContent className='p-4 flex flex-col items-center'>
					<p className='text-muted-foreground text-sm'>
						Total Tickets
					</p>
					<p className='text-3xl font-bold'>{stats.total}</p>
				</CardContent>
			</Card>
			<Card>
				<CardContent className='p-4 flex flex-col items-center'>
					<p className='text-muted-foreground text-sm'>Open</p>
					<p className='text-3xl font-bold text-blue-500'>
						{stats.open}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardContent className='p-4 flex flex-col items-center'>
					<p className='text-muted-foreground text-sm'>In Progress</p>
					<p className='text-3xl font-bold text-yellow-500'>
						{stats.inProgress}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardContent className='p-4 flex flex-col items-center'>
					<p className='text-muted-foreground text-sm'>Closed</p>
					<p className='text-3xl font-bold text-green-500'>
						{stats.closed}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardContent className='p-4 flex flex-col items-center'>
					<p className='text-muted-foreground text-sm'>
						High Priority
					</p>
					<p className='text-3xl font-bold text-red-500'>
						{stats.highPriority}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
