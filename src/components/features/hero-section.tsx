'use client';

export function HeroSection() {
	return (
		<div className='mb-8 sm:mb-12 lg:mb-16 text-center'>
			<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6'>
				We <span className='text-primary'>Build & Host</span>{' '}
				<span className='block sm:inline'>Your WordPress Site</span>
			</h1>
			<p className='text-lg sm:text-xl mb-4 sm:mb-8 text-muted-foreground max-w-3xl mx-auto px-4'>
				Mid-century design meets modern WordPress performance. Our team
				handles the entire process from design to deployment.
			</p>
		</div>
	);
}
