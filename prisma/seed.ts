// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// Add your users - make sure to use the actual Clerk IDs
	const users = [
		{
			id: 'user_2w9GGGg4jloexIxcM7zwcQiv4xL', // Replace with real Clerk ID
			name: 'Kevin Jimoh',
			email: 'kevin@havenmediasolutions.com',
			isAdmin: true,
			role: 'admin',
		},
		{
			id: 'user_2w95wDnbRaewzhpZKvZLtGsXJdW', // Replace with real Clerk ID
			name: 'Sean Sugrue',
			email: 'sean@havenmediasolutions.com',
			isAdmin: true,
			role: 'admin',
		},
		{
			id: 'user_2w8h5tsNvhZ5sc4ljj5XXLH38WI', // Replace with real Clerk ID
			name: 'Sean Sugrue',
			email: 'smsugrue@gmail.com',
			isAdmin: true,
			role: 'admin',
		},
	];

	for (const user of users) {
		await prisma.user.upsert({
			where: { id: user.id },
			update: user,
			create: user,
		});
	}

	console.log('Database seeded!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
