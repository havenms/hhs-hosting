import { SupportTicket } from '../types';

export async function fetchTickets(
	searchTerm = '',
	statusFilter = '',
	priorityFilter = ''
): Promise<SupportTicket[]> {
	try {
		// Build query string for filters
		const params = new URLSearchParams();
		if (searchTerm) params.append('search', searchTerm);
		if (statusFilter && statusFilter !== 'all')
			params.append('status', statusFilter);
		if (priorityFilter && priorityFilter !== 'all')
			params.append('priority', priorityFilter);

		const queryString = params.toString() ? `?${params.toString()}` : '';
		console.log(`Admin: Fetching tickets with queryString: ${queryString}`);

		// Use the new admin API endpoint
		const response = await fetch(`/api/tickets/admin${queryString}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log('Admin: Tickets API response status:', response.status);

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Admin: Tickets API error:', errorData);
			throw new Error(errorData.error || `API error: ${response.status}`);
		}

		const tickets = await response.json();
		console.log('Admin: Received tickets:', tickets.length);

		return tickets;
	} catch (error) {
		console.error('Admin: Failed to fetch tickets:', error);
		throw error;
	}
}

// Mock data for development
export async function fetchTicketsMock(): Promise<SupportTicket[]> {
	return [
		{
			id: 'TKT-1234',
			subject: "Can't access WordPress admin",
			description:
				"I'm trying to log in to my WordPress dashboard but keep getting an error message saying my session has expired.",
			status: 'open',
			priority: 'high',
			dateOpened: new Date(Date.now() - 2 * 3600000).toISOString(),
			lastUpdated: new Date(Date.now() - 1 * 3600000).toISOString(),
			userEmail: 'client@example.com',
			userId: 'user_1',
			clientName: 'John Smith',
			siteName: 'Business Pro Site',
			category: 'technical',
			browser: 'Chrome 98.0.4758.102',
			lastUpdateNote: 'Checking authentication logs',
			assignedTo: 'Sarah',
			attachments: [
				{
					name: 'error-screenshot.png',
					size: '245 KB',
					url: '#',
				},
			],
		},
		// Add more mock tickets if needed
	];
}
