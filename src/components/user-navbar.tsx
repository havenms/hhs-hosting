'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import {
	LayoutDashboard,
	Server,
	CreditCard,
	LifeBuoy,
	LogOut,
	User,
	MenuIcon,
	XIcon,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
	{ name: 'Dashboard', href: '/user', icon: LayoutDashboard },
	{ name: 'Site', href: '/user/site', icon: Server },
	{ name: 'Billing', href: '/user/billing', icon: CreditCard },
	{ name: 'Support', href: '/user/support', icon: LifeBuoy },
];

export function UserNavbar() {
	const { user, isSignedIn } = useUser();
	const { signOut } = useClerk();
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = async () => {
		await signOut();
		router.push('/');
	};

	return (
		<nav className='sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b border-border'>
			<div className='mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<div className='flex items-center'>
						<Link
							href='/user'
							className='flex items-center'
						>
							<Logo />
						</Link>
					</div>

					{/* Desktop navigation */}
					<div className='hidden md:flex items-center gap-6'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='flex items-center text-foreground hover:text-primary transition-colors'
							>
								<item.icon className='h-4 w-4 mr-2' />
								{item.name}
							</Link>
						))}
					</div>

					{/* User menu & theme toggle */}
					<div className='hidden md:flex items-center gap-4'>
						<ThemeToggle />

						{isSignedIn && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='outline'
										className='rounded-full'
									>
										<User className='h-4 w-4 mr-2' />
										{user?.firstName ||
											user?.fullName ||
											'User'}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className='w-56'
									align='end'
								>
									<DropdownMenuLabel>
										My Account
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem asChild>
											<Link href='/profile'>
												<User className='h-4 w-4 mr-2' />
												Profile
											</Link>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={handleLogout}>
										<LogOut className='h-4 w-4 mr-2' />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>

					{/* Mobile menu button */}
					<div className='md:hidden flex items-center gap-4'>
						<ThemeToggle />
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent/20 focus:outline-none'
						>
							<span className='sr-only'>
								{isMenuOpen ? 'Close menu' : 'Open menu'}
							</span>
							{isMenuOpen ? (
								<XIcon className='h-5 w-5' />
							) : (
								<MenuIcon className='h-5 w-5' />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<div
				className={`md:hidden ${
					isMenuOpen ? 'block' : 'hidden'
				} bg-background border-b border-border`}
			>
				<div className='px-2 pt-2 pb-3 space-y-1'>
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className='flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent/20'
							onClick={() => setIsMenuOpen(false)}
						>
							<item.icon className='h-5 w-5 mr-3' />
							{item.name}
						</Link>
					))}

					<Link
						href='/profile'
						className='flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent/20'
						onClick={() => setIsMenuOpen(false)}
					>
						<User className='h-5 w-5 mr-3' />
						Profile
					</Link>

					<button
						onClick={handleLogout}
						className='flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent/20'
					>
						<LogOut className='h-5 w-5 mr-3' />
						Log out
					</button>
				</div>
			</div>
		</nav>
	);
}
