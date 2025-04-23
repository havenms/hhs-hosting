'use client';

import { AdminDashboard } from '@/components/admin-dashboard';

export default function AdminPage() {
	// No auth checks here - let the layout handle it
	return <AdminDashboard />;
}
