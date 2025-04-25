'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiscoMode } from '@/components/disco-mode';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ArrowRight, MessageSquare, HelpCircle, Clock } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';

// Import components
import { PageHeader } from '@/app/support/components/layout/PageHeader';
import { SupportTabs } from '@/app/support/components/layout/SupportTabs';
import { ContactForm } from '@/app/support/components/contact/ContactForm';
import { FAQSection } from '@/app/support/components/faq/FAQSection';
import { TicketHistory } from '@/app/support/components/tickets/TicketHistory';

export default function SupportPage() {
	const { user, isLoading } = useAuth();
	const [activeTab, setActiveTab] = useState('contact');
	const [mounted, setMounted] = useState(false);

	// No need for UserViewWrapper here since protection is handled by layout

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleTabChange = (value) => {
		setTimeout(() => {
			setActiveTab(value);
		}, 50);
	};

	const getActiveTabIcon = () => {
		switch (activeTab) {
			case 'contact':
				return (
					<MessageSquare className='h-5 w-5 text-primary animate-pulse' />
				);
			case 'faq':
				return (
					<HelpCircle className='h-5 w-5 text-primary animate-pulse' />
				);
			case 'tickets':
				return <Clock className='h-5 w-5 text-primary animate-pulse' />;
			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen bg-background flex flex-col overflow-hidden'>
			<DiscoMode isLoading={isLoading} />

			{/* Decorative elements */}
			<div className='absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 blur-3xl'></div>
			<div className='absolute bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full -ml-48 blur-3xl'></div>

			<main className='container mx-auto px-4 py-12 flex-grow relative z-10'>
                    <motion.div
                      initial={mounted ? { opacity: 0, y: 20 } : false}
                      animate={mounted ? { opacity: 1, y: 0 } : false}
                      transition={{ duration: 0.5 }}
                    >
                      <PageHeader />
                    </motion.div>
            
                    <Tabs
                      defaultValue='contact'
                      value={activeTab}
                      onValueChange={handleTabChange}
                      className='space-y-8 mt-8'
                    >
                      <motion.div
                        initial={mounted ? { opacity: 0, y: 10 } : false}
                        animate={mounted ? { opacity: 1, y: 0 } : false}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <SupportTabs
                          activeTab={activeTab}
                          isLoggedIn={!!user}
                        />
                      </motion.div>
            
                      <div className='relative mt-6'>
                        {/* Status indicator */}
                        <div className='absolute -top-12 right-0 flex items-center space-x-2 text-sm text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50 shadow-sm'>
                          <span>Current section</span>
                          <span className='flex items-center gap-1.5 font-medium text-foreground'>
                            {getActiveTabIcon()}
                            {activeTab.charAt(0).toUpperCase() +
                              activeTab.slice(1)}
                          </span>
                        </div>
            
                        {/* Content with animations */}
                        <AnimatePresence mode='wait'>
                          <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className='relative'
                          >
                            <TabsContent
                              value='contact'
                              forceMount={activeTab === 'contact'}
                              className={
                                activeTab !== 'contact' ? 'hidden' : ''
                              }
                            >
                              <ContactForm onTabChange={setActiveTab} />
                            </TabsContent>
            
                            <TabsContent
                              value='faq'
                              forceMount={activeTab === 'faq'}
                              className={
                                activeTab !== 'faq' ? 'hidden' : ''
                              }
                            >
                              <FAQSection onTabChange={setActiveTab} />
                            </TabsContent>
            
                            <TabsContent
                              value='tickets'
                              forceMount={activeTab === 'tickets'}
                              className={
                                activeTab !== 'tickets' ? 'hidden' : ''
                              }
                            >
                              <TicketHistory
                                isLoggedIn={!!user}
                                onTabChange={setActiveTab}
                              />
                            </TabsContent>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </Tabs>
            
                   
                  </main>

			<footer className='bg-muted py-8 px-4 mt-auto relative z-10'>
				<div className='container mx-auto text-center text-muted-foreground'>
					<p>&copy; 2025 HHS Hosting. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
