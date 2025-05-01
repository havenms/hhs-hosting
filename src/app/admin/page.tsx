'use client';

import { AdminDashboard } from './components/dashboard'; // Updated import path

export default function AdminPage() {
	// No auth checks here - let the layout handle it
	return <AdminDashboard />;
}
