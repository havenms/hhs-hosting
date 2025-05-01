export interface Attachment {
	name: string;
	size: string;
	url: string;
}

export interface SupportTicket {
	id: string;
	subject: string;
	description: string;
	status: 'open' | 'in-progress' | 'closed';
	priority: 'low' | 'medium' | 'high';
	dateOpened: string;
	lastUpdated?: string;
	clientName?: string;
	userEmail: string;
	userId: string;
	siteName?: string;
	category?: string;
	attachments?: Attachment[];
	assignedTo?: string;
	resolution?: string;
	closedDate?: string;
	closedBy?: string;
	browser?: string;
	lastUpdateNote?: string;
}

export interface TicketStats {
	total: number;
	open: number;
	inProgress: number;
	closed: number;
	highPriority: number;
}
