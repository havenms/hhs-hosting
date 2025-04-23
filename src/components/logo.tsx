export function Logo() {
	return (
		<div className='flex items-center gap-2'>
			<div className='relative h-8 w-8'>
				<div className='absolute inset-0 bg-primary rounded-tl-full rounded-br-full transform rotate-45'></div>
				<div className='absolute inset-[2px] bg-background rounded-tl-full rounded-br-full transform rotate-45'></div>
			</div>
			<span className='text-2xl font-bold text-primary tracking-tight'>
				HHS Hosting
			</span>
		</div>
	);
}
