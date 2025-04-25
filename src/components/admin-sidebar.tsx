'use client';

import React from 'react';
import Link from 'next/link';
import {
	Users,
	BarChart3,
	Settings,
	Shield,
	LayoutGrid,
	FileEdit,
	TicketCheck,
	CalendarClock,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
	const pathname = usePathname();

	const navItems = [
		{
			name: 'Dashboard',
			href: '/admin',
			icon: <LayoutGrid className='h-5 w-5 mr-3' />,
		},
		{
			name: 'User Management',
			href: '/admin/users',
			icon: <Users className='h-5 w-5 mr-3' />,
		},
		{
			name: 'Support Tickets',
			href: '/admin/tickets',
			icon: <TicketCheck className='h-5 w-5 mr-3' />,
		},
	];

	return (
		<aside className='w-64 bg-background border-r border-border min-h-[calc(100vh-64px)] p-4 hidden md:block'>
			<div className='flex items-center mb-6'>
				<Shield className='h-6 w-6 text-primary mr-2' />
				<h2 className='text-lg font-semibold'>Admin Dashboard</h2>
			</div>

			<nav className='space-y-1'>
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							'flex items-center p-2 rounded-md transition-colors',
							pathname === item.href
								? 'bg-primary/10 text-primary font-medium'
								: 'hover:bg-accent/50 text-muted-foreground'
						)}
					>
						{React.cloneElement(item.icon, {
							className: cn(
								item.icon.props.className,
								pathname === item.href
									? 'text-primary'
									: 'text-muted-foreground'
							),
						})}
						{item.name}
					</Link>
				))}
			</nav>
		</aside>
	);
}
