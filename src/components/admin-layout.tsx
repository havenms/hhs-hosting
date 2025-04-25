'use client';

import { ReactNode } from 'react';


interface AdminLayoutProps {
	children: ReactNode;
	title?: string;
	actions?: ReactNode;
}

export function AdminLayout({ children, title, actions }: AdminLayoutProps) {
	return (
		<div className='min-h-screen flex flex-col'>
		

			<div className='flex flex-1'>
			

				{/* Main content */}
				<main className='flex-1 p-6'>
					{/* Page header with title and actions */}
					{(title || actions) && (
						<div className='flex justify-between items-center mb-6'>
							{title && (
								<h1 className='text-2xl font-bold'>{title}</h1>
							)}
							{actions && (
								<div className='flex gap-2'>{actions}</div>
							)}
						</div>
					)}

					{/* Page content */}
					{children}
				</main>
			</div>
		</div>
	);
}
