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
		<section className='mt-6 md:mt-8 flex flex-col w-full'>
			<h2 className='text-xl sm:text-2xl font-semibold mb-3 md:mb-4'>
				{isDeployed
					? 'Your WordPress Site'
					: isBuilding
					? 'Your Project'
					: 'Getting Started'}
			</h2>
			<Card className='overflow-hidden flex-1 flex flex-col'>
				<CardHeader className='px-4 sm:px-6 py-4 sm:py-5 mx-auto w-full max-w-2xl'>
					<div className='flex flex-row items-center justify-between'>
						<CardTitle className='text-lg sm:text-xl mr-2 flex-grow truncate'>
							{siteData.name}
						</CardTitle>
						<Badge
							variant={isDeployed ? 'default' : 'outline'}
							className='flex-shrink-0'
						>
							{isDeployed
								? 'Live'
								: isBuilding
								? 'In Progress'
								: 'Not Started'}
						</Badge>
					</div>
					{(isBuilding || isDeployed) && (
						<div className='text-sm text-muted-foreground truncate mt-1'>
							{siteData.domain}
						</div>
					)}
				</CardHeader>

				<CardContent className='px-4 sm:px-6 pb-0 flex-grow flex flex-col'>
					<div className='flex flex-col gap-4 sm:gap-5 flex-grow max-w-2xl mx-auto w-full'>
						
						{/* Building State */}
						{isBuilding && (
							<div className='flex flex-col gap-4 sm:gap-5 flex-grow'>
								<div className='bg-muted p-3 sm:p-4 rounded-lg flex-grow'>
									<h3 className='font-medium mb-2 text-sm sm:text-base'>
										Project Stage
									</h3>
									<div className='flex items-center'>
										<RefreshCw className='h-4 w-4 text-primary mr-2 animate-spin flex-shrink-0' />
										<span className='text-sm'>
											Development in progress
										</span>
									</div>
								</div>
								
							</div>
						)}

						{/* Deployed State */}
						{isDeployed && (
							<div className='flex flex-col gap-4 sm:gap-5 flex-grow'>
								{/* Site Stats Grid - Responsive from 1 to 2 columns */}
								<div className='flex flex-col sm:flex-row gap-3 w-full'>
									<div className='bg-muted p-3 sm:p-4 rounded-lg flex-1 flex flex-col'>
										<h4 className='text-xs sm:text-sm font-medium mb-1'>
											Last Updated
										</h4>
										<p className='font-medium'>
											{new Date(
												siteData.lastUpdated || ''
											).toLocaleDateString()}
										</p>
									</div>
									<div className='bg-muted p-3 sm:p-4 rounded-lg flex-1 flex flex-col'>
										<h4 className='text-xs sm:text-sm font-medium mb-1'>
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

								{/* Action Buttons - Responsive Row/Column layout */}
								<div className='flex flex-col sm:flex-row gap-3 w-full'>
									<Button
										variant='outline'
										size='sm'
										className='flex items-center justify-start h-auto py-2.5 flex-1 transition-transform hover:translate-y-[-2px]'
										asChild
									>
										<Link
											href={`https://${siteData.domain}/wp-admin`}
											target='_blank'
											rel='noopener'
											className='w-full flex items-center'
										>
											<LogIn className='h-4 w-4 mr-2 flex-shrink-0' />
											<span className='flex-grow text-left'>
												WordPress Admin
											</span>
											<ExternalLink className='h-3.5 w-3.5 flex-shrink-0 opacity-70 ml-auto' />
										</Link>
									</Button>

									<Button
										variant='outline'
										size='sm'
										className='flex items-center justify-start h-auto py-2.5 flex-1 transition-transform hover:translate-y-[-2px]'
										asChild
									>
										<Link
											href='/support'
											className='w-full flex items-center'
										>
											<FileText className='h-4 w-4 mr-2 flex-shrink-0' />
											<span className='flex-grow text-left'>
												Support
											</span>
										</Link>
									</Button>

									<Button
										variant='outline'
										size='sm'
										className='flex items-center justify-start h-auto py-2.5 flex-1 transition-transform hover:translate-y-[-2px]'
										asChild
									>
										<Link
											href={`/sites/${siteData.id}/settings`}
											className='w-full flex items-center'
										>
											<Settings className='h-4 w-4 mr-2 flex-shrink-0' />
											<span className='flex-grow text-left'>
												Site Settings
											</span>
										</Link>
									</Button>
								</div>

								{/* Site Health - Conditional Render */}
								{siteData &&
									siteData.needsUpdate !== undefined && (
										<div className='bg-muted p-3 sm:p-4 rounded-lg flex-grow flex flex-col max-w-md w-full mx-auto'>
											<h4 className='text-sm font-medium mb-2'>
												Site Health
											</h4>
											<div className='space-y-3 text-xs sm:text-sm flex-grow'>
												<div className='flex justify-between items-center'>
													<span className='flex-grow'>
														WordPress Updates:
													</span>
													<span
														className={`flex-shrink-0 font-medium ${
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
													<span className='flex-grow'>
														Plugin Updates:
													</span>
													<span className='flex-shrink-0 font-medium'>
														{
															siteData.plugin_updates
														}
													</span>
												</div>
												<div className='flex justify-between items-center'>
													<span className='flex-grow'>
														Theme Updates:
													</span>
													<span className='flex-shrink-0 font-medium'>
														{siteData.theme_updates}
													</span>
												</div>
												{siteData.coreUpdates &&
													siteData.coreUpdates
														.needed && (
														<div className='text-amber-500 mt-3 text-xs sm:text-sm font-medium'>
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

				<CardFooter className='border-t mt-6 px-4 sm:px-6 py-4 sm:py-5'>
					<div className='w-full text-center text-xs sm:text-sm text-muted-foreground'>
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
