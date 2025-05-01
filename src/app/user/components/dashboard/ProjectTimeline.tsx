// src/components/dashboard/ProjectTimeline.tsx
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import Link from 'next/link';

interface TimelineItem {
	stage: string;
	completed: boolean;
	current?: boolean;
	date: string | null;
}



export function ProjectTimeline({ timeline }: ProjectTimelineProps) {
	const completionPercentage = Math.round(
		(timeline.filter((item) => item.completed).length / timeline.length) *
			100
	);

	return (
		<section className='mb-8'>
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center'>
						<Clock className='mr-2 h-5 w-5 text-primary' />
						Project Timelinez
					</CardTitle>
					<CardDescription>
						Track the progress of your website buildz
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-6'>
						{/* Progress bar */}
						<div className='relative pt-1'>
							<div className='flex mb-2 items-center justify-between'>
								<div>
									<span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground'>
										In Progress
									</span>
								</div>
								<div className='text-right'>
									<span className='text-xs font-semibold inline-block text-muted-foreground'>
										{completionPercentage}% Complete
									</span>
								</div>
							</div>
							<div className='overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-muted'>
								<div
									style={{
										width: `${completionPercentage}%`,
									}}
									className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary'
								></div>
							</div>
						</div>

						{/* Timeline steps */}
						<ol className='relative border-l border-primary/30'>
							{timeline.map((step, index) => (
								<li
									key={index}
									className='mb-6 ml-6'
								>
									<span
										className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
											step.completed
												? 'bg-primary text-primary-foreground'
												: step.current
												? 'bg-primary/20 border border-primary'
												: 'bg-muted'
										}`}
									>
										{step.completed ? (
											<CheckCircle2 className='w-3 h-3' />
										) : step.current ? (
											<Clock className='w-3 h-3 text-primary' />
										) : (
											<Circle className='w-3 h-3 text-muted-foreground' />
										)}
									</span>
									<h3
										className={`flex items-center mb-1 text-lg font-semibold ${
											step.completed
												? 'text-foreground'
												: step.current
												? 'text-primary'
												: 'text-muted-foreground'
										}`}
									>
										{step.stage.charAt(0).toUpperCase() +
											step.stage.slice(1)}
										{step.current && (
											<span className='bg-primary text-primary-foreground text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3'>
												Current
											</span>
										)}
									</h3>
									{step.completed && step.date && (
										<time className='block mb-2 text-xs font-normal leading-none text-muted-foreground'>
											Completed on{' '}
											{new Date(
												step.date
											).toLocaleDateString()}
										</time>
									)}
									{step.current && (
										<p className='mb-4 text-sm font-normal text-muted-foreground'>
											Our team is currently working on
											this stage.
										</p>
									)}
								</li>
							))}
						</ol>
					</div>
				</CardContent>
				<CardFooter className='border-t pt-6'>
					<div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4'>
						<div className='text-sm text-muted-foreground'>
							<span className='font-medium'>
								Estimated completion:
							</span>{' '}
							4-6 weeks from start date
						</div>
						<Button
							variant='outline'
							size='sm'
							className='rounded-full'
							asChild
						>
							<Link href='/support/timeline-question'>
								Have questions about the timeline?
							</Link>
						</Button>
					</div>
				</CardFooter>
			</Card>
		</section>
	);
}
