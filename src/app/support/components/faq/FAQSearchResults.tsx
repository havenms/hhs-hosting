import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HelpCircle, FileQuestion, MessageSquare, Search } from 'lucide-react';
import type { FAQ } from '../../data/faqs';

interface FAQSearchResultsProps {
	faqs: FAQ[];
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onTabChange: (tab: string) => void;
}

export function FAQSearchResults({
	faqs,
	searchQuery,
	setSearchQuery,
	onTabChange,
}: FAQSearchResultsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Frequently Asked Questions</CardTitle>
				<CardDescription>
					Find answers to common questions about our hosting platform
				</CardDescription>

				<div className='relative mt-4'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Search FAQs...'
						className='pl-10'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</CardHeader>
			<CardContent>
				<div className='space-y-6'>
					{faqs.length === 0 ? (
						<div className='text-center py-8'>
							<FileQuestion className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
							<h3 className='text-lg font-medium'>
								No matching results
							</h3>
							<p className='text-muted-foreground'>
								Try adjusting your search or category filters
							</p>
						</div>
					) : (
						faqs.map((faq) => (
							<div
								key={faq.id}
								className='border border-border rounded-lg p-4'
							>
								<h3 className='text-lg font-medium mb-2 flex items-start'>
									<HelpCircle className='h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5' />
									<span>{faq.question}</span>
								</h3>
								<p className='text-muted-foreground pl-7'>
									{faq.answer}
								</p>
								<div className='mt-3 pl-7'>
									<span className='inline-block text-xs font-medium bg-muted px-2 py-1 rounded'>
										{faq.category.charAt(0).toUpperCase() +
											faq.category.slice(1)}
									</span>
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
			<CardFooter className='flex flex-col items-start border-t pt-6'>
				<h3 className='text-lg font-medium mb-2'>Still need help?</h3>
				<p className='text-muted-foreground mb-4'>
					If you can't find an answer to your question, you can always
					contact our support team.
				</p>
				<Button
					className='rounded-full'
					onClick={() => onTabChange('contact')}
				>
					<MessageSquare className='h-4 w-4 mr-2' />
					Contact Support
				</Button>
			</CardFooter>
		</Card>
	);
}
