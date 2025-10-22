// scripts/migrate.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database migration and seeding...');

    // Create an admin user
    const adminPassword = await hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@mogistudio.com' },
      update: {},
      create: {
        name: 'Admin',
        email: 'admin@mogistudio.com',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    console.log('Created admin user:', admin.email);

    // Seed sample services
    const services = [
      {
        title: 'Brand Identity',
        description: 'Strategic platforms and unmistakable visual systems that make your brand impossible to ignore.',
        icon: 'Palette',
        slug: 'brand-identity',
        order: 1,
      },
      {
        title: 'Web & UX Design',
        description: 'Conversion‑focused websites—minimal when it should be, expressive when it matters. Built to impress.',
        icon: 'Globe',
        slug: 'web-ux-design',
        order: 2,
      },
      {
        title: 'Motion & Visual Art',
        description: 'Art direction, motion, and content that bring stories to life across screens and channels.',
        icon: 'Video',
        slug: 'motion-visual-art',
        order: 3,
      },
    ];

    for (const service of services) {
      await prisma.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: service,
      });
    }

    console.log(`Seeded ${services.length} services`);

    // Seed sample clients
    const clients = [
      {
        name: 'TechFlow Inc.',
        logo: 'https://placehold.co/60x30',
        url: 'https://example.com/techflow',
        featured: true,
      },
      {
        name: 'EcoSolutions',
        logo: 'https://placehold.co/60x30',
        url: 'https://example.com/ecosolutions',
        featured: true,
      },
      {
        name: 'AeroCorp',
        logo: 'https://placehold.co/60x30',
        url: 'https://example.com/aerocorp',
        featured: false,
      },
    ];

    for (const client of clients) {
      await prisma.client.create({
        data: client,
      });
    }

    console.log(`Seeded ${clients.length} clients`);

    // Seed sample testimonials
    const testimonials = [
      {
        name: 'Sarah Johnson',
        position: 'CEO',
        company: 'TechFlow Inc.',
        content: 'Mogi Studio completely transformed our brand. Their work exceeded our expectations and helped us secure our Series A funding.',
        avatar: 'https://placehold.co/50',
        featured: true,
      },
      {
        name: 'Michael Chen',
        position: 'Marketing Director',
        company: 'EcoSolutions',
        content: 'Working with Mogi Studio was effortless. They understood our vision perfectly and delivered a stunning website.',
        avatar: 'https://placehold.co/50',
        featured: true,
      },
    ];

    for (const testimonial of testimonials) {
      await prisma.testimonial.create({
        data: testimonial,
      });
    }

    console.log(`Seeded ${testimonials.length} testimonials`);

    console.log('Database migration and seeding completed successfully!');
  } catch (error) {
    console.error('Error during migration and seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
