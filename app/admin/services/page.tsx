'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusIcon, SearchIcon, MoreHorizontalIcon, TrashIcon, PencilIcon, ArrowUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  order: number;
  createdAt: string;
}

export default function ServicesPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real application, fetch this from your API
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Brand Identity',
      description: 'Strategic platforms and unmistakable visual systems that make your brand impossible to ignore.',
      icon: 'Palette',
      slug: 'brand-identity',
      order: 1,
      createdAt: '2023-08-15',
    },
    {
      id: '2',
      title: 'Web & UX Design',
      description: 'Conversion‑focused websites—minimal when it should be, expressive when it matters. Built to impress.',
      icon: 'Globe',
      slug: 'web-ux-design',
      order: 2,
      createdAt: '2023-08-15',
    },
    {
      id: '3',
      title: 'Motion & Visual Art',
      description: 'Art direction, motion, and content that bring stories to life across screens and channels.',
      icon: 'Video',
      slug: 'motion-visual-art',
      order: 3,
      createdAt: '2023-08-15',
    },
  ]);

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedServices.length === filteredServices.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(filteredServices.map(s => s.id));
    }
  };

  const handleSelectService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(serviceId => serviceId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    setSelectedServices(selectedServices.filter(serviceId => serviceId !== id));
    toast.success('Service deleted successfully');
  };

  const handleBulkDelete = () => {
    setServices(services.filter(service => !selectedServices.includes(service.id)));
    setSelectedServices([]);
    toast.success(`${selectedServices.length} services deleted successfully`);
  };

  const moveService = (id: string, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(service => service.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === services.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const updatedServices = [...services];
    const movedItem = updatedServices[currentIndex];

    // Remove the item from its current position
    updatedServices.splice(currentIndex, 1);
    // Insert it at the new position
    updatedServices.splice(newIndex, 0, movedItem);

    // Update order values
    const reorderedServices = updatedServices.map((service, index) => ({
      ...service,
      order: index + 1,
    }));

    setServices(reorderedServices);
    toast.success('Service order updated');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={() => router.push('/admin/services/new')} className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          {selectedServices.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              Delete Selected ({selectedServices.length})
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={filteredServices.length > 0 && selectedServices.length === filteredServices.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices
                .sort((a, b) => a.order - b.order)
                .map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleSelectService(service.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-2">
                      <span>{service.order}</span>
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => moveService(service.id, 'up')}
                          disabled={service.order === 1}
                        >
                          <ArrowUpDownIcon className="h-3 w-3 rotate-180" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => moveService(service.id, 'down')}
                          disabled={service.order === services.length}
                        >
                          <ArrowUpDownIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {service.title}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">
                      {service.description}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {service.slug}
                  </TableCell>
                  <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/services/${service.id}`}>
                          <PencilIcon className="mr-1 h-4 w-4" /> Edit
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <TrashIcon className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
