'use client';

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProcessTab() {
	return (
		<div className='grid md:grid-cols-2 gap-4 sm:gap-8'>
			<div>
				<h2 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>
					Your Custom Site Journey
				</h2>
				<p className='text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6'>
					We've simplified the process of getting your professional
					WordPress site up and running. From consultation to launch,
					we handle all the technical details.
				</p>
				<ol className='space-y-4 sm:space-y-6'>
					<ProcessStep
						number='1'
						title='Initial Consultation'
						description='Schedule a meeting using our Calendly integration to discuss your needs and vision.'
						bgColor='bg-primary/10'
						hasButton={true}
					/>
					<ProcessStep
						number='2'
						title='Site Requirements'
						description='Fill out our comprehensive site requirements form to capture all your needs, which feeds directly into our Zoho CRM.'
						bgColor='bg-secondary/10'
					/>
					<ProcessStep
						number='3'
						title='Development & Feedback'
						description="Track your project's progress with our custom timeline tool, providing feedback throughout the build process."
						bgColor='bg-accent/10'
					/>
					<ProcessStep
						number='4'
						title='Launch & Support'
						description='Once approved, we launch your site and provide ongoing hosting and support through our ticketing system.'
						bgColor='bg-primary/10'
					/>
				</ol>
			</div>
			<div className='bg-muted p-4 sm:p-8 rounded-lg flex flex-col h-full'>
				<h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
					Project Timeline
				</h3>
				<div className='bg-background p-3 sm:p-4 rounded-lg mb-4 flex-grow'>
					<ProjectProgress />
					<div className='space-y-3 sm:space-y-4 mt-4'>
						<ProjectStage
							name='Requirements Gathering'
							date='Completed: Jan 15, 2023'
							status='completed'
						/>
						<ProjectStage
							name='Design Approval'
							date='Completed: Jan 22, 2023'
							status='completed'
						/>
						<ProjectStage
							name='Development'
							date='In Progress'
							status='active'
						/>
						<ProjectStage
							name='Testing'
							date='Upcoming'
							status='pending'
						/>
						<ProjectStage
							name='Launch'
							date='Scheduled: Feb 15, 2023'
							status='pending'
						/>
					</div>
				</div>
				<div className='mt-auto'>
					<div className='p-3 sm:p-4 bg-background/50 rounded-lg'>
						<div className='text-xs sm:text-sm font-semibold mb-1'>
							Average Timeline
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-xs sm:text-sm'>
								Consultation to Launch:
							</span>
							<span className='font-bold'>4-6 weeks</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ProcessStep({
	number,
	title,
	description,
	bgColor,
	hasButton = false,
}) {
	return (
		<li className='flex items-start'>
			<div
				className={`mr-3 sm:mr-4 mt-1 ${bgColor} p-1.5 sm:p-2 rounded-full text-center min-w-[28px] sm:min-w-[32px] flex-shrink-0`}
			>
				<span className='font-bold text-sm sm:text-base'>{number}</span>
			</div>
			<div>
				<h3 className='font-semibold text-base sm:text-lg'>{title}</h3>
				<p className='text-sm sm:text-base text-muted-foreground mb-2'>
					{description}
				</p>
				{hasButton && (
					<Button
						variant='outline'
						size='sm'
						className='rounded-full text-xs sm:text-sm'
					>
						<Calendar className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
						Schedule Consultation
					</Button>
				)}
			</div>
		</li>
	);
}

function ProjectProgress() {
	return (
		<div className='relative pt-1'>
			<div className='flex mb-2 items-center justify-between'>
				<div>
					<span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground'>
						Current Phase
					</span>
				</div>
				<div className='text-right'>
					<span className='text-xs font-semibold inline-block text-muted-foreground'>
						75% Complete
					</span>
				</div>
			</div>
			<div className='overflow-hidden h-1.5 sm:h-2 mb-4 text-xs flex rounded-full bg-muted'>
				<div
					style={{ width: '75%' }}
					className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary'
				></div>
			</div>
		</div>
	);
}

function ProjectStage({ name, date, status }) {
	const getStatusColor = () => {
		switch (status) {
			case 'completed':
				return 'bg-green-500';
			case 'active':
				return 'bg-primary';
			default:
				return 'bg-gray-300';
		}
	};

	const getTextStyle = () => {
		return status === 'pending' ? 'text-muted-foreground' : '';
	};

	return (
		<div className='flex items-center'>
			<div
				className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full ${getStatusColor()} mr-2`}
			></div>
			<div className='flex-1'>
				<p
					className={`font-medium text-sm sm:text-base ${getTextStyle()}`}
				>
					{name}
				</p>
				<p className='text-xs text-muted-foreground'>{date}</p>
			</div>
		</div>
	);
}
