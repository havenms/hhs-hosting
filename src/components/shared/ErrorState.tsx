// src/components/shared/ErrorState.tsx
export function ErrorState({ message }) {
	return (
		<div className='p-4 border border-red-200 bg-red-50 rounded-md'>
			<h3 className='text-red-700 font-medium'>Error loading data</h3>
			<p className='text-red-600'>{message}</p>
		</div>
	);
}
