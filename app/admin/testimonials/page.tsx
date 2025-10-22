"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
      PlusIcon,
      SearchIcon,
      MoreHorizontalIcon,
      TrashIcon,
      PencilIcon,
      StarIcon,
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
      const [selectedTestimonials, setSelectedTestimonials] = useState<
            string[]
      >([]);
      const [searchQuery, setSearchQuery] = useState("");

      // Mock data - in a real application, fetch this from your API
      const [testimonials, setTestimonials] = useState<Testimonial[]>([
            {
                  id: "1",
                  name: "Sarah Johnson",
                  position: "CEO",
                  company: "TechFlow Inc.",
                  content: "Mogi Studio completely transformed our brand. Their work exceeded our expectations and helped us secure our Series A funding.",
                  avatar: "https://placehold.co/50",
                  featured: true,
                  createdAt: "2023-09-10",
            },
            {
                  id: "2",
                  name: "Michael Chen",
                  position: "Marketing Director",
                  company: "EcoSolutions",
                  content: "Working with Mogi Studio was effortless. They understood our vision perfectly and delivered a stunning website.",
                  avatar: "https://placehold.co/50",
                  featured: true,
                  createdAt: "2023-08-15",
            },
            {
                  id: "3",
                  name: "Emma Wilson",
                  position: "Product Lead",
                  company: "AeroCorp",
                  content: "The motion graphics Mogi Studio created for our product launch were captivating and helped us stand out in a crowded market.",
                  avatar: "https://placehold.co/50",
                  featured: false,
                  createdAt: "2023-10-01",
            },
            {
                  id: "4",
                  name: "David Park",
                  position: "Founder",
                  company: "HealthTech Solutions",
                  content: 'Mogi Studio"s UX design dramatically improved our user engagement metrics. A truly talented team.',
                  avatar: "https://placehold.co/50",
                  featured: false,
                  createdAt: "2023-07-22",
            },
            {
                  id: "5",
                  name: "Olivia Martinez",
                  position: "Owner",
                  company: "Urban Café",
                  content: "Our rebrand with Mogi Studio has been transformative for our business. Customer recognition is up 200%.",
                  avatar: "https://placehold.co/50",
                  featured: true,
                  createdAt: "2023-11-05",
            },
      ]);

      const filteredTestimonials = testimonials.filter(
            (testimonial) =>
                  testimonial.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                  testimonial.company
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                  testimonial.content
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
      );

      const handleSelectAll = () => {
            if (selectedTestimonials.length === filteredTestimonials.length) {
                  setSelectedTestimonials([]);
            } else {
                  setSelectedTestimonials(
                        filteredTestimonials.map((t) => t.id),
                  );
            }
      };

      const handleSelectTestimonial = (id: string) => {
            if (selectedTestimonials.includes(id)) {
                  setSelectedTestimonials(
                        selectedTestimonials.filter(
                              (testimonialId) => testimonialId !== id,
                        ),
                  );
            } else {
                  setSelectedTestimonials([...selectedTestimonials, id]);
            }
      };

      const handleDeleteTestimonial = (id: string) => {
            setTestimonials(
                  testimonials.filter((testimonial) => testimonial.id !== id),
            );
            setSelectedTestimonials(
                  selectedTestimonials.filter(
                        (testimonialId) => testimonialId !== id,
                  ),
            );
            toast.success("Testimonial deleted successfully");
      };

      const handleBulkDelete = () => {
            setTestimonials(
                  testimonials.filter(
                        (testimonial) =>
                              !selectedTestimonials.includes(testimonial.id),
                  ),
            );
            setSelectedTestimonials([]);
            toast.success(
                  `${selectedTestimonials.length} testimonials deleted successfully`,
            );
      };

      const handleToggleFeatured = (id: string) => {
            setTestimonials(
                  testimonials.map((testimonial) =>
                        testimonial.id === id
                              ? {
                                      ...testimonial,
                                      featured: !testimonial.featured,
                                }
                              : testimonial,
                  ),
            );
            toast.success("Testimonial updated successfully");
      };

      const truncateContent = (content: string, maxLength: number = 100) => {
            if (content.length <= maxLength) return content;
            return content.slice(0, maxLength) + "...";
      };

      return (
            <div className="space-y-4">
                  <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Testimonials</h1>
                        <Button
                              onClick={() =>
                                    router.push("/admin/testimonials/new")
                              }
                              className="flex items-center gap-2"
                        >
                              <PlusIcon className="h-4 w-4" />
                              Add Testimonial
                        </Button>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:w-96">
                              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                    type="search"
                                    placeholder="Search testimonials..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) =>
                                          setSearchQuery(e.target.value)
                                    }
                              />
                        </div>

                        <div className="flex items-center gap-2">
                              {selectedTestimonials.length > 0 && (
                                    <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={handleBulkDelete}
                                    >
                                          Delete Selected (
                                          {selectedTestimonials.length})
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
                                                      checked={
                                                            filteredTestimonials.length >
                                                                  0 &&
                                                            selectedTestimonials.length ===
                                                                  filteredTestimonials.length
                                                      }
                                                      onCheckedChange={
                                                            handleSelectAll
                                                      }
                                                />
                                          </TableHead>
                                          <TableHead className="w-10">
                                                Avatar
                                          </TableHead>
                                          <TableHead>Name</TableHead>
                                          <TableHead>Testimonial</TableHead>
                                          <TableHead>Company</TableHead>
                                          <TableHead>Featured</TableHead>
                                          <TableHead>Added</TableHead>
                                          <TableHead className="w-20">
                                                Actions
                                          </TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {filteredTestimonials.length > 0 ? (
                                          filteredTestimonials.map(
                                                (testimonial) => (
                                                      <TableRow
                                                            key={testimonial.id}
                                                      >
                                                            <TableCell>
                                                                  <Checkbox
                                                                        checked={selectedTestimonials.includes(
                                                                              testimonial.id,
                                                                        )}
                                                                        onCheckedChange={() =>
                                                                              handleSelectTestimonial(
                                                                                    testimonial.id,
                                                                              )
                                                                        }
                                                                  />
                                                            </TableCell>
                                                            <TableCell>
                                                                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                                                        {testimonial.avatar ? (
                                                                              <Image
                                                                                    src={
                                                                                          testimonial.avatar
                                                                                    }
                                                                                    alt={
                                                                                          testimonial.name
                                                                                    }
                                                                                    width={
                                                                                          32
                                                                                    }
                                                                                    height={
                                                                                          32
                                                                                    }
                                                                                    className="object-cover"
                                                                              />
                                                                        ) : (
                                                                              <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                                                                                    {testimonial.name.charAt(
                                                                                          0,
                                                                                    )}
                                                                              </div>
                                                                        )}
                                                                  </div>
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                  <div>
                                                                        {
                                                                              testimonial.name
                                                                        }
                                                                  </div>
                                                                  <div className="text-xs text-muted-foreground">
                                                                        {
                                                                              testimonial.position
                                                                        }
                                                                  </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                  <div className="max-w-md truncate">
                                                                        {truncateContent(
                                                                              testimonial.content,
                                                                        )}
                                                                  </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                  {
                                                                        testimonial.company
                                                                  }
                                                            </TableCell>
                                                            <TableCell>
                                                                  <Badge
                                                                        variant={
                                                                              testimonial.featured
                                                                                    ? "default"
                                                                                    : "secondary"
                                                                        }
                                                                        className="cursor-pointer"
                                                                        onClick={() =>
                                                                              handleToggleFeatured(
                                                                                    testimonial.id,
                                                                              )
                                                                        }
                                                                  >
                                                                        {testimonial.featured ? (
                                                                              <span className="flex items-center gap-1">
                                                                                    <StarIcon className="h-3 w-3" />{" "}
                                                                                    Featured
                                                                              </span>
                                                                        ) : (
                                                                              "No"
                                                                        )}
                                                                  </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                  {new Date(
                                                                        testimonial.createdAt,
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
                                                                                          href={`/admin/testimonials/${testimonial.id}`}
                                                                                    >
                                                                                          <PencilIcon className="mr-2 h-4 w-4" />{" "}
                                                                                          Edit
                                                                                    </Link>
                                                                              </DropdownMenuItem>
                                                                              <DropdownMenuItem
                                                                                    onClick={() =>
                                                                                          handleDeleteTestimonial(
                                                                                                testimonial.id,
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
                                                ),
                                          )
                                    ) : (
                                          <TableRow>
                                                <TableCell
                                                      colSpan={8}
                                                      className="h-24 text-center"
                                                >
                                                      No testimonials found.
                                                </TableCell>
                                          </TableRow>
                                    )}
                              </TableBody>
                        </Table>
                  </div>
            </div>
      );
}
