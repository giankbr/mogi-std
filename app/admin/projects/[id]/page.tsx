'use client';

import { useEffect, useState } from 'react';
import { ProjectForm } from '../project-form';
import { Skeleton } from '@/components/ui/skeleton';

interface EditProjectPageProps {
  params: { id: string };
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the project data
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock project data
        const mockProject = {
          id: params.id,
          title: 'Sample Project Title',
          slug: 'sample-project-title',
          description: 'This is a sample project description that would typically be fetched from the database.',
          clientName: 'Sample Client',
          projectType: 'Branding',
          featured: true,
          thumbnail: 'https://placehold.co/800x600',
          images: [
            { url: 'https://placehold.co/800x600/1', alt: 'Project image 1' },
            { url: 'https://placehold.co/800x600/2', alt: 'Project image 2' }
          ]
        };

        setProject(mockProject);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 mb-6">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectForm initialData={project} isEditing />
    </div>
  );
}
