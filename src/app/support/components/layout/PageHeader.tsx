import { motion } from 'framer-motion';

export function PageHeader() {
	return (
		<div className='mb-16 text-center relative'>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className='text-4xl md:text-5xl font-bold mb-4 relative inline-block'>
					<span className='bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
						Support
					</span>
					{' & Resources'}
					<span className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-transparent rounded-full'></span>
				</h1>
			</motion.div>

			<motion.p
				className='text-xl mb-8 text-muted-foreground max-w-2xl mx-auto'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				Get help with your hosting account and find answers to common
				questions.
			</motion.p>

			<div className='absolute w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent bottom-0'></div>
		</div>
	);
}
