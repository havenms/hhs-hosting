// src/components/dashboard/index.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import { UserNavbar } from '@/components/user-navbar';
import { ProjectStageSwitcher } from './ProjectStageSwitcher';
import { PreBuildBanner } from './status-banners/PreBuildBanner';
import { BuildingBanner } from './status-banners/BuildingBanner';
import { DeployedBanner } from './status-banners/DeployedBanner';
import { SiteAnalytics } from './SiteAnalytics';
import { SiteInformation } from './SiteInformation';

// Mock data for the site at different stages (keep your existing data here)
const siteData = {
	id: 'site-1',
	name: 'My WordPress Site',
	domain: 'my-site.hhshosting.com',
	projectStage: 'building',
	visitors: [
		45, 38, 52, 48, 53, 39, 55, 42, 49, 50, 47, 54, 51, 46, 43, 55, 57, 52,
		54, 49, 51, 48, 53, 47, 56, 49, 52, 50, 48,
	],
	lastUpdated: '2023-05-15T14:30:00Z',
	timeline: [
		{ stage: 'requirements', completed: true, date: '2023-04-15' },
		{ stage: 'design', completed: true, date: '2023-05-01' },
		{
			stage: 'development',
			completed: false,
			date: null,
			current: true,
		},
		{ stage: 'content', completed: false, date: null },
		{ stage: 'testing', completed: false, date: null },
		{ stage: 'launch', completed: false, date: null },
	],
	// Add these properties needed for the deployed state
	needsUpdate: false,
	plugin_updates: 2,
	theme_updates: 0,
	wp_update: true,
	lastBackup: '2023-05-14T10:00:00Z',
	securityStatus: 'secure',
	uptime: 99.9,
	sslExpiry: '2024-05-15',
	coreUpdates: {
		needed: true,
		version: '6.4.2',
	},
};

export function Dashboard() {
	const { user, isAdmin } = useAuth();
	// Simulation state for project stage
	const [simulatedStage, setSimulatedStage] = useState('building');

	// Determine current site state based on simulated stage
	const isPreBuild = simulatedStage === 'pre-build';
	const isBuilding = simulatedStage === 'building';
	const isDeployed = simulatedStage === 'deployed';

	return (
		<div className='min-h-screen min-w-screen bg-background flex flex-col justify-center overflow-x-hidden'>
			<UserNavbar />

			<div className='flex mx-auto w-full sm:max-w-7xl lg:w-80vw'>
				<main className='flex-1 container px-4 py-8'>
					<ProjectStageSwitcher
						value={simulatedStage}
						onChange={setSimulatedStage}
					/>

					<section className='mb-8'>
						{isPreBuild && <PreBuildBanner />}
						{isBuilding && (
							<BuildingBanner domain={siteData.domain} />
						)}
						{isDeployed && <DeployedBanner />}
					</section>

				

					{isDeployed && (
						<SiteAnalytics visitors={siteData.visitors} />
					)}

					<SiteInformation
						siteData={siteData}
						isPreBuild={isPreBuild}
						isBuilding={isBuilding}
						isDeployed={isDeployed}
					/>
				</main>
			</div>

			<footer className='bg-muted py-4 px-4 border-t border-border'>
				<div className='container mx-auto text-center text-sm text-muted-foreground'>
					<p>&copy; 2023 HHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
