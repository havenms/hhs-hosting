'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import { ProjectDetailView } from './ProjectDetailView';
import { StageIndicator } from '../../shared/StatusBadges';
import { formatDate, getDaysRemaining } from '../../shared/utils';

export function ProjectsTab({ projects = [] }) {
	// Add default empty array to prevent undefined
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
	const [selectedProject, setSelectedProject] = useState(null);

	// Add null check before filtering
	const filteredProjects = projects
		? projects.filter((project) => {
				const matchesSearch =
					(project.clientName || '')
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					(project.siteName || '')
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					(project.domain || '')
						.toLowerCase()
						.includes(searchTerm.toLowerCase());

				const matchesStatus =
					filterStatus === 'all' || project.stage === filterStatus;

				return matchesSearch && matchesStatus;
		  })
		: [];

	return (
		<div className='space-y-4'>
			<div className='flex flex-col sm:flex-row gap-3 justify-between'>
				<div className='relative flex-1'>
					<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Search projects...'
						className='pl-8'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select
					value={filterStatus}
					onValueChange={setFilterStatus}
				>
					<SelectTrigger className='w-full sm:w-[200px]'>
						<SelectValue placeholder='Filter by status' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Stages</SelectItem>
						<SelectItem value='requirements'>
							Requirements
						</SelectItem>
						<SelectItem value='design'>Design</SelectItem>
						<SelectItem value='development'>Development</SelectItem>
						<SelectItem value='testing'>Testing</SelectItem>
						<SelectItem value='launch'>Launch</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Client</TableHead>
							<TableHead>Site</TableHead>
							<TableHead className='hidden md:table-cell'>
								Stage
							</TableHead>
							<TableHead className='hidden md:table-cell'>
								Progress
							</TableHead>
							<TableHead className='hidden lg:table-cell'>
								Est. Completion
							</TableHead>
							<TableHead className='hidden lg:table-cell'>
								Pending Actions
							</TableHead>
							<TableHead className='text-right'>
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredProjects.length > 0 ? (
							filteredProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell className='font-medium'>
										{project.clientName}
										<div className='text-xs text-muted-foreground hidden md:block'>
											{project.email}
										</div>
									</TableCell>
									<TableCell>
										{project.siteName}
										<div className='text-xs text-muted-foreground truncate max-w-[150px]'>
											{project.domain}
										</div>
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										<StageIndicator stage={project.stage} />
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										<div className='flex items-center gap-2'>
											<Progress
												value={project.progress}
												className='h-2 w-20'
											/>
											<span className='text-xs text-muted-foreground'>
												{project.progress}%
											</span>
										</div>
									</TableCell>
									<TableCell className='hidden lg:table-cell'>
										{formatDate(
											project.estimatedCompletion
										)}
									</TableCell>
									<TableCell className='hidden lg:table-cell'>
										{project.pendingActions &&
										project.pendingActions.length > 0 ? (
											<Badge
												variant='outline'
												className='bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
											>
												{project.pendingActions.length}{' '}
												action
												{project.pendingActions.length >
												1
													? 's'
													: ''}
											</Badge>
										) : (
											<Badge
												variant='outline'
												className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
											>
												None
											</Badge>
										)}
									</TableCell>
									<TableCell className='text-right'>
										<Sheet>
											<SheetTrigger asChild>
												<Button
													size='sm'
													variant='ghost'
													className='gap-1'
													onClick={() =>
														setSelectedProject(
															project
														)
													}
												>
													<span className='sr-only md:not-sr-only md:inline-block'>
														Manage
													</span>
													<ChevronRight className='h-4 w-4' />
												</Button>
											</SheetTrigger>
											<SheetContent className='w-full sm:max-w-xl overflow-auto'>
												<ProjectDetailView
													project={project}
												/>
											</SheetContent>
										</Sheet>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={7}
									className='h-24 text-center'
								>
									No projects found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
