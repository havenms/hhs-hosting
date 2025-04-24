// src/components/admin/dashboard/shared/StatusBadges.tsx
import { Badge } from '@/components/ui/badge';

export function StageIndicator({ stage }) {
	const stageColors = {
		requirements: {
			bg: 'bg-blue-100',
			text: 'text-blue-800',
			label: 'Requirements',
		},
		design: {
			bg: 'bg-purple-100',
			text: 'text-purple-800',
			label: 'Design',
		},
		development: {
			bg: 'bg-amber-100',
			text: 'text-amber-800',
			label: 'Development',
		},
		testing: {
			bg: 'bg-green-100',
			text: 'text-green-800',
			label: 'Testing',
		},
		launch: { bg: 'bg-teal-100', text: 'text-teal-800', label: 'Launch' },
	};

	const { bg, text, label } = stageColors[stage] || {
		bg: 'bg-gray-100',
		text: 'text-gray-800',
		label: stage,
	};

	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
		>
			{label}
		</span>
	);
}

export function RequestStatusBadge({ status }) {
	if (status === 'pending') {
		return (
			<Badge
				variant='outline'
				className='bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
			>
				Pending
			</Badge>
		);
	} else if (status === 'in-progress') {
		return (
			<Badge
				variant='outline'
				className='bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200'
			>
				In Progress
			</Badge>
		);
	} else {
		return (
			<Badge
				variant='outline'
				className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
			>
				Completed
			</Badge>
		);
	}
}

export function TicketStatusBadge({ status }) {
	if (status === 'open') {
		return (
			<Badge
				variant='outline'
				className='bg-red-100 text-red-800 hover:bg-red-100 border-red-200'
			>
				Open
			</Badge>
		);
	} else if (status === 'in-progress') {
		return (
			<Badge
				variant='outline'
				className='bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200'
			>
				In Progress
			</Badge>
		);
	} else {
		return (
			<Badge
				variant='outline'
				className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
			>
				Closed
			</Badge>
		);
	}
}

export function TicketPriorityBadge({ priority }) {
	if (priority === 'high') {
		return (
			<Badge
				variant='outline'
				className='bg-red-100 text-red-800 hover:bg-red-100 border-red-200'
			>
				High
			</Badge>
		);
	} else if (priority === 'medium') {
		return (
			<Badge
				variant='outline'
				className='bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
			>
				Medium
			</Badge>
		);
	} else {
		return (
			<Badge
				variant='outline'
				className='bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200'
			>
				Low
			</Badge>
		);
	}
}

export function UserStatusBadge({ status }) {
	if (status === 'active') {
		return (
			<Badge
				variant='outline'
				className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
			>
				Active
			</Badge>
		);
	} else if (status === 'pending') {
		return (
			<Badge
				variant='outline'
				className='bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
			>
				Pending
			</Badge>
		);
	} else {
		return (
			<Badge
				variant='outline'
				className='bg-red-100 text-red-800 hover:bg-red-100 border-red-200'
			>
				Inactive
			</Badge>
		);
	}
}
