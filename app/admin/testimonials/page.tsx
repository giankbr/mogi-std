'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontalIcon, PencilIcon, PlusIcon, SearchIcon, StarIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string | null;
  featured: boolean;
  createdAt: string;
}

export default function TestimonialsPage() {
  const router = useRouter();
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real application, fetch this from your API
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'TechFlow Inc.',
      content: 'Mogi Studio completely transformed our brand. Their work exceeded our expectations and helped us secure our Series A funding.',
      avatar: 'https://placehold.co/50',
      featured: true,
      createdAt: '2023-09-10',
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'Marketing Director',
      company: 'EcoSolutions',
      content: 'Working with Mogi Studio was effortless. They understood our vision perfectly and delivered a stunning website.',
      avatar: 'https://placehold.co/50',
      featured: true,
      createdAt: '2023-08-15',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      position: 'Product Lead',
      company: 'AeroCorp',
      content: 'The motion graphics Mogi Studio created for our product launch were captivating and helped us stand out in a crowded market.',
      avatar: 'https://placehold.co/50',
      featured: false,
      createdAt: '2023-10-01',
    },
    {
      id: '4',
      name: 'David Park',
      position: 'Founder',
      company: 'HealthTech Solutions',
      content: 'Mogi Studio"s UX design dramatically improved our user engagement metrics. A truly talented team.',
      avatar: 'https://placehold.co/50',
      featured: false,
      createdAt: '2023-07-22',
    },
    {
      id: '5',
      name: 'Olivia Martinez',
      position: 'Owner',
      company: 'Urban Café',
      content: 'Our rebrand with Mogi Studio has been transformative for our business. Customer recognition is up 200%.',
      avatar: 'https://placehold.co/50',
      featured: true,
      createdAt: '2023-11-05',
    },
  ]);

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedTestimonials.length === filteredTestimonials.length) {
      setSelectedTestimonials([]);
    } else {
      setSelectedTestimonials(filteredTestimonials.map((t) => t.id));
    }
  };

  const handleSelectTestimonial = (id: string) => {
    if (selectedTestimonials.includes(id)) {
      setSelectedTestimonials(selectedTestimonials.filter((testimonialId) => testimonialId !== id));
    } else {
      setSelectedTestimonials([...selectedTestimonials, id]);
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
    setSelectedTestimonials(selectedTestimonials.filter((testimonialId) => testimonialId !== id));
    toast.success('Testimonial deleted successfully');
  };

  const handleBulkDelete = () => {
    setTestimonials(testimonials.filter((testimonial) => !selectedTestimonials.includes(testimonial.id)));
    setSelectedTestimonials([]);
    toast.success(`${selectedTestimonials.length} testimonials deleted successfully`);
  };

  const handleToggleFeatured = (id: string) => {
    setTestimonials(
      testimonials.map((testimonial) =>
        testimonial.id === id
          ? {
              ...testimonial,
              featured: !testimonial.featured,
            }
          : testimonial
      )
    );
    toast.success('Testimonial updated successfully');
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials and reviews</p>
        </div>
        <Button onClick={() => router.push('/admin/testimonials/new')}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search testimonials..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
      </div>

      {/* Testimonials Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={filteredTestimonials.length > 0 && selectedTestimonials.length === filteredTestimonials.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead className="w-10">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Testimonial</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <Checkbox checked={selectedTestimonials.includes(testimonial.id)} onCheckedChange={() => handleSelectTestimonial(testimonial.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      {testimonial.avatar ? (
                        <Image src={testimonial.avatar} alt={testimonial.name} width={32} height={32} className="object-cover" />
                      ) : (
                        <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">{testimonial.name.charAt(0)}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.position}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate">{truncateContent(testimonial.content)}</div>
                  </TableCell>
                  <TableCell>{testimonial.company}</TableCell>
                  <TableCell>
                    <Badge variant={testimonial.featured ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => handleToggleFeatured(testimonial.id)}>
                      {testimonial.featured ? (
                        <span className="flex items-center gap-1">
                          <StarIcon className="h-3 w-3" /> Featured
                        </span>
                      ) : (
                        'No'
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(testimonial.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/testimonials/${testimonial.id}`}>
                            <PencilIcon className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteTestimonial(testimonial.id)} className="text-destructive focus:text-destructive">
                          <TrashIcon className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No testimonials found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Selected Actions */}
      {selectedTestimonials.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg border bg-card p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm">{selectedTestimonials.length} testimonial(s) selected</span>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
