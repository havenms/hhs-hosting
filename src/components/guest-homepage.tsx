import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { LoginModal } from '@/components/login-modal';

export function GuestHomePage() {
	return (
		<div className='min-h-screen bg-background'>
			<Navbar />

			<main className='container mx-auto py-12 px-4 md:px-6'>
				{/* Hero Section */}
				<div className='mb-16 text-center'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						<span className='text-primary'>Modern</span> Web Hosting
					</h2>
					<p className='text-xl mb-8 text-muted-foreground max-w-2xl mx-auto'>
						Simple, reliable hosting with a touch of mid-century
						modern style.
					</p>
					<div className='flex gap-4 justify-center'>
						<Button
							size='lg'
							className='rounded-full'
						>
							Get Started
						</Button>
						<LoginModal />
					</div>
				</div>

				{/* Features */}
				<div className='grid md:grid-cols-3 gap-6 mb-16'>
					<Card>
						<CardHeader>
							<CardTitle className='text-secondary'>
								Simple Setup
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Deploy your sites in minutes with our
								easy-to-use platform.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='text-primary'>
								Reliable Hosting
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								99.9% uptime guarantee with enterprise-grade
								infrastructure.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='text-accent'>
								Expert Support
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Our team is available 24/7 to help with any
								issues.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Mid-century design element */}
				<div className='py-16 flex justify-center'>
					<div className='w-32 h-1 bg-secondary'></div>
				</div>

				{/* Call to action */}
				<div className='bg-accent/10 p-8 rounded-lg text-center mb-16'>
					<h3 className='text-2xl md:text-3xl font-bold mb-4'>
						Ready to get started?
					</h3>
					<p className='mb-6 max-w-xl mx-auto'>
						Join thousands of satisfied customers who trust us with
						their hosting needs.
					</p>
					<Button
						className='rounded-full'
						size='lg'
					>
						Sign Up Now
					</Button>
				</div>
			</main>

			<footer className='bg-muted py-8 px-4'>
				<div className='container mx-auto text-center text-muted-foreground'>
					<p>&copy; 2023 HHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
