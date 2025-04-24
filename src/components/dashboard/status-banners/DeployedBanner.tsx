'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	CheckCircle2,
	FileEdit,
	ExternalLink,
	RefreshCw,
	Copy,
	Check,
	Clock,
	BarChart3,
	ShieldCheck,
} from 'lucide-react';
import { ActionButton, ActionButtonGroup } from '../shared/ActionButtons';
import { cn } from '@/lib/utils';

interface DeployedBannerProps {
	domain: string;
}

export function DeployedBanner({ domain }: DeployedBannerProps) {
	// Interactive state
	const [copied, setCopied] = useState(false);
	const [showCelebration, setShowCelebration] = useState(true);
	const [uptime, setUptime] = useState(99.98);
	const [visitors, setVisitors] = useState(0);
	const [showStats, setShowStats] = useState(false);

	// Copy domain to clipboard
	const copyToClipboard = () => {
		navigator.clipboard.writeText(`https://${domain}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Simulate visitor counter
	useEffect(() => {
		const interval = setInterval(() => {
			setVisitors((prev) => prev + Math.floor(Math.random() * 2));
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	// Hide celebration after 3 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowCelebration(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='relative'>
			{/* Celebration overlay */}
			{showCelebration && (
				<div className='absolute inset-0 pointer-events-none z-10 overflow-hidden'>
					{[...Array(30)].map((_, i) => (
						<div
							key={i}
							className={cn(
								'absolute w-2 h-6 opacity-70',
								i % 3 === 0
									? 'bg-primary'
									: i % 3 === 1
									? 'bg-secondary'
									: 'bg-accent'
							)}
							style={{
								left: `${Math.random() * 100}%`,
								top: `-20px`,
								transform: `rotate(${Math.random() * 360}deg)`,
								animation: `fall 1.5s ease-in forwards ${
									i * 0.1
								}s`,
							}}
						/>
					))}
					<style jsx>{`
						@keyframes fall {
							0% {
								transform: translateY(0) rotate(0);
								opacity: 1;
							}
							100% {
								transform: translateY(500px) rotate(720deg);
								opacity: 0;
							}
						}
					`}</style>
				</div>
			)}

			<Card className='border-success transition-all duration-300 hover:shadow-md relative overflow-hidden'>
				<div className='absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-success/5 rounded-full'></div>
				<div className='absolute bottom-0 left-0 w-64 h-64 -ml-12 -mb-12 bg-success/5 rounded-full'></div>

				<CardHeader className='bg-success/10 border-b border-success/20 relative z-10'>
					<Badge
						variant='outline'
						className='mb-2 bg-success/20 text-success border-success w-fit animate-pulse'
					>
						Live
					</Badge>
					<CardTitle className='text-2xl flex items-center gap-2'>
						<CheckCircle2 className='h-6 w-6 text-success animate-bounce' />
						<span className='transition-transform hover:translate-x-1'>
							Your Website is Live!
						</span>
					</CardTitle>
					<CardDescription>
						Your website is successfully deployed and accessible to
						your visitors.
					</CardDescription>
				</CardHeader>

				<CardContent className='pt-6 relative z-10'>
					<div className='mb-4'>
						<div className='text-sm text-muted-foreground mb-2 flex justify-between'>
							<span>Your website URL:</span>
							<button
								onClick={() => setShowStats(!showStats)}
								className='text-xs text-primary hover:underline flex items-center gap-1'
							>
								{showStats ? 'Hide Stats' : 'Show Stats'}
								<BarChart3 className='h-3 w-3' />
							</button>
						</div>

						<div className='flex items-center gap-2 group p-1 -ml-1 rounded-md transition-colors hover:bg-success/5'>
							<a
								href={`https://${domain}`}
								target='_blank'
								rel='noopener noreferrer'
								className='font-medium text-lg group-hover:text-primary transition-colors'
							>
								{domain}
							</a>
							<Badge
								variant='outline'
								className='bg-green-100 text-green-800 border-green-200 group-hover:bg-green-200 transition-colors flex items-center gap-1'
							>
								<ShieldCheck className='h-3 w-3' />
								SSL Secure
							</Badge>
							<Button
								onClick={copyToClipboard}
								variant='ghost'
								size='sm'
								className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
							>
								{copied ? (
									<Check className='h-4 w-4 text-success' />
								) : (
									<Copy className='h-4 w-4' />
								)}
							</Button>
						</div>
					</div>

					{/* Real-time stats */}
					{showStats && (
						<div className='grid grid-cols-3 gap-2 my-4 animate-fade-in'>
							<div className='bg-muted/50 p-3 rounded-md text-center hover:bg-muted/80 transition-colors'>
								<div className='text-xs text-muted-foreground mb-1'>
									Uptime
								</div>
								<div className='font-medium text-success flex justify-center items-center gap-1'>
									<Clock className='h-3 w-3' />
									{uptime}%
								</div>
							</div>
							<div className='bg-muted/50 p-3 rounded-md text-center hover:bg-muted/80 transition-colors'>
								<div className='text-xs text-muted-foreground mb-1'>
									Status
								</div>
								<div className='font-medium text-success'>
									Healthy
								</div>
							</div>
							<div className='bg-muted/50 p-3 rounded-md text-center hover:bg-muted/80 transition-colors'>
								<div className='text-xs text-muted-foreground mb-1'>
									Visitors
								</div>
								<div className='font-medium'>{visitors}</div>
							</div>
						</div>
					)}

					<ActionButtonGroup>
						<ActionButton
							href={`https://${domain}`}
							icon={<ExternalLink className='h-4 w-4' />}
							className='bg-success hover:bg-success/80 text-white transition-transform hover:translate-y-[-2px]'
						>
							Visit Site
						</ActionButton>

						<ActionButton
							href='/backups'
							icon={<RefreshCw className='h-4 w-4' />}
							variant='outline'
							className='transition-transform hover:translate-y-[-2px]'
						>
							Manage Backups
						</ActionButton>

						<ActionButton
							href='/support/edit-request'
							icon={<FileEdit className='h-4 w-4' />}
							variant='outline'
							className='transition-transform hover:translate-y-[-2px]'
						>
							Request Changes
						</ActionButton>
					</ActionButtonGroup>
				</CardContent>
			</Card>
		</div>
	);
}
