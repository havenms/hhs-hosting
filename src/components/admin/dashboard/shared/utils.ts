// src/components/admin/dashboard/shared/utils.ts
export function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export function getDaysRemaining(dateString) {
	const today = new Date();
	const targetDate = new Date(dateString);
	const diffTime = targetDate - today;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays > 0 ? diffDays : 0;
}
