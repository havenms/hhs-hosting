'use client';

import { useState } from 'react';

const projectStages = [
	{ value: 'building', label: 'Building' },
	{ value: 'deployed', label: 'Deployed' },
];

interface ProjectStageSwitcherProps {
	value: string;
	onChange: (value: string) => void;
}

export function ProjectStageSwitcher({
	value,
	onChange,
}: ProjectStageSwitcherProps) {
	const [visible, setVisible] = useState(true);

	// Only show in development mode
	if (process.env.NODE_ENV !== 'development') {
		return null;
	}

	if (!visible) {
		return (
			<button
				onClick={() => setVisible(true)}
				className='fixed bottom-4 left-4 z-50 bg-black/80 text-xs text-white p-2 rounded-md opacity-50 hover:opacity-100 transition-opacity'
			>
				Show Site Stage Switcher
			</button>
		);
	}

	return (
		<div className='fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 text-xs rounded-lg shadow-lg max-w-xs'>
			<div className='flex justify-between items-center mb-2'>
				<span className='font-bold'>Site Stage Simulator</span>
				<button
					onClick={() => setVisible(false)}
					className='text-white hover:text-red-400 ml-4'
				>
					×
				</button>
			</div>

			<div className='flex items-center gap-2 mb-2'>
				<span>Current stage:</span>
				<span className='font-mono bg-gray-700 px-1.5 rounded'>
					{projectStages.find((s) => s.value === value)?.label ||
						value}
				</span>
			</div>

			<div className='grid grid-cols-3 gap-1 mt-3'>
				{projectStages.map((stage) => (
					<button
						key={stage.value}
						onClick={() => onChange(stage.value)}
						className={`py-1 px-2 text-center rounded-sm transition-colors ${
							value === stage.value
								? 'bg-blue-600 text-white'
								: 'bg-gray-700 hover:bg-gray-600 text-gray-200'
						}`}
					>
						{stage.label}
					</button>
				))}
			</div>

			<div className='mt-3 text-gray-400 text-[10px] border-t border-gray-700 pt-2'>
				This is a development tool for testing site stages.
			</div>
		</div>
	);
}
