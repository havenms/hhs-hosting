export interface FAQ {
	id: number;
	category: string;
	question: string;
	answer: string;
}

export const faqs: FAQ[] = [
	{
		id: 1,
		category: 'domains',
		question: 'How do I connect a custom domain to my site?',
		answer: 'To connect a custom domain, go to your site settings and click "Add Domain". You\'ll need to update your DNS settings at your domain registrar. Point your A record to our IP address (145.32.44.75) and your CNAME record for "www" to your-site.hhshosting.com.',
	},
	{
		id: 2,
		category: 'domains',
		question: 'How long does domain propagation take?',
		answer: 'Domain changes can take anywhere from 15 minutes to 48 hours to fully propagate across the internet. This depends on your DNS provider and various caching settings.',
	},
	{
		id: 3,
		category: 'billing',
		question: 'How do I downgrade my hosting plan?',
		answer: 'To downgrade your plan, visit the Billing page and click "Change Plan". Select your desired plan and follow the instructions. Note that downgrading takes effect at the end of your current billing cycle.',
	},
	{
		id: 4,
		category: 'billing',
		question: 'Will I get a refund if I cancel mid-month?',
		answer: "We don't offer prorated refunds for cancellations. Your service will continue until the end of your current billing period.",
	},
	{
		id: 5,
		category: 'technical',
		question: "How do I access my site's database?",
		answer: 'You can access your database through phpMyAdmin by logging into your cPanel. Go to your site settings, click "cPanel Access", then find the phpMyAdmin icon under the "Databases" section.',
	},
	{
		id: 6,
		category: 'technical',
		question: 'How do I set up an SSL certificate?',
		answer: "SSL certificates are automatically provisioned for all sites hosted with us. If you're having issues, please check that your domain is properly pointed to our servers first, then contact support if problems persist.",
	},
	{
		id: 7,
		category: 'account',
		question: 'How do I enable two-factor authentication?',
		answer: 'To enable 2FA, go to your Profile page and click on "Security". Under the two-factor authentication section, click "Enable" and follow the steps to scan the QR code with your authenticator app.',
	},
	{
		id: 8,
		category: 'account',
		question: 'How do I reset my password?',
		answer: 'Click the "Forgot Password" link on the login page. Enter your email address and we\'ll send you instructions to reset your password. For security reasons, password reset links expire after 24 hours.',
	},
];
