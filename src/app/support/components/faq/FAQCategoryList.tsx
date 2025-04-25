import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
	HelpCircle,
	Globe,
	CreditCard,
	DatabaseIcon,
	Lock,
} from 'lucide-react';

interface FAQCategoryListProps {
	selectedCategory: string;
	onSelectCategory: (category: string) => void;
}

export function FAQCategoryList({
	selectedCategory,
	onSelectCategory,
}: FAQCategoryListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-lg'>Categories</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-2'>
					<button
						onClick={() => onSelectCategory('all')}
						className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
							selectedCategory === 'all'
								? 'bg-primary text-primary-foreground'
								: 'hover:bg-muted/50'
						}`}
					>
						<HelpCircle className='h-4 w-4 mr-3' />
						<span>All Topics</span>
					</button>

					<button
						onClick={() => onSelectCategory('domains')}
						className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
							selectedCategory === 'domains'
								? 'bg-primary text-primary-foreground'
								: 'hover:bg-muted/50'
						}`}
					>
						<Globe className='h-4 w-4 mr-3' />
						<span>Domains</span>
					</button>

					<button
						onClick={() => onSelectCategory('billing')}
						className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
							selectedCategory === 'billing'
								? 'bg-primary text-primary-foreground'
								: 'hover:bg-muted/50'
						}`}
					>
						<CreditCard className='h-4 w-4 mr-3' />
						<span>Billing</span>
					</button>

					<button
						onClick={() => onSelectCategory('technical')}
						className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
							selectedCategory === 'technical'
								? 'bg-primary text-primary-foreground'
								: 'hover:bg-muted/50'
						}`}
					>
						<DatabaseIcon className='h-4 w-4 mr-3' />
						<span>Technical</span>
					</button>

					<button
						onClick={() => onSelectCategory('account')}
						className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
							selectedCategory === 'account'
								? 'bg-primary text-primary-foreground'
								: 'hover:bg-muted/50'
						}`}
					>
						<Lock className='h-4 w-4 mr-3' />
						<span>Account</span>
					</button>
				</div>
			</CardContent>
		</Card>
	);
}
