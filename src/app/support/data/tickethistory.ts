export interface Ticket {
	id: string;
	subject: string;
	createdAt: string;
	status: string;
	priority: string;
	lastUpdated: string;
	messages: number;
}

export const ticketHistory: Ticket[] = [
	{
		id: 'TKT-1234',
		subject: "Can't access cPanel",
		createdAt: '2023-05-10T14:32:00Z',
		status: 'Closed',
		priority: 'High',
		lastUpdated: '2023-05-10T16:45:00Z',
		messages: 3,
	},
	{
		id: 'TKT-1235',
		subject: 'Need help with domain configuration',
		createdAt: '2023-05-12T09:15:00Z',
		status: 'Open',
		priority: 'Medium',
		lastUpdated: '2023-05-14T11:20:00Z',
		messages: 5,
	},
	{
		id: 'TKT-1236',
		subject: 'Billing cycle question',
		createdAt: '2023-05-15T11:45:00Z',
		status: 'Open',
		priority: 'Low',
		lastUpdated: '2023-05-15T13:10:00Z',
		messages: 2,
	},
	{
		id: 'TKT-1237',
		subject: 'Site loading slowly',
		createdAt: '2023-05-05T15:30:00Z',
		status: 'Closed',
		priority: 'Medium',
		lastUpdated: '2023-05-07T10:15:00Z',
		messages: 6,
	},
];
