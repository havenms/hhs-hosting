import React from 'react';
import { Check } from 'lucide-react';
import { featureComparisonData } from '../data';

export function FeatureComparison() {
	return (
		<div className='mb-16'>
			<h2 className='text-3xl font-bold mb-6 text-center'>
				Feature Comparison
			</h2>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='border-b border-border'>
							<th className='py-4 px-6 text-left'>Feature</th>
							<th className='py-4 px-6 text-center'>Starter</th>
							<th className='py-4 px-6 text-center'>
								Professional
							</th>
							<th className='py-4 px-6 text-center'>
								Enterprise
							</th>
						</tr>
					</thead>
					<tbody>
						{featureComparisonData.map((category) => (
							<React.Fragment key={category.category}>
								<tr className='border-b border-border bg-muted/50'>
									<td
										colSpan={4}
										className='py-3 px-6 font-medium'
									>
										{category.category}
									</td>
								</tr>
								{category.features.map((feature) => (
									<tr
										key={feature.name}
										className='border-b border-border'
									>
										<td className='py-3 px-6'>
											{feature.name}
										</td>
										<td className='py-3 px-6 text-center'>
											{typeof feature.starter ===
											'boolean' ? (
												feature.starter ? (
													<Check className='h-4 w-4 text-primary mx-auto' />
												) : (
													<span className='text-muted-foreground'>
														—
													</span>
												)
											) : (
												feature.starter
											)}
										</td>
										<td className='py-3 px-6 text-center'>
											{typeof feature.professional ===
											'boolean' ? (
												feature.professional ? (
													<Check className='h-4 w-4 text-secondary mx-auto' />
												) : (
													<span className='text-muted-foreground'>
														—
													</span>
												)
											) : (
												feature.professional
											)}
										</td>
										<td className='py-3 px-6 text-center'>
											{typeof feature.enterprise ===
											'boolean' ? (
												feature.enterprise ? (
													<Check className='h-4 w-4 text-accent mx-auto' />
												) : (
													<span className='text-muted-foreground'>
														—
													</span>
												)
											) : (
												feature.enterprise
											)}
										</td>
									</tr>
								))}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
