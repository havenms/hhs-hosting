'use client';

import {
	PageTrafficTable,
	DeviceBreakdown,
	VisitorInsights,
} from './AnalyticsComponents';

interface DetailedAnalyticsProps {
	isDeployed: boolean;
}

export function DetailedAnalytics({ isDeployed }: DetailedAnalyticsProps) {
	if (!isDeployed) return null;

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
			<PageTrafficTable />
			<DeviceBreakdown />
			<VisitorInsights />
		</div>
	);
}
