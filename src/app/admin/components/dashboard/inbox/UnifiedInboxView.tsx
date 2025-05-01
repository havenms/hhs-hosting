'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronRight } from 'lucide-react';
import { formatDate } from '../../shared/utils';
import {
	RequestStatusBadge,
	TicketStatusBadge,
	TicketPriorityBadge,
} from '../../shared/StatusBadges';
import { EditRequestDetailView } from './RequestDetailView';
import { SupportTicketDetailView } from './TicketDetailView';

interface UnifiedInboxViewProps {
	editRequests: any[];
	supportTickets: any[];
}

export function UnifiedInboxView({
	editRequests,
	supportTickets,
}: UnifiedInboxViewProps) {
	const [viewMode, setViewMode] = useState('list');
	const [selectedItem, setSelectedItem] = useState<any>(null);

	// Combine all inbox items and sort by date (newest first)
	const allItems = [
		...editRequests.map((req) => ({ ...req, type: 'edit' })),
		...supportTickets.map((ticket) => ({ ...ticket, type: 'support' })),
	].sort((a, b) => {
		const dateA = new Date(a.requestDate || a.dateOpened);
		const dateB = new Date(b.requestDate || b.dateOpened);
		return dateB - dateA;
	});

	return (
		<div>
			{viewMode === 'list' ? (
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Type</TableHead>
								<TableHead>Client</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className='hidden md:table-cell'>
									Status
								</TableHead>
								<TableHead className='hidden md:table-cell'>
									Date
								</TableHead>
								<TableHead className='hidden lg:table-cell'>
									Priority
								</TableHead>
								<TableHead className='text-right'>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{allItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell>
										{item.type === 'edit' ? (
											<Badge
												variant='outline'
												className='bg-purple-100 text-purple-800 border-purple-200'
											>
												Edit Request
											</Badge>
										) : (
											<Badge
												variant='outline'
												className='bg-blue-100 text-blue-800 border-blue-200'
											>
												Support
											</Badge>
										)}
									</TableCell>
									<TableCell className='font-medium'>
										{item.clientName}
										<div className='text-xs text-muted-foreground truncate max-w-[150px]'>
											{item.siteName}
										</div>
									</TableCell>
									<TableCell>
										<div className='font-medium truncate max-w-[200px]'>
											{item.description || item.issue}
										</div>
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										{item.type === 'edit' ? (
											<RequestStatusBadge
												status={item.status}
											/>
										) : (
											<TicketStatusBadge
												status={item.status}
											/>
										)}
									</TableCell>
									<TableCell className='hidden md:table-cell'>
										{formatDate(
											item.requestDate || item.dateOpened
										)}
									</TableCell>
									<TableCell className='hidden lg:table-cell'>
										{item.priority && (
											<TicketPriorityBadge
												priority={item.priority}
											/>
										)}
									</TableCell>
									<TableCell className='text-right'>
										<Sheet>
											<SheetTrigger asChild>
												<Button
													size='sm'
													variant='ghost'
													className='gap-1'
													onClick={() =>
														setSelectedItem(item)
													}
												>
													<span className='sr-only md:not-sr-only md:inline-block'>
														View
													</span>
													<ChevronRight className='h-4 w-4' />
												</Button>
											</SheetTrigger>
											<SheetContent className='w-full sm:max-w-xl overflow-auto'>
												{item.type === 'edit' ? (
													<EditRequestDetailView
														request={item}
													/>
												) : (
													<SupportTicketDetailView
														ticket={item}
													/>
												)}
											</SheetContent>
										</Sheet>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{selectedItem && (
						<div className='col-span-2'>
							{selectedItem.type === 'edit' ? (
								<EditRequestDetailView
									request={selectedItem}
									onBack={() => setSelectedItem(null)}
								/>
							) : (
								<SupportTicketDetailView
									ticket={selectedItem}
									onBack={() => setSelectedItem(null)}
								/>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
