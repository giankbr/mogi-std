"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
      SearchIcon,
      MoreHorizontalIcon,
      TrashIcon,
      EyeIcon,
      CheckCircleIcon,
      ArchiveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";

type ContactStatus = "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";

interface Contact {
      id: string;
      name: string;
      email: string;
      company: string | null;
      type: string | null;
      budget: string | null;
      message: string;
      status: ContactStatus;
      createdAt: string;
}

export default function ContactsPage() {
      const router = useRouter();
      const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
      const [searchQuery, setSearchQuery] = useState("");
      const [statusFilter, setStatusFilter] = useState<string>("");

      // Mock data - in a real application, fetch this from your API
      const [contacts, setContacts] = useState<Contact[]>([
            {
                  id: "1",
                  name: "Sarah Johnson",
                  email: "sarah.johnson@example.com",
                  company: "TechFlow Inc.",
                  type: "Brand Identity",
                  budget: "$25k - $50k",
                  message: "We need a complete rebrand for our company as were pivoting to a new market segment.",
                  status: "NEW",
                  createdAt: "2023-10-15",
            },
            {
                  id: "2",
                  name: "Michael Chen",
                  email: "michael.chen@example.com",
                  company: "EcoSolutions",
                  type: "Web Design & Development",
                  budget: "$10k - $25k",
                  message: "Looking for a modern website that highlights our eco-friendly products and initiatives.",
                  status: "IN_PROGRESS",
                  createdAt: "2023-10-10",
            },
            {
                  id: "3",
                  name: "Emma Wilson",
                  email: "emma.wilson@example.com",
                  company: "Wilson Consulting",
                  type: "Motion & Visual Art",
                  budget: "Under $10k",
                  message: "Need animated explainer videos for our new service offerings.",
                  status: "COMPLETED",
                  createdAt: "2023-09-28",
            },
            {
                  id: "4",
                  name: "Alex Rodriguez",
                  email: "alex.rodriguez@example.com",
                  company: "FitLife App",
                  type: "Full Package",
                  budget: "$50k - $100k",
                  message: "We're launching a fitness app and need comprehensive branding, UX design, and marketing visuals.",
                  status: "NEW",
                  createdAt: "2023-10-18",
            },
            {
                  id: "5",
                  name: "Jessica Taylor",
                  email: "jessica.taylor@example.com",
                  company: null,
                  type: "Other",
                  budget: "Not sure yet",
                  message: "I'm a startup founder looking to discuss potential collaboration for my new venture.",
                  status: "ARCHIVED",
                  createdAt: "2023-09-15",
            },
      ]);

      const filteredContacts = contacts.filter(
            (contact) =>
                  (contact.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                        contact.email
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                        (contact.company &&
                              contact.company
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())) ||
                        contact.message
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())) &&
                  (statusFilter ? contact.status === statusFilter : true),
      );

      const handleSelectAll = () => {
            if (selectedContacts.length === filteredContacts.length) {
                  setSelectedContacts([]);
            } else {
                  setSelectedContacts(filteredContacts.map((c) => c.id));
            }
      };

      const handleSelectContact = (id: string) => {
            if (selectedContacts.includes(id)) {
                  setSelectedContacts(
                        selectedContacts.filter(
                              (contactId) => contactId !== id,
                        ),
                  );
            } else {
                  setSelectedContacts([...selectedContacts, id]);
            }
      };

      const handleDeleteContact = (id: string) => {
            setContacts(contacts.filter((contact) => contact.id !== id));
            setSelectedContacts(
                  selectedContacts.filter((contactId) => contactId !== id),
            );
            toast.success("Contact deleted successfully");
      };

      const handleBulkDelete = () => {
            setContacts(
                  contacts.filter(
                        (contact) => !selectedContacts.includes(contact.id),
                  ),
            );
            setSelectedContacts([]);
            toast.success(
                  `${selectedContacts.length} contacts deleted successfully`,
            );
      };

      const handleUpdateStatus = (id: string, status: ContactStatus) => {
            setContacts(
                  contacts.map((contact) =>
                        contact.id === id ? { ...contact, status } : contact,
                  ),
            );
            toast.success("Contact status updated");
      };

      const handleBulkUpdateStatus = (status: ContactStatus) => {
            setContacts(
                  contacts.map((contact) =>
                        selectedContacts.includes(contact.id)
                              ? { ...contact, status }
                              : contact,
                  ),
            );
            setSelectedContacts([]);
            toast.success(
                  `${selectedContacts.length} contacts updated successfully`,
            );
      };

      const truncateText = (text: string, maxLength: number = 60) => {
            if (text.length <= maxLength) return text;
            return text.slice(0, maxLength) + "...";
      };

      const getStatusBadge = (status: ContactStatus) => {
            switch (status) {
                  case "NEW":
                        return <Badge variant="default">New</Badge>;
                  case "IN_PROGRESS":
                        return (
                              <Badge
                                    variant="secondary"
                                    className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                              >
                                    In Progress
                              </Badge>
                        );
                  case "COMPLETED":
                        return (
                              <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-800 hover:bg-green-100"
                              >
                                    Completed
                              </Badge>
                        );
                  case "ARCHIVED":
                        return (
                              <Badge
                                    variant="outline"
                                    className="bg-gray-100 text-gray-800 hover:bg-gray-100"
                              >
                                    Archived
                              </Badge>
                        );
                  default:
                        return <Badge variant="outline">{status}</Badge>;
            }
      };

      return (
            <div className="space-y-4">
                  <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                              Contact Submissions
                        </h1>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-2 w-full sm:w-auto">
                              <div className="relative flex-grow sm:w-96">
                                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                          type="search"
                                          placeholder="Search contacts..."
                                          className="pl-8"
                                          value={searchQuery}
                                          onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                          }
                                    />
                              </div>
                              <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                              >
                                    <SelectTrigger className="w-[180px]">
                                          <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectItem value="">
                                                All Statuses
                                          </SelectItem>
                                          <SelectItem value="NEW">
                                                New
                                          </SelectItem>
                                          <SelectItem value="IN_PROGRESS">
                                                In Progress
                                          </SelectItem>
                                          <SelectItem value="COMPLETED">
                                                Completed
                                          </SelectItem>
                                          <SelectItem value="ARCHIVED">
                                                Archived
                                          </SelectItem>
                                    </SelectContent>
                              </Select>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap justify-end">
                              {selectedContacts.length > 0 && (
                                    <>
                                          <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                      handleBulkUpdateStatus(
                                                            "IN_PROGRESS",
                                                      )
                                                }
                                                className="whitespace-nowrap"
                                          >
                                                <CheckCircleIcon className="mr-1 h-4 w-4" />
                                                Mark In Progress
                                          </Button>
                                          <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                      handleBulkUpdateStatus(
                                                            "COMPLETED",
                                                      )
                                                }
                                                className="whitespace-nowrap"
                                          >
                                                <CheckCircleIcon className="mr-1 h-4 w-4" />
                                                Mark Completed
                                          </Button>
                                          <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                      handleBulkUpdateStatus(
                                                            "ARCHIVED",
                                                      )
                                                }
                                                className="whitespace-nowrap"
                                          >
                                                <ArchiveIcon className="mr-1 h-4 w-4" />
                                                Archive
                                          </Button>
                                          <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={handleBulkDelete}
                                                className="whitespace-nowrap"
                                          >
                                                <TrashIcon className="mr-1 h-4 w-4" />
                                                Delete (
                                                {selectedContacts.length})
                                          </Button>
                                    </>
                              )}
                        </div>
                  </div>

                  <div className="rounded-lg border">
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="w-12">
                                                <Checkbox
                                                      checked={
                                                            filteredContacts.length >
                                                                  0 &&
                                                            selectedContacts.length ===
                                                                  filteredContacts.length
                                                      }
                                                      onCheckedChange={
                                                            handleSelectAll
                                                      }
                                                />
                                          </TableHead>
                                          <TableHead>Contact</TableHead>
                                          <TableHead>Project Details</TableHead>
                                          <TableHead>Message</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead>Date</TableHead>
                                          <TableHead className="w-20">
                                                Actions
                                          </TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {filteredContacts.length > 0 ? (
                                          filteredContacts.map((contact) => (
                                                <TableRow key={contact.id}>
                                                      <TableCell>
                                                            <Checkbox
                                                                  checked={selectedContacts.includes(
                                                                        contact.id,
                                                                  )}
                                                                  onCheckedChange={() =>
                                                                        handleSelectContact(
                                                                              contact.id,
                                                                        )
                                                                  }
                                                            />
                                                      </TableCell>
                                                      <TableCell>
                                                            <div className="font-medium">
                                                                  {contact.name}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                  {
                                                                        contact.email
                                                                  }
                                                            </div>
                                                            {contact.company && (
                                                                  <div className="text-xs text-muted-foreground">
                                                                        {
                                                                              contact.company
                                                                        }
                                                                  </div>
                                                            )}
                                                      </TableCell>
                                                      <TableCell>
                                                            <div className="text-sm">
                                                                  <div>
                                                                        {contact.type ||
                                                                              "Not specified"}
                                                                  </div>
                                                                  <div className="text-xs text-muted-foreground">
                                                                        {contact.budget ||
                                                                              "No budget specified"}
                                                                  </div>
                                                            </div>
                                                      </TableCell>
                                                      <TableCell>
                                                            <div className="max-w-xs truncate">
                                                                  {truncateText(
                                                                        contact.message,
                                                                  )}
                                                            </div>
                                                      </TableCell>
                                                      <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                  {getStatusBadge(
                                                                        contact.status,
                                                                  )}
                                                            </div>
                                                      </TableCell>
                                                      <TableCell>
                                                            {new Date(
                                                                  contact.createdAt,
                                                            ).toLocaleDateString()}
                                                      </TableCell>
                                                      <TableCell>
                                                            <DropdownMenu>
                                                                  <DropdownMenuTrigger
                                                                        asChild
                                                                  >
                                                                        <Button
                                                                              variant="ghost"
                                                                              size="icon"
                                                                        >
                                                                              <MoreHorizontalIcon className="h-4 w-4" />
                                                                        </Button>
                                                                  </DropdownMenuTrigger>
                                                                  <DropdownMenuContent align="end">
                                                                        <DropdownMenuItem
                                                                              asChild
                                                                        >
                                                                              <Link
                                                                                    href={`/admin/contacts/${contact.id}`}
                                                                              >
                                                                                    <EyeIcon className="mr-2 h-4 w-4" />{" "}
                                                                                    View
                                                                                    Details
                                                                              </Link>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                              onClick={() =>
                                                                                    handleUpdateStatus(
                                                                                          contact.id,
                                                                                          "IN_PROGRESS",
                                                                                    )
                                                                              }
                                                                        >
                                                                              <CheckCircleIcon className="mr-2 h-4 w-4" />{" "}
                                                                              Mark
                                                                              In
                                                                              Progress
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                              onClick={() =>
                                                                                    handleUpdateStatus(
                                                                                          contact.id,
                                                                                          "COMPLETED",
                                                                                    )
                                                                              }
                                                                        >
                                                                              <CheckCircleIcon className="mr-2 h-4 w-4" />{" "}
                                                                              Mark
                                                                              Completed
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                              onClick={() =>
                                                                                    handleUpdateStatus(
                                                                                          contact.id,
                                                                                          "ARCHIVED",
                                                                                    )
                                                                              }
                                                                        >
                                                                              <ArchiveIcon className="mr-2 h-4 w-4" />{" "}
                                                                              Archive
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                              onClick={() =>
                                                                                    handleDeleteContact(
                                                                                          contact.id,
                                                                                    )
                                                                              }
                                                                              className="text-destructive focus:text-destructive"
                                                                        >
                                                                              <TrashIcon className="mr-2 h-4 w-4" />{" "}
                                                                              Delete
                                                                        </DropdownMenuItem>
                                                                  </DropdownMenuContent>
                                                            </DropdownMenu>
                                                      </TableCell>
                                                </TableRow>
                                          ))
                                    ) : (
                                          <TableRow>
                                                <TableCell
                                                      colSpan={7}
                                                      className="h-24 text-center"
                                                >
                                                      No contacts found.
                                                </TableCell>
                                          </TableRow>
                                    )}
                              </TableBody>
                        </Table>
                  </div>
            </div>
      );
}
