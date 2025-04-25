import { HelpCircle } from 'lucide-react';
import { faqs } from '../data';

export function PricingFAQ() {
	return (
		<div className='mb-16'>
			<h2 className='text-3xl font-bold mb-8 text-center'>
				Frequently Asked Questions
			</h2>
			<div className='grid md:grid-cols-2 gap-8'>
				{faqs.map((faq, index) => (
					<div
						key={index}
						className='space-y-2'
					>
						<h3 className='text-xl font-semibold flex items-center'>
							<HelpCircle className='h-5 w-5 mr-2 text-primary' />
							{faq.question}
						</h3>
						<p className='text-muted-foreground pl-7'>
							{faq.answer}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
