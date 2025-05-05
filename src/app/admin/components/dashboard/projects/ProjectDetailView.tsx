// src/components/admin/dashboard/projects/ProjectDetailView.tsx
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
	Eye,
	Edit,
	MessageCircle,
	ExternalLink,
} from 'lucide-react';
import { StageIndicator } from '../../shared/StatusBadges';

interface Project {
	siteName: string;
	clientName: string;
	stage: string;
	progress: number;
	pendingActions?: Array<unknown>;
}

interface ProjectDetailViewProps {
	project: Project;
	onClose?: () => void;
}

export function ProjectDetailView({
	project,
}: ProjectDetailViewProps) {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div>
			<SheetHeader className='border-b pb-4 mb-4'>
				<div className='flex items-center justify-between'>
					<SheetTitle className='text-xl'>
						{project.siteName}
					</SheetTitle>
					<StageIndicator stage={project.stage} />
				</div>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2'>
					<div className='text-sm text-muted-foreground'>
						Client:{' '}
						<span className='font-medium text-foreground'>
							{project.clientName}
						</span>
					</div>
					<div className='text-sm flex items-center'>
						<Progress
							value={project.progress}
							className='h-2 w-20 mr-2'
						/>
						<span className='text-xs'>
							{project.progress}% Complete
						</span>
					</div>
				</div>
			</SheetHeader>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<TabsList className='w-full mb-4'>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='timeline'>Timeline</TabsTrigger>
					<TabsTrigger value='user'>User Info</TabsTrigger>
					<TabsTrigger value='actions'>Actions</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent
					value='overview'
					className='space-y-4'
				>
					{/* Project details grid */}
					<div className='grid grid-cols-2 gap-3'>
						{/* Project detail cards */}
					</div>

					{/* Quick Actions */}
					<div>
						<h3 className='text-sm font-medium mb-2'>
							Quick Actions
						</h3>
						<div className='grid grid-cols-2 gap-2'>
							<Button
								size='sm'
								variant='outline'
							>
								<Eye className='h-4 w-4 mr-2' />
								Preview Site
							</Button>
							<Button
								size='sm'
								variant='outline'
							>
								<MessageCircle className='h-4 w-4 mr-2' />
								Contact Client
							</Button>
							<Button
								size='sm'
								variant='outline'
							>
								<Edit className='h-4 w-4 mr-2' />
								Edit Stage
							</Button>
							<Button
								size='sm'
								variant='outline'
							>
								<ExternalLink className='h-4 w-4 mr-2' />
								Access WP Admin
							</Button>
						</div>
					</div>

					{/* Pending Actions (Conditional) */}
					{project.pendingActions &&
						project.pendingActions.length > 0 && (
							<div>{/* Pending actions content */}</div>
						)}
				</TabsContent>

				{/* Additional tabs implementation */}
				<TabsContent
					value='timeline'
					className='space-y-4'
				>
					{/* Timeline content */}
				</TabsContent>

				<TabsContent
					value='user'
					className='space-y-4'
				>
					{/* User info content */}
				</TabsContent>

				<TabsContent
					value='actions'
					className='space-y-4'
				>
					{/* Actions content */}
				</TabsContent>
			</Tabs>
		</div>
	);
}
