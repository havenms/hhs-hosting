import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { billingOptions } from '../data';

interface BillingToggleProps {
	billingInterval: 'monthly' | 'annually';
	setBillingInterval: (value: 'monthly' | 'annually') => void;
}

export function BillingToggle({
	billingInterval,
	setBillingInterval,
}: BillingToggleProps) {
	return (
		<div className='flex justify-center mb-12'>
			<Tabs
				defaultValue='monthly'
				value={billingInterval}
				onValueChange={(value) =>
					setBillingInterval(value as (typeof billingOptions)[number])
				}
				className='w-full max-w-md'
			>
				<TabsList className='grid grid-cols-2'>
					<TabsTrigger value='monthly'>Monthly</TabsTrigger>
					<TabsTrigger value='annually'>
						Annually
						<span className='ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary'>
							Save 15%
						</span>
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
