'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Schema for project form validation
const projectSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  clientName: z.string().optional(),
  projectType: z.string(),
  featured: z.boolean().default(false),
  thumbnail: z.string().optional(),
  images: z.array(z.object({
    url: z.string(),
    alt: z.string().optional(),
  })).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: ProjectFormValues;
  isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For image upload management
  const [images, setImages] = useState<{ url: string; alt?: string }[]>(initialData?.images || []);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Initialize form with default values
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      description: '',
      clientName: '',
      projectType: '',
      featured: false,
      thumbnail: '',
      images: [],
    },
  });

  // Handle form submission
  async function onSubmit(data: ProjectFormValues) {
    try {
      setIsSubmitting(true);

      // Add images to the data
      const formData = {
        ...data,
        images: images,
      };

      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Form data submitted:', formData);

      // Show success toast
      toast.success(`Project ${isEditing ? 'updated' : 'created'} successfully`);

      // Redirect to projects list
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle adding a new image
  const handleAddImage = () => {
    if (newImageUrl) {
      setImages([...images, { url: newImageUrl, alt: '' }]);
      setNewImageUrl('');
    }
  };

  // Handle removing an image
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Generate slug from title
  const generateSlug = () => {
    const title = form.getValues('title');
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    form.setValue('slug', slug);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Project title"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          // Only auto-generate slug if it's empty or if this is a new project
                          if (!isEditing || !form.getValues('slug')) {
                            setTimeout(generateSlug, 500);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="project-slug" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateSlug}
                        className="shrink-0"
                      >
                        Generate
                      </Button>
                    </div>
                    <FormDescription>
                      Used in the URL: /projects/{form.watch('slug')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Project description..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Branding">Branding</SelectItem>
                        <SelectItem value="Web Design">Web Design</SelectItem>
                        <SelectItem value="Motion">Motion</SelectItem>
                        <SelectItem value="UX Design">UX Design</SelectItem>
                        <SelectItem value="Full Package">Full Package</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a URL for the project thumbnail image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured Project</FormLabel>
                    <FormDescription>
                      Featured projects are displayed prominently on the homepage
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Project Images</FormLabel>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  placeholder="Image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddImage}
                  className="shrink-0"
                >
                  Add
                </Button>
              </div>

              {images.length > 0 && (
                <div className="mt-4 space-y-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <div className="w-full overflow-hidden text-ellipsis">
                        {image.url}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <FormDescription className="mt-2">
                Add URLs for additional project images
              </FormDescription>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/projects')}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update Project' : 'Create Project'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
