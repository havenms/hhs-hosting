// src/components/admin/dashboard/cards/ActivityItem.tsx
import React from 'react';

interface ActivityItemProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	time: string;
}

export function ActivityItem({
	icon,
	title,
	description,
	time,
}: ActivityItemProps) {
	return (
		<div className='flex gap-4 p-4'>
			<div className='bg-muted mt-0.5 p-2 rounded-full'>{icon}</div>
			<div className='flex-1'>
				<p className='text-sm font-medium'>{title}</p>
				<p className='text-sm text-muted-foreground'>{description}</p>
				<p className='text-xs text-muted-foreground mt-1'>{time}</p>
			</div>
		</div>
	);
}
