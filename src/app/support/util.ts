// src/app/support/utils.ts
export function formatDate(dateString: string) {
	if (!dateString) return 'N/A';

	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export function formatDateWithTime(dateString: string) {
	if (!dateString) return 'N/A';

	const date = new Date(dateString);
	return date.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
}

export function formatRelativeTime(dateString: string) {
	if (!dateString) return '';

	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return 'just now';
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 30) {
		return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
	}

	return formatDate(dateString);
}
