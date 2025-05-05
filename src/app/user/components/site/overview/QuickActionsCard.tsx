'use client';

import Link from 'next/link';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, Shield, Settings, ExternalLink } from 'lucide-react';

interface QuickActionsCardProps {
	domain: string;
	siteStatus: 'pre-build' | 'building' | 'deployed';
}

export function QuickActionsCard({
	domain,
	siteStatus,
}: QuickActionsCardProps) {
	const isBuilding = siteStatus === 'building';
	const isDeployed = siteStatus === 'deployed';

	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
				<CardDescription>
					Manage your website and account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
					{isDeployed && (
						<Button
							variant='outline'
							className='h-auto py-3 justify-start'
							asChild
						>
							<Link
								href={`https://${domain}/wp-admin`}
								target='_blank'
								className='flex items-center'
							>
								<LogIn className='h-4 w-4 mr-2 flex-shrink-0' />
								<span className='text-left'>
									WordPress Admin
								</span>
								<ExternalLink className='h-3 w-3 ml-auto text-muted-foreground' />
							</Link>
						</Button>
					)}

					<Button
						variant='outline'
						className='h-auto py-3 justify-start'
						asChild
					>
						<Link
							href='/support'
							className='flex items-center'
						>
							<Shield className='h-4 w-4 mr-2 flex-shrink-0' />
							<span className='text-left'>Get Support</span>
						</Link>
					</Button>

					{(isBuilding || isDeployed) && (
						<Button
							variant='outline'
							className='h-auto py-3 justify-start'
							asChild
						>
							<Link
								href='/user/billing'
								className='flex items-center'
							>
								<Settings className='h-4 w-4 mr-2 flex-shrink-0' />
								<span className='text-left'>
									Account Settings
								</span>
							</Link>
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
