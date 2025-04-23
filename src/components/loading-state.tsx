'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { DiscoMode } from '@/components/disco-mode';

export function LoadingState() {
	// We don't need separate state management for disco mode anymore
	// as it's now handled by the DiscoMode component itself

	return (
		<>
			{/* Pass isLoading=true to keep disco mode active during loading */}
			<DiscoMode
				isLoading={true}
				showButton={false}
			/>

			<div className='flex min-h-screen items-center justify-center flex-col gap-8'>
				<LoadingSpinner size='lg' />
				<div className='text-center animate-pulse'>
					<h3 className='text-xl font-semibold mb-2'>
						Loading your experience...
					</h3>
					<p className='text-muted-foreground'>
						Get ready for some mid-century magic
					</p>
				</div>
			</div>
		</>
	);
}
