export const billingOptions = ['monthly', 'annually'] as const;

export const plans = [
    {
        name: 'Starter',
        description: 'Perfect for personal projects and small blogs',
        price: {
            monthly: '$9.99',
            annually: '$99.90',
        },
        savings: '$19.98 saved annually',
        features: [
            '1 website',
            '5GB storage',
            'Free SSL certificate',
            'Basic analytics',
            'Email support',
        ],
        limitations: [
            'No custom domains',
            'HHS Hosting subdomain only',
            'No priority support',
        ],
        color: 'primary',
        popular: false,
    },
    {
        name: 'Professional',
        description: 'Enhanced tools for growing businesses',
        price: {
            monthly: '$29.99',
            annually: '$299.90',
        },
        savings: '$59.98 saved annually',
        features: [
            '5 websites',
            '25GB storage',
            'Free SSL certificates',
            'Advanced analytics',
            'Priority support',
            'Custom domains',
            'Site backups',
        ],
        limitations: ['No white labeling', 'Limited API access'],
        color: 'secondary',
        popular: true,
    },
    {
        name: 'Enterprise',
        description: 'Maximum power for professional organizations',
        price: {
            monthly: '$99.99',
            annually: '$999.90',
        },
        savings: '$199.98 saved annually',
        features: [
            'Unlimited websites',
            '100GB storage',
            'Free SSL certificates',
            'Premium analytics',
            '24/7 dedicated support',
            'Custom domains',
            'White label options',
            'Custom integrations',
            'Advanced security',
            'Dedicated server resources',
        ],
        limitations: [],
        color: 'accent',
        popular: false,
    },
];

// Feature comparison table data
export const featureComparisonData = [
    {
        category: 'Websites & Storage',
        features: [
            {
                name: 'Number of websites',
                starter: '1',
                professional: '5',
                enterprise: 'Unlimited',
            },
            {
                name: 'Storage space',
                starter: '5GB',
                professional: '25GB',
                enterprise: '100GB',
            },
            {
                name: 'Bandwidth',
                starter: '50GB/month',
                professional: '250GB/month',
                enterprise: '1TB/month',
            },
        ],
    },
    {
        category: 'Domain & SSL',
        features: [
            {
                name: 'Free SSL certificate',
                starter: true,
                professional: true,
                enterprise: true,
            },
            {
                name: 'Custom domains',
                starter: false,
                professional: true,
                enterprise: true,
            },
            {
                name: 'Wildcard SSL',
                starter: false,
                professional: false,
                enterprise: true,
            },
        ],
    },
    {
        category: 'Support & Security',
        features: [
            {
                name: 'Support response time',
                starter: '24 hours',
                professional: '8 hours',
                enterprise: '1 hour',
            },
            {
                name: 'Dedicated account manager',
                starter: false,
                professional: false,
                enterprise: true,
            },
            {
                name: 'Advanced security',
                starter: false,
                professional: true,
                enterprise: true,
            },
            {
                name: 'Daily backups',
                starter: false,
                professional: true,
                enterprise: true,
            },
        ],
    },
    {
        category: 'Features & Tools',
        features: [
            {
                name: 'One-click installations',
                starter: true,
                professional: true,
                enterprise: true,
            },
            {
                name: 'Staging environments',
                starter: false,
                professional: true,
                enterprise: true,
            },
            {
                name: 'Git integration',
                starter: false,
                professional: true,
                enterprise: true,
            },
            {
                name: 'White labeling',
                starter: false,
                professional: false,
                enterprise: true,
            },
            {
                name: 'API access',
                starter: false,
                professional: 'Limited',
                enterprise: 'Full',
            },
        ],
    },
];

// Frequently asked questions
export const faqs = [
    {
        question: 'Can I upgrade or downgrade my plan at any time?',
        answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated difference for the remainder of your billing cycle. When you downgrade, your new rate will take effect at the start of your next billing cycle.",
    },
    {
        question: 'Is there a setup fee?',
        answer: 'No, there are no setup fees for any of our plans. You can get started immediately after subscribing.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans.',
    },
    {
        question: 'Do you offer a free trial?',
        answer: 'Yes! We offer a 14-day free trial on all plans with no credit card required. You can try all features before committing.',
    },
    {
        question: 'What happens when I reach my storage limit?',
        answer: "When you approach your storage limit, we'll notify you via email. You can either upgrade to a higher plan or remove files to free up space.",
    },
    {
        question: 'Can I cancel my subscription at any time?',
        answer: 'Yes, you can cancel your subscription at any time from your billing settings. There are no cancellation fees.',
    },
];