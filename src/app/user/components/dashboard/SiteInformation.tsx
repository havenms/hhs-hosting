import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ArrowRight,
	ExternalLink,
	FileText,
	LogIn,
	RefreshCw,
	Settings,
} from 'lucide-react';
import Link from 'next/link';

interface SiteInformationProps {
	siteData: {
		id: string;
		name: string;
		domain: string;
		needsUpdate?: boolean;
		plugin_updates?: number;
		theme_updates?: number;
		wp_update?: boolean;
		lastBackup?: string;
		securityStatus?: string;
		uptime?: number;
		sslExpiry?: string;
		coreUpdates?: {
			needed: boolean;
			version: string;
		};
	};
	isPreBuild: boolean;
	isBuilding: boolean;
	isDeployed: boolean;
}

export function SiteInformation({
	siteData,
	isPreBuild,
	isBuilding,
	isDeployed,
}: SiteInformationProps) {
	return (
		<section className='space-y-4'>
			<h2 className='text-xl font-semibold'>
				{isDeployed
					? 'Your WordPress Site'
					: isBuilding
					? 'Your Project'
					: 'Getting Started'}
			</h2>
			<Card>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle className='text-lg mr-2 truncate'>
							{siteData.name}
						</CardTitle>
						<Badge variant={isDeployed ? 'default' : 'outline'}>
							{isDeployed
								? 'Live'
								: isBuilding
								? 'In Progress'
								: 'Not Started'}
						</Badge>
					</div>
					{(isBuilding || isDeployed) && (
						<p className='text-sm text-muted-foreground truncate mt-1'>
							{siteData.domain}
						</p>
					)}
				</CardHeader>

				<CardContent>
					<div className='space-y-4'>
						{/* Building State */}
						{isBuilding && (
							<div className='space-y-4'>
								<div className='bg-muted p-4 rounded-lg'>
									<h3 className='font-medium mb-2 text-sm'>
										Project Stage
									</h3>
									<div className='flex items-center'>
										<RefreshCw className='h-4 w-4 text-primary mr-2 animate-spin' />
										<span className='text-sm'>
											Development in progress
										</span>
									</div>
								</div>
							</div>
						)}

						{/* Deployed State */}
						{isDeployed && (
							<div className='space-y-4'>
								{/* Site Stats Grid */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
									<div className='bg-muted p-4 rounded-lg'>
										<h4 className='text-sm font-medium mb-1'>
											Last Updated
										</h4>
										<p className='font-medium'>
											{new Date(
												siteData.lastUpdated || ''
											).toLocaleDateString()}
										</p>
									</div>
									<div className='bg-muted p-4 rounded-lg'>
										<h4 className='text-sm font-medium mb-1'>
											Monthly Visitors
										</h4>
										<p className='font-medium'>
											{siteData.visitors?.reduce(
												(sum, count) => sum + count,
												0
											)}
										</p>
									</div>
								</div>

								{/* Action Buttons */}
								<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
									<Button
										variant='outline'
										className='h-auto py-2.5 justify-start'
										asChild
									>
										<Link
											href={`https://${siteData.domain}/wp-admin`}
											target='_blank'
											rel='noopener'
											className='flex items-center w-full'
										>
											<LogIn className='h-4 w-4 mr-2' />
											<span className='flex-grow text-left'>
												WordPress Admin
											</span>
											<ExternalLink className='h-3.5 w-3.5 opacity-70 ml-auto' />
										</Link>
									</Button>

									<Button
										variant='outline'
										className='h-auto py-2.5 justify-start'
										asChild
									>
										<Link
											href='/support'
											className='flex items-center w-full'
										>
											<FileText className='h-4 w-4 mr-2' />
											<span className='flex-grow text-left'>
												Support
											</span>
										</Link>
									</Button>

									<Button
										variant='outline'
										className='h-auto py-2.5 justify-start'
										asChild
									>
										<Link
											href={`/sites/${siteData.id}/settings`}
											className='flex items-center w-full'
										>
											<Settings className='h-4 w-4 mr-2' />
											<span className='flex-grow text-left'>
												Site Settings
											</span>
										</Link>
									</Button>
								</div>

								{/* Site Health */}
								{siteData &&
									siteData.needsUpdate !== undefined && (
										<div className='bg-muted p-4 rounded-lg'>
											<h4 className='text-sm font-medium mb-2'>
												Site Health
											</h4>
											<div className='space-y-3 text-sm'>
												<div className='flex justify-between items-center'>
													<span>
														WordPress Updates:
													</span>
													<span
														className={`font-medium ${
															siteData.wp_update
																? 'text-amber-500'
																: 'text-green-500'
														}`}
													>
														{siteData.wp_update
															? 'Available'
															: 'Up to date'}
													</span>
												</div>
												<div className='flex justify-between items-center'>
													<span>Plugin Updates:</span>
													<span className='font-medium'>
														{
															siteData.plugin_updates
														}
													</span>
												</div>
												<div className='flex justify-between items-center'>
													<span>Theme Updates:</span>
													<span className='font-medium'>
														{siteData.theme_updates}
													</span>
												</div>
												{siteData.coreUpdates &&
													siteData.coreUpdates
														.needed && (
														<div className='text-amber-500 mt-3 text-sm font-medium'>
															WordPress{' '}
															{
																siteData
																	.coreUpdates
																	.version
															}{' '}
															update available
														</div>
													)}
											</div>
										</div>
									)}
							</div>
						)}
					</div>
				</CardContent>

				<CardFooter className='border-t'>
					<div className='w-full text-center text-sm text-muted-foreground'>
						{isPreBuild &&
							'Submit your requirements to begin the process'}
						{isBuilding && 'Your site is currently in development'}
						{isDeployed && 'Your site is live and ready to manage'}
					</div>
				</CardFooter>
			</Card>
		</section>
	);
}
