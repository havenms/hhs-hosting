'use client';

import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectsOverviewProps {
	projects: any[];
}

export function ProjectsOverview({ projects }: ProjectsOverviewProps) {
	// Helper function to format dates
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	// Helper function to calculate days remaining
	const getDaysRemaining = (dateString: string) => {
		const today = new Date();
		const targetDate = new Date(dateString);
		const diffTime = targetDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 0 ? diffDays : 0;
	};

	// Sort projects by upcoming completion date and take first 3
	const upcomingProjects = [...projects]
		.sort(
			(a, b) =>
				new Date(a.estimatedCompletion).getTime() -
				new Date(b.estimatedCompletion).getTime()
		)
		.slice(0, 3);

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Calendar className='h-5 w-5 text-primary' />
					Upcoming Projects
				</CardTitle>
				<CardDescription>
					Site projects due in the next 14 days
				</CardDescription>
			</CardHeader>
			<CardContent className='p-0'>
				<div className='divide-y'>
					{upcomingProjects.map((project) => (
						<div
							key={project.id}
							className='flex items-center justify-between p-4'
						>
							<div>
								<p className='font-medium'>
									{project.siteName}
								</p>
								<p className='text-sm text-muted-foreground'>
									{project.clientName} • {project.stage}
								</p>
							</div>
							<div className='text-right'>
								<p className='text-sm font-medium'>
									{formatDate(project.estimatedCompletion)}
								</p>
								<p className='text-xs text-muted-foreground'>
									{getDaysRemaining(
										project.estimatedCompletion
									)}{' '}
									days left
								</p>
							</div>
						</div>
					))}
					{upcomingProjects.length === 0 && (
						<div className='p-4 text-center text-muted-foreground'>
							No upcoming project deadlines
						</div>
					)}
				</div>
			</CardContent>
			<CardFooter className='flex justify-center p-4'>
				<Button
					variant='outline'
					size='sm'
					asChild
				>
					<Link href='/admin/calendar'>
						<Calendar className='mr-2 h-4 w-4' />
						View Full Schedule
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
