import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, HelpCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SupportTabsProps {
	activeTab: string;
	isLoggedIn: boolean;
}

export function SupportTabs({ activeTab }: SupportTabsProps) {
	return (
		<div className='border-b'>
			<TabsList className='w-full justify-start'>
				<TabsTrigger
					value='contact'
					className='text-base py-3 relative group transition-all duration-300'
				>
					<MessageSquare
						className={`w-4 h-4 mr-2 transition-all duration-300 ${
							activeTab === 'contact'
								? 'text-primary scale-110'
								: 'group-hover:scale-110'
						}`}
					/>
					<span className='relative'>
						Contact Support
						{activeTab === 'contact' && (
							<motion.span
								className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary'
								layoutId='activeTabLine'
							></motion.span>
						)}
					</span>
				</TabsTrigger>

				<TabsTrigger
					value='faq'
					className='text-base py-3 relative group transition-all duration-300'
				>
					<HelpCircle
						className={`w-4 h-4 mr-2 transition-all duration-300 ${
							activeTab === 'faq'
								? 'text-primary scale-110'
								: 'group-hover:scale-110'
						}`}
					/>
					<span className='relative'>
						FAQs
						{activeTab === 'faq' && (
							<motion.span
								className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary'
								layoutId='activeTabLine'
							></motion.span>
						)}
					</span>
				</TabsTrigger>

				{/* Make sure tickets tab is always enabled */}
				<TabsTrigger
					value='tickets'
					className='text-base py-3 relative group transition-all duration-300'
				>
					<Clock
						className={`w-4 h-4 mr-2 transition-all duration-300 ${
							activeTab === 'tickets'
								? 'text-primary scale-110'
								: 'group-hover:scale-110'
						}`}
					/>
					<span className='relative'>
						My Tickets
						{activeTab === 'tickets' && (
							<motion.span
								className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary'
								layoutId='activeTabLine'
							></motion.span>
						)}
					</span>
				</TabsTrigger>
			</TabsList>
		</div>
	);
}
