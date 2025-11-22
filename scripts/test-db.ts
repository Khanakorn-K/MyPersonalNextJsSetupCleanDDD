import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
    console.log('Starting database test...');

    // Create a user
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
            passwordHash: 'hashedpassword',
        },
    });
    console.log('Created user:', user);

    // Create a post
    const post = await prisma.post.create({
        data: {
            title: 'My First Post',
            slug: 'my-first-post',
            content: '# Hello World',
            authorId: user.id,
            published: true,
        },
    });
    console.log('Created post:', post);

    // Query posts
    const posts = await prisma.post.findMany({
        include: { author: true },
    });
    console.log('All posts:', posts);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
