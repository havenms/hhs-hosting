'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, LogIn, ExternalLink } from 'lucide-react';

interface SiteHeaderProps {
	siteData: {
		name: string;
		domain: string;
		status: 'pre-build' | 'building' | 'deployed';
	};
	activeSection: string;
	setActiveSection: (section: string) => void;
	mounted: boolean;
}

export function SiteHeader({
	siteData,
	activeSection,
	setActiveSection,
	mounted,
}: SiteHeaderProps) {
	const isPreBuild = siteData.status === 'pre-build';
	const isBuilding = siteData.status === 'building';
	const isDeployed = siteData.status === 'deployed';

	return (
		<motion.div
			initial={mounted ? { opacity: 0, y: 20 } : false}
			animate={mounted ? { opacity: 1, y: 0 } : false}
			transition={{ duration: 0.5 }}
			className='mb-8'
		>
			<div className='flex flex-wrap justify-between items-center mb-4 gap-4'>
				<div>
					<h1 className='text-3xl font-bold mb-1'>{siteData.name}</h1>
					<div className='flex items-center gap-2 text-muted-foreground'>
						<Globe className='h-4 w-4' />
						<span>{siteData.domain}</span>
						<Badge
							variant='outline'
							className={`
                ${
					isDeployed
						? 'bg-green-100 text-green-800 border-green-200'
						: ''
				}
                ${
					isBuilding
						? 'bg-amber-100 text-amber-800 border-amber-200'
						: ''
				}
                ${isPreBuild ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
              `}
						>
							{isDeployed
								? 'Live'
								: isBuilding
								? 'In Development'
								: 'Planning'}
						</Badge>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					{isDeployed && (
						<Button
							className='flex items-center gap-2'
							asChild
						>
							<Link
								href={`https://${siteData.domain}/wp-admin`}
								target='_blank'
							>
								<LogIn className='h-4 w-4' />
								WordPress Admin
								<ExternalLink className='h-3 w-3 ml-1' />
							</Link>
						</Button>
					)}
				</div>
			</div>

			{/* Simple Section Tabs */}
			<Tabs
				value={activeSection}
				onValueChange={setActiveSection}
				className='w-full'
			>
				<TabsList className='grid w-full grid-cols-2 mb-8'>
					<TabsTrigger value='overview'>
						Your WordPress Site
					</TabsTrigger>
					<TabsTrigger value='analytics'>Site Analytics</TabsTrigger>
				</TabsList>
			</Tabs>
		</motion.div>
	);
}
