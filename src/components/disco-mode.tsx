'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscoModeProps {
	autoActivate?: boolean;
	showButton?: boolean;
	isLoading?: boolean; // New prop to track loading state
}

export function DiscoMode({
	autoActivate = false,
	showButton = true,
	isLoading = false,
}: DiscoModeProps) {
	const [isActive, setIsActive] = useState(autoActivate || isLoading);
	const [spots, setSpots] = useState<
		Array<{ id: number; size: number; opacity: number }>
	>([]);

	// Track previous loading state for comparison
	const [prevIsLoading, setPrevIsLoading] = useState(isLoading);

	// Generate random light spots when disco mode is activated
	useEffect(() => {
		if (isActive) {
			const newSpots = Array.from({ length: 50 }, (_, i) => ({
				id: i,
				size: Math.random() * 30 + 10, // Random size between 10-40px
				opacity: Math.random() * 0.5 + 0.3, // Random opacity between 0.3-0.8
			}));
			setSpots(newSpots);
		}
	}, [isActive]);

	// Handle loading state changes
	useEffect(() => {
		// If loading starts, activate disco mode immediately
		if (isLoading && !prevIsLoading) {
			setIsActive(true);
		}

		// If loading ends, set a timer to deactivate disco mode after 2 seconds
		if (!isLoading && prevIsLoading) {
			const timer = setTimeout(() => {
				// Only turn off disco if it wasn't manually activated
				if (!autoActivate) {
					setIsActive(false);
				}
			}, 2000); // 2 second delay

			// Cleanup the timer if component unmounts or loading state changes again
			return () => clearTimeout(timer);
		}

		// Update previous loading state
		setPrevIsLoading(isLoading);
	}, [isLoading, prevIsLoading, autoActivate]);

	// Handle manual button clicks
	const toggleDisco = () => {
		setIsActive(!isActive);
	};

	return (
		<>
			{showButton && (
				<button
					onClick={toggleDisco}
					className='fixed bottom-4 right-4 z-50 p-3 rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-lg hover:shadow-xl'
				>
					<span className='text-white font-bold'>Disco Mode</span>
				</button>
			)}

			<AnimatePresence>
				{isActive && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-40 pointer-events-none overflow-hidden'
						style={{ backdropFilter: 'blur(4px)' }}
					>
						{/* Dark overlay */}
						<div className='absolute inset-0 bg-black/70'></div>

						{/* Disco ball center */}
						<motion.div
							className='absolute left-1/2 top-[20%] w-20 h-20 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-xl'
							style={{
								x: '-50%',
								y: '-50%',
								boxShadow:
									'0 0 30px 10px rgba(255,255,255,0.3)',
							}}
							animate={{
								rotateY: [0, 360],
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: 'linear',
							}}
						/>

						{/* The rotating container for light spots */}
						<motion.div
							className='absolute inset-0'
							animate={{ rotate: 360 }}
							transition={{
								duration: 40,
								repeat: Infinity,
								ease: 'linear',
							}}
						>
							{/* Light spots container */}
							<div className='absolute inset-0'>
								{spots.map((spot) => (
									<motion.div
										key={spot.id}
										className='absolute rounded-full bg-white mix-blend-screen'
										style={{
											width: spot.size,
											height: spot.size,
											left: `${Math.random() * 100}%`,
											top: `${Math.random() * 100}%`,
											opacity: spot.opacity,
											filter: 'blur(0.5px)',
										}}
										animate={{
											opacity: [
												spot.opacity,
												spot.opacity + 0.2,
												spot.opacity - 0.1,
												spot.opacity,
											],
											scale: [1, 1.1, 0.9, 1],
											x: [0, Math.random() * 40 - 20],
											y: [0, Math.random() * 40 - 20],
										}}
										transition={{
											duration: 3 + Math.random() * 3,
											repeat: Infinity,
											repeatType: 'reverse',
										}}
									/>
								))}
							</div>
						</motion.div>

						{/* Light rays from the disco ball */}
						<motion.div
							className='absolute left-1/2 top-[20%] origin-center'
							style={{
								x: '-50%',
								y: '-50%',
							}}
							animate={{ rotate: 360 }}
							transition={{
								duration: 30,
								repeat: Infinity,
								ease: 'linear',
							}}
						>
							{Array.from({ length: 8 }).map((_, i) => (
								<motion.div
									key={i}
									className='absolute origin-center bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50'
									style={{
										width: '100vw',
										height: '4px',
										left: '50%',
										top: '50%',
										transform: `rotate(${i * 45}deg)`,
										transformOrigin: 'left center',
										filter: 'blur(2px)',
										opacity: 0.5,
									}}
									animate={{ opacity: [0.3, 0.6, 0.3] }}
									transition={{
										duration: 3,
										repeat: Infinity,
										delay: i * 0.2,
									}}
								/>
							))}
						</motion.div>

						{/* Color overlays for disco atmosphere */}
						{[
							'from-primary/10',
							'from-secondary/10',
							'from-accent/10',
						].map((color, i) => (
							<motion.div
								key={i}
								className={`absolute inset-0 bg-gradient-radial ${color} to-transparent mix-blend-overlay`}
								animate={{
									opacity: [0.1, 0.3, 0.1],
								}}
								transition={{
									duration: 5 + i * 2,
									repeat: Infinity,
									repeatType: 'reverse',
									delay: i * 1.5,
								}}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
