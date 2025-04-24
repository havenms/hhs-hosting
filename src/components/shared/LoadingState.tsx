import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
	message?: string;
	height?: string;
	className?: string;
}

export function LoadingState({
	message = 'Loading dashboard data...',
	height = 'h-64',
	className = '',
}: LoadingStateProps) {
	return (
		<div
			className={`flex items-center justify-center ${height} ${className}`}
		>
			<Loader2 className='h-8 w-8 animate-spin text-primary' />
			<p className='ml-2'>{message}</p>
		</div>
	);
}
