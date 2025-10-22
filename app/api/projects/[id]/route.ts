import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
  id: string;
}

// GET /api/projects/[id]
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Extract images to handle separately
    const { images, ...projectData } = body;

    // First check if the project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Handle slug uniqueness if it's being updated
    if (projectData.slug && projectData.slug !== existingProject.slug) {
      const projectWithSameSlug = await prisma.project.findUnique({
        where: { slug: projectData.slug },
      });

      if (projectWithSameSlug) {
        return NextResponse.json(
          { error: 'A project with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id },
      data: projectData,
      include: {
        images: true,
      },
    });

    // If images are provided, handle them
    if (images) {
      // First delete all existing images
      await prisma.image.deleteMany({
        where: { projectId: id },
      });

      // Then create the new ones
      if (images.length > 0) {
        await prisma.image.createMany({
          data: images.map((image: any, index: number) => ({
            url: image.url,
            alt: image.alt || '',
            order: index,
            projectId: id,
          })),
        });
      }
    }

    // Fetch the updated project with images
    const finalProject = await prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return NextResponse.json(finalProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete project (this will cascade delete images due to the relation setup in schema)
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
