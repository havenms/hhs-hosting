import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
	title: string;
	value: string;
	change: string;
	trendUp: boolean;
	icon?: React.ReactNode;
}

export function StatsCard({
	title,
	value,
	change,
	trendUp,
	icon,
}: StatsCardProps) {
	return (
		<Card>
			<CardContent className='p-4 flex flex-col'>
				<div className='flex items-center justify-between mb-2'>
					<span className='text-sm text-muted-foreground'>
						{title}
					</span>
					{icon}
				</div>
				<div className='text-2xl font-bold'>{value}</div>
				<div
					className={`flex items-center text-xs mt-1 ${
						trendUp ? 'text-green-500' : 'text-red-500'
					}`}
				>
					{trendUp ? (
						<ArrowUpRight className='h-3 w-3 mr-1' />
					) : (
						<ArrowDownRight className='h-3 w-3 mr-1' />
					)}
					<span>{change}</span>
				</div>
			</CardContent>
		</Card>
	);
}
