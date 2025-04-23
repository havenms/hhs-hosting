'use client';

import * as React from 'react';
import { MusicIcon, Disc3Icon, StarIcon, SparklesIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function DiscoDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='default'
					className='rounded-full bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg'
				>
					<Disc3Icon className='h-[1.2rem] w-[1.2rem] mr-2 animate-spin-slow' />
					Disco
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='dropdown-content min-w-[200px] bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 backdrop-blur-md'>
				<DropdownMenuItem className='text-white focus:text-white focus:bg-white/20'>
					<SparklesIcon className='mr-2 h-4 w-4' />
					<span>Boogie Nights</span>
				</DropdownMenuItem>
				<DropdownMenuItem className='text-white focus:text-white focus:bg-white/20'>
					<StarIcon className='mr-2 h-4 w-4' />
					<span>Dance Floor</span>
				</DropdownMenuItem>
				<DropdownMenuItem className='text-white focus:text-white focus:bg-white/20'>
					<MusicIcon className='mr-2 h-4 w-4' />
					<span>Studio 54</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
