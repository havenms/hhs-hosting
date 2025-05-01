import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva('relative w-full rounded-lg border p-4', {
	variants: {
		variant: {
			default: 'bg-background text-foreground',
			destructive:
				'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
			success:
				'border-green-600/20 bg-green-50 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200 [&>svg]:text-green-600',
			warning:
				'border-yellow-600/20 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-200 [&>svg]:text-yellow-600',
			info: 'border-blue-600/20 bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200 [&>svg]:text-blue-600',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

const Alert = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		role='alert'
		className={cn(alertVariants({ variant }), className)}
		{...props}
	/>
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h5
		ref={ref}
		className={cn(
			'mb-1 font-medium leading-none tracking-tight',
			className
		)}
		{...props}
	/>
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('text-sm [&_p]:leading-relaxed', className)}
		{...props}
	/>
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
