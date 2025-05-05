import { HavenModal } from "./HavenModal"

export function PricingCTA() {
	return (
		<div className='bg-accent/10 p-8 rounded-lg text-center'>
			<h2 className='text-2xl md:text-3xl font-bold mb-4'>
				Need Custom Solutions?
			</h2>
			<p className='mb-6 max-w-xl mx-auto text-muted-foreground'>
				Our team is ready to help with custom WordPress hosting
				requirements and web design services. Contact us to discuss your
				specific needs.
			</p>
			<div className='flex gap-4 justify-center'>
				<HavenModal/>
			</div>
		</div>
	);
}
