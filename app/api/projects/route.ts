import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/projects
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const featured = url.searchParams.get('featured');
    const limit = url.searchParams.get('limit');
    const page = Number(url.searchParams.get('page') || '1');
    const pageSize = Number(limit || '10');
    const skip = (page - 1) * pageSize;

    // Build filter conditions
    const where: any = {};
    if (featured === 'true') {
      where.featured = true;
    }

    // Get projects
    const projects = await prisma.project.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: pageSize,
      skip,
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    // Get total count for pagination
    const totalCount = await prisma.project.count({ where });

    return NextResponse.json({
      projects,
      pagination: {
        total: totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        page,
        pageSize,
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { images, ...projectData } = body;

    // Create project
    const project = await prisma.project.create({
      data: {
        ...projectData,
        // Create images if they exist
        images: images?.length
          ? {
              create: images.map((image: any, index: number) => ({
                url: image.url,
                alt: image.alt || '',
                order: index,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
