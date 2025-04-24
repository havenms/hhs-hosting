import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	LifeBuoy,
	FileEdit,
	ExternalLink,
	ArrowRight,
	RefreshCw,
	Settings,
	Calendar,
	PlusCircle,
} from 'lucide-react';

interface ActionButtonProps {
	href: string;
	icon: React.ReactNode;
	children: React.ReactNode;
	variant?:
		| 'default'
		| 'outline'
		| 'ghost'
		| 'link'
		| 'destructive'
		| 'secondary';
	fullWidth?: boolean;
	onClick?: () => void;
}

export function ActionButton({
	href,
	icon,
	children,
	variant = 'default',
	fullWidth = false,
	onClick,
}: ActionButtonProps) {
	return (
		<Button
			variant={variant}
			className={`rounded-full ${fullWidth ? 'w-full' : ''}`}
			asChild={!!href}
			onClick={onClick}
		>
			{href ? (
				<Link href={href}>
					{icon}
					<span className='ml-2'>{children}</span>
				</Link>
			) : (
				<>
					{icon}
					<span className='ml-2'>{children}</span>
				</>
			)}
		</Button>
	);
}

// Pre-configured action buttons
export function SupportButton(props) {
	return (
		<ActionButton
			href='/support'
			icon={<LifeBuoy className='h-4 w-4' />}
			variant='outline'
			{...props}
		>
			Contact Support
		</ActionButton>
	);
}

export function EditSiteButton(props) {
	return (
		<ActionButton
			href='/site-edit'
			icon={<FileEdit className='h-4 w-4' />}
			{...props}
		>
			Request Edit
		</ActionButton>
	);
}

export function ViewSiteButton({ domain, ...props }) {
	return (
		<ActionButton
			href={`https://${domain}`}
			icon={<ExternalLink className='h-4 w-4' />}
			variant='outline'
			{...props}
		>
			Visit Site
		</ActionButton>
	);
}

export function BackupSiteButton(props) {
	return (
		<ActionButton
			href='/backups'
			icon={<RefreshCw className='h-4 w-4' />}
			variant='outline'
			{...props}
		>
			Site Backups
		</ActionButton>
	);
}

export function ScheduleMeetingButton(props) {
	return (
		<ActionButton
			href='/schedule'
			icon={<Calendar className='h-4 w-4' />}
			variant='outline'
			{...props}
		>
			Schedule Meeting
		</ActionButton>
	);
}

export function ActionButtonGroup({ children }) {
	return <div className='flex flex-wrap gap-3'>{children}</div>;
}
