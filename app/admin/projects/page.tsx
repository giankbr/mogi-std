'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, MoreVertical, PlusIcon, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  category: string;
  status: string;
  featured: boolean;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Mock data - replace with actual data fetching
  const projects: Project[] = [
    {
      id: '1',
      title: 'Brand Redesign for Tech Startup',
      slug: 'tech-startup-redesign',
      clientName: 'TechCo Inc.',
      category: 'Branding',
      status: 'published',
      featured: true,
      thumbnail: '/placeholder.jpg',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      title: 'E-commerce Website Development',
      slug: 'ecommerce-development',
      clientName: 'Fashion Brand',
      category: 'Web Design',
      status: 'draft',
      featured: false,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
    },
  ];

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      // Add delete logic here
      console.log('Delete project:', id);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedProjects((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selectedProjects.length === projects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects.map((p) => p.id));
    }
  };

  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.clientName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Projects Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedProjects.length === projects.length} onCheckedChange={toggleSelectAll} />
              </TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Checkbox checked={selectedProjects.includes(project.id)} onCheckedChange={() => toggleSelection(project.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {project.thumbnail && <Image src={project.thumbnail} alt={project.title} width={40} height={40} className="rounded object-cover" />}
                      <div>
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-muted-foreground">{project.slug}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{project.clientName}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(project.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/admin/projects/${project.id}`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(`/work/${project.slug}`, '_blank')}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(project.id)} className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Selected Actions */}
      {selectedProjects.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg border bg-card p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm">{selectedProjects.length} project(s) selected</span>
            <Button variant="outline" size="sm">
              Bulk Edit
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
