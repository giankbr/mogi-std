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

interface Client {
  id: string;
  name: string;
  logo: string;
  url: string | null;
  featured: boolean;
  createdAt: string;
}

export default function ClientsPage() {
  const router = useRouter();
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real application, fetch this from your API
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'TechFlow Inc.',
      logo: 'https://placehold.co/60x30',
      url: 'https://example.com/techflow',
      featured: true,
      createdAt: '2023-09-10',
    },
    {
      id: '2',
      name: 'EcoSolutions',
      logo: 'https://placehold.co/60x30',
      url: 'https://example.com/ecosolutions',
      featured: true,
      createdAt: '2023-08-15',
    },
    {
      id: '3',
      name: 'AeroCorp',
      logo: 'https://placehold.co/60x30',
      url: 'https://example.com/aerocorp',
      featured: false,
      createdAt: '2023-10-01',
    },
    {
      id: '4',
      name: 'HealthTech Solutions',
      logo: 'https://placehold.co/60x30',
      url: 'https://example.com/healthtech',
      featured: false,
      createdAt: '2023-07-22',
    },
    {
      id: '5',
      name: 'Urban Café',
      logo: 'https://placehold.co/60x30',
      url: 'https://example.com/urbancafe',
      featured: true,
      createdAt: '2023-11-05',
    },
  ]);

  const filteredClients = clients.filter((client) => client.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map((c) => c.id));
    }
  };

  const handleSelectClient = (id: string) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter((clientId) => clientId !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
    setSelectedClients(selectedClients.filter((clientId) => clientId !== id));
    toast.success('Client deleted successfully');
  };

  const handleBulkDelete = () => {
    setClients(clients.filter((client) => !selectedClients.includes(client.id)));
    setSelectedClients([]);
    toast.success(`${selectedClients.length} clients deleted successfully`);
  };

  const handleToggleFeatured = (id: string) => {
    setClients(clients.map((client) => (client.id === id ? { ...client, featured: !client.featured } : client)));
    toast.success('Client updated successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage your client logos and partnerships</p>
        </div>
        <Button onClick={() => router.push('/admin/clients/new')}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
      </div>

      {/* Clients Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={filteredClients.length > 0 && selectedClients.length === filteredClients.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead className="w-20">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Checkbox checked={selectedClients.includes(client.id)} onCheckedChange={() => handleSelectClient(client.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="relative h-8 w-16 overflow-hidden rounded border">
                      <Image src={client.logo} alt={client.name} width={60} height={30} className="object-contain" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    {client.url ? (
                      <a href={client.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {new URL(client.url).hostname}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">No website</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.featured ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => handleToggleFeatured(client.id)}>
                      {client.featured ? (
                        <span className="flex items-center gap-1">
                          <StarIcon className="h-3 w-3" /> Featured
                        </span>
                      ) : (
                        'No'
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/clients/${client.id}`}>
                            <PencilIcon className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClient(client.id)} className="text-destructive focus:text-destructive">
                          <TrashIcon className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No clients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Selected Actions */}
      {selectedClients.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg border bg-card p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm">{selectedClients.length} client(s) selected</span>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
