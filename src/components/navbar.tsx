'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { LoginModal } from '@/components/login-modal';

const navigation = [
];

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className='sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b border-border'>
			<div className='mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo and site name */}
					<div className='flex items-center'>
						<Link
							href='/'
							className='flex items-center'
						>
							<Logo />
						</Link>
					</div>

					{/* Desktop navigation */}
					<div className='hidden md:flex items-center space-x-8'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='text-foreground hover:text-primary transition-colors'
							>
								{item.name}
							</Link>
						))}
						<LoginModal />
						<ThemeToggle />
					</div>

					{/* Mobile menu button */}
					<div className='flex md:hidden'>
						<div className='flex items-center gap-4'>
							<ThemeToggle />
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className='inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent/20 focus:outline-none'
								aria-expanded={isMenuOpen}
							>
								<span className='sr-only'>Open main menu</span>
								{isMenuOpen ? (
									<XIcon
										className='block h-6 w-6'
										aria-hidden='true'
									/>
								) : (
									<MenuIcon
										className='block h-6 w-6'
										aria-hidden='true'
									/>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu, show/hide based on menu state */}
			<div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
				<div className='px-2 pt-2 pb-3 space-y-1 bg-background border-b border-border'>
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className='block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent/20'
							onClick={() => setIsMenuOpen(false)}
						>
							{item.name}
						</Link>
					))}
					<div className='px-3 py-2'>
						<LoginModal />
					</div>
				</div>
			</div>
		</nav>
	);
}
