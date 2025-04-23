import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { DiscoMode } from '@/components/disco-mode';
import { AuthProvider } from '@/components/auth-provider';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'HHS Hosting - Mid Century Modern',
	description: 'Hosting platform with a mid-century modern aesthetic',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ClerkProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='light'
						enableSystem
						disableTransitionOnChange
					>
						<AuthProvider>
							{children}
							<DiscoMode />
						</AuthProvider>
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
