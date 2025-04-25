import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { LoginModal } from '@/components/login-modal';

export function GuestHomePage() {
	return (
		<div className='min-h-screen bg-background'>
			<Navbar />

			<main className='container mx-auto min-h-screen py-12 px-4 md:px-6'>
				{/* Hero Section */}
				<div className='mb-16 text-center'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						<span className='text-primary'>Modern</span> Web Hosting
					</h2>
					<p className='text-xl mb-8 text-muted-foreground max-w-2xl mx-auto'>
						Simple, reliable hosting full stop.
					</p>
					<div className='flex gap-4 justify-center'>
						
						<LoginModal />
					</div>
				</div>

				
				{/* Mid-century design element */}
				<div className='py-16 flex justify-center'>
					<div className='w-32 h-1 bg-secondary'></div>
				</div>
			</main>

			<footer className='bg-muted py-8 px-4'>
				<div className='container mx-auto text-center text-muted-foreground'>
					<p>&copy; 2025 NHHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
