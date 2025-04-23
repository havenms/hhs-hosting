// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// Create admin user
	await prisma.user.upsert({
		where: { email: 'admin@example.com' },
		update: {},
		create: {
			name: 'Demo Admin',
			email: 'admin@example.com',
			isAdmin: true,
			role: 'admin',
		},
	});

	// Create regular user with a site
	await prisma.user.upsert({
		where: { email: 'user@example.com' },
		update: {},
		create: {
			name: 'Demo User',
			email: 'user@example.com',
			isAdmin: false,
			role: 'user',
			sites: {
				create: [
					{
						siteName: 'Demo Site',
						domain: 'demo-site.example.com',
						stage: 'development',
						progress: 60,
					},
				],
			},
		},
	});

	console.log('Database has been seeded.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
