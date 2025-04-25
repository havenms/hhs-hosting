import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, HelpCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SupportTabsProps {
	activeTab: string;
	isLoggedIn: boolean;
}

export function SupportTabs({ activeTab, isLoggedIn }: SupportTabsProps) {
	return (
		<div className='relative'>
			<TabsList className='grid grid-cols-3 max-w-xl mx-auto relative'>
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
						Contact Us
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

				<TabsTrigger
					value='tickets'
					className='text-base py-3 relative group transition-all duration-300'
					disabled={!isLoggedIn}
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
