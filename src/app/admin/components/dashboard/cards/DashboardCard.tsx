// src/components/admin/dashboard/cards/DashboardCard.tsx
import { ArrowUpRight } from 'lucide-react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface DashboardCardProps {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	description: string;
	trend: string;
	trendUp: boolean;
	color: string;
}

export function DashboardCard({
	title,
	value,
	icon,
	description,
	trend,
	trendUp,
	color,
}: DashboardCardProps) {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				<div className={`${color} p-2 rounded-full text-white`}>
					{icon}
				</div>
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{value}</div>
				<p className='text-xs text-muted-foreground'>{description}</p>
			</CardContent>
			<CardFooter>
				<div
					className={`text-xs flex items-center ${
						trendUp ? 'text-green-500' : 'text-red-500'
					}`}
				>
					{trendUp ? (
						<ArrowUpRight className='h-3 w-3 mr-1' />
					) : (
						<ArrowUpRight className='h-3 w-3 mr-1 rotate-180' />
					)}
					{trend}
				</div>
			</CardFooter>
		</Card>
	);
}
