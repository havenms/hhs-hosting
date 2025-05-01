'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

// Import component parts
import { SiteHeader } from '../components/site/header/SiteHeader';
import { SiteStatusCard } from '../components/site/overview/SiteStatusCard';
import { QuickActionsCard } from '../components/site/overview/QuickActionsCard';
import { AnalyticsOverview } from '../components/site/analytics/AnalyticsOverview';
import { DetailedAnalytics } from '../components/site/analytics/DetailedAnalytics';
import { ProjectStageSwitcher } from '../components/site/ProjectStageSwitcher';

// Mock data - this would come from API in production
const siteData = {
	id: 'site-123',
	name: 'My Business Website',
	domain: 'my-business.hhshosting.com',
	status: 'building', // Default status that will be overridden by state
	progress: 65,
	startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
	estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
	lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
	uptime: 99.98,
	pageviews: 2487,
	uniqueVisitors: 847,
	securityStatus: 'protected',
	pendingActions: [
		{
			id: 'action-1',
			title: 'Review homepage design',
			description:
				'Please review the homepage mockup and provide feedback',
			dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
			priority: 'high',
		},
	],
};

// Chart data for analytics
const visitorData = [
	{ day: 'Mon', visitors: 125 },
	{ day: 'Tue', visitors: 156 },
	{ day: 'Wed', visitors: 118 },
	{ day: 'Thu', visitors: 142 },
	{ day: 'Fri', visitors: 187 },
	{ day: 'Sat', visitors: 96 },
	{ day: 'Sun', visitors: 123 },
];

export default function SiteOverviewPage() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { user, isLoading } = useAuth();
	const [mounted, setMounted] = useState(false);
	const [activeSection, setActiveSection] = useState('overview');
	// Add state for site stage
	const [siteStage, setSiteStage] = useState('building');

	useEffect(() => {
		setMounted(true);
	}, []);

	// Helper functions
	const formatDate = (date) => {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		}).format(date);
	};

	const getDaysRemaining = () => {
		if (!siteData.estimatedCompletion) return 'N/A';
		const today = new Date();
		const diffTime = siteData.estimatedCompletion - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 0 ? diffDays : 0;
	};

	// Determine site status based on the stage state
	const isBuilding = siteStage === 'building';
	const isDeployed = siteStage === 'deployed';

	// Create a copy of siteData with the current stage
	const currentSiteData = {
		...siteData,
		status: siteStage,
	};

	// Loading state
	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Loader2 className='h-8 w-8 animate-spin text-primary' />
			</div>
		);
	}

	return (
		<div className='container max-w-6xl mx-auto py-8 px-4'>
			{/* Add the ProjectStageSwitcher */}
			<ProjectStageSwitcher
				value={siteStage}
				onChange={setSiteStage}
			/>

			{/* Site Header with Status */}
			<SiteHeader
				siteData={currentSiteData}
				activeSection={activeSection}
				setActiveSection={setActiveSection}
				mounted={mounted}
			/>

			{/* Main Content Area */}
			<motion.div
				key={activeSection}
				initial={mounted ? { opacity: 0, y: 10 } : false}
				animate={mounted ? { opacity: 1, y: 0 } : false}
				transition={{ duration: 0.4 }}
			>
				{/* OVERVIEW SECTION */}
				{activeSection === 'overview' && (
					<div className='space-y-6'>
						<SiteStatusCard
							siteData={currentSiteData}
							formatDate={formatDate}
							getDaysRemaining={getDaysRemaining}
						/>

						

						<QuickActionsCard
							domain={currentSiteData.domain}
							siteStatus={siteStage}
						/>
					</div>
				)}

				{/* ANALYTICS SECTION */}
				{activeSection === 'analytics' && (
					<div className='space-y-6'>
						<AnalyticsOverview
							isDeployed={isDeployed}
							isBuilding={isBuilding}
							pageviews={currentSiteData.pageviews}
							uniqueVisitors={currentSiteData.uniqueVisitors}
							visitorData={visitorData}
						/>

						<DetailedAnalytics isDeployed={isDeployed} />
					</div>
				)}
			</motion.div>
		</div>
	);
}
