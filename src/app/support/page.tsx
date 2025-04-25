'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/components/auth-provider';
import { DiscoMode } from '@/components/disco-mode';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Import layout components
import { PageHeader } from './components/layout/PageHeader';
import { SupportTabs } from './components/layout/SupportTabs';

// Import tab content components
import { ContactForm } from './components/contact/ContactForm';
import { FAQSection } from './components/faq/FAQSection';
import { TicketHistory } from './components/tickets/TicketHistory';

export default function SupportPage() {
  const { user, isAdmin, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('contact');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  // Enable animations after mount to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Improved routing logic with a separate effect for redirection
  useEffect(() => {
    // Only run routing checks when auth state is determined
    if (!isLoading && mounted) {
      if (!user) {
        // Case 1: Not logged in user - redirect to home
        console.log('Not authenticated, redirecting to home');
        setRedirecting(true);
        router.push('/');
      } else if (isAdmin) {
        // Case 2: Admin user - redirect to dashboard
        console.log('Admin user, redirecting to dashboard');
        setRedirecting(true);
        router.push('/dashboard');
      } else {
        // Case 3: Regular user - show support page
        console.log('Regular user, showing support page');
        // No redirection needed
      }
    }
  }, [user, isAdmin, isLoading, mounted, router]);

  // Handle tab change with animation effect
  const handleTabChange = (value) => {
    setTimeout(() => {
      setActiveTab(value);
    }, 50);
  };

  // Get icon for active tab
  const getActiveTabIcon = () => {
    switch (activeTab) {
      case 'contact': return <MessageSquare className='h-5 w-5 text-primary animate-pulse' />;
      case 'faq': return <HelpCircle className='h-5 w-5 text-primary animate-pulse' />;
      case 'tickets': return <Clock className='h-5 w-5 text-primary animate-pulse' />;
      default: return null;
    }
  };

  // Show loading state while checking authentication or redirecting
  if (isLoading || !mounted || redirecting) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <Loader2 className='h-10 w-10 text-primary animate-spin mb-4' />
        <p className='text-muted-foreground'>
          {isLoading ? 'Loading...' : 'Redirecting...'}
        </p>
      </div>
    );
  }

  // Show 404/access denied for wrong user types (should not happen with routing logic,
  // but added as a fallback)
  if (!user || isAdmin) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <p className='text-xl font-bold mb-2'>Access Denied</p>
        <p className='text-muted-foreground mb-6'>You don't have access to this page.</p>
        <button 
          onClick={() => router.push('/')}
          className='text-primary hover:underline'
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Render support page content only for authenticated regular users
  return (
    <div className='min-h-screen bg-background flex flex-col overflow-hidden'>
      <Navbar />
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

        {/* Quick help section */}
        <div className='mt-16 bg-background border rounded-lg p-6 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent -mr-20 -mt-20 rounded-full'></div>
          <div className='relative z-10'>
            <h3 className='text-xl font-bold mb-3'>
              Need immediate assistance?
            </h3>
            <p className='text-muted-foreground mb-4'>
              Our chat support is available during business hours
              for urgent questions.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className='flex items-center text-primary hover:text-primary/90 font-medium transition-colors'
            >
              Start Live Chat{' '}
              <ArrowRight className='h-4 w-4 ml-2' />
            </motion.button>
          </div>
        </div>
      </main>

      <footer className='bg-muted py-8 px-4 mt-auto relative z-10'>
        <div className='container mx-auto text-center text-muted-foreground'>
          <p>&copy; 2025 HHS Hosting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
