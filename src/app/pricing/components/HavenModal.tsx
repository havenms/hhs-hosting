'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
	Calendar,
	ExternalLink,
	CircleDollarSign,
	Palette,
	PenTool,
	Package,
	CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function HavenModal() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={setIsModalOpen}
		>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					size='lg'
					className='rounded-full'
				>
					More Pricing / Web Design Details
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[650px] p-0 overflow-hidden my-6 max-h-[90vh]'>
				<div className='bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-1'>
					<div className='bg-background p-5 max-h-[calc(90vh-2px)] overflow-y-auto'>
						<DialogHeader className='mb-4 sticky top-0 bg-background z-10 pb-2'>
							<div className='flex items-center justify-between'>
								<div>
									<DialogTitle className='text-2xl font-bold flex items-center gap-2'>
										<CircleDollarSign className='h-6 w-6 text-primary' />
										Haven Media Solutions
									</DialogTitle>
									<DialogDescription className='mt-1'>
										Premium web design & hosting packages
									</DialogDescription>
								</div>
								<Badge
									variant='outline'
									className='bg-primary/10 text-primary border-primary'
								>
									Partner Offers
								</Badge>
							</div>
						</DialogHeader>

						<div className='space-y-6'>
							{/* Free Website Mockup */}
							<div className='bg-muted/50 p-4 rounded-lg'>
								<h3 className='font-semibold text-lg flex items-center gap-2'>
									<Palette className='h-5 w-5 text-primary' />
									Free Website Mockup
								</h3>
								<p className='text-sm text-muted-foreground mt-1 mb-3'>
									Get a custom website design mockup at no
									cost or obligation before committing to a
									project.
								</p>
								<Button
									variant='outline'
									className='w-full sm:w-auto rounded-full'
									asChild
								>
									<Link
										href='https://calendly.com/havenmediasolutions/consultation'
										target='_blank'
										rel='noopener noreferrer'
									>
										<Calendar className='mr-2 h-4 w-4' />
										Schedule Design Consultation
									</Link>
								</Button>
							</div>

							{/* Pricing Bundles */}
							<div>
								<h3 className='font-semibold text-lg mb-3 flex items-center gap-2'>
									<Package className='h-5 w-5 text-secondary' />
									Exclusive Pricing Bundles
								</h3>

								<div className='grid sm:grid-cols-2 gap-4'>
									<Card className='border-primary/20'>
										<CardContent className='p-4 space-y-2'>
											<div className='flex justify-between items-start'>
												<h4 className='font-medium'>
													Annual Discount
												</h4>
												<Badge
													variant='outline'
													className='bg-green-100 text-green-800 border-green-200'
												>
													Save 20%
												</Badge>
											</div>
											<p className='text-xs text-muted-foreground'>
												Prepay annually and receive 20%
												off standard hosting rates
												across all plans.
											</p>
										</CardContent>
									</Card>

									<Card className='border-secondary/20'>
										<CardContent className='p-4 space-y-2'>
											<div className='flex justify-between items-start'>
												<h4 className='font-medium'>
													Pro Design Bundle
												</h4>
												<Badge
													variant='outline'
													className='bg-purple-100 text-purple-800 border-purple-200'
												>
													Premium
												</Badge>
											</div>
											<p className='text-xs text-muted-foreground'>
												Custom design + hosting bundle
												with priority support and
												monthly maintenance.
											</p>
										</CardContent>
									</Card>
								</div>
							</div>

							{/* Features List */}
							<div>
								<h3 className='font-semibold text-lg mb-3 flex items-center gap-2'>
									<PenTool className='h-5 w-5 text-accent' />
									Included With Custom Design
								</h3>

								<div className='grid grid-cols-2 gap-x-4 gap-y-2'>
									{[
										'Responsive Design',
										'SEO Optimization',
										'Custom Branding',
										'Content Strategy',
										'Analytics Setup',
										'Social Media Integration',
									].map((feature) => (
										<div
											key={feature}
											className='flex items-center'
										>
											<CheckCircle2 className='h-4 w-4 text-green-500 mr-2 flex-shrink-0' />
											<span className='text-sm'>
												{feature}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						<DialogFooter className='border-t mt-6 pt-4 flex-col sm:flex-row gap-3 sticky bottom-0 bg-background'>
							<Button
								className='rounded-full'
								asChild
							>
								<Link
									href='https://www.havenmediasolutions.com'
									target='_blank'
									rel='noopener noreferrer'
								>
									Visit Haven Media Solutions
									<ExternalLink className='ml-2 h-4 w-4' />
								</Link>
							</Button>
							<Button
								variant='outline'
								className='rounded-full'
								onClick={() => setIsModalOpen(false)}
							>
								Return to Pricing
							</Button>
						</DialogFooter>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
