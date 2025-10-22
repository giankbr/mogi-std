"use client";

import { useEffect, useState } from "react";
import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, LineChart, PieChart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
      const [stats, setStats] = useState({
            totalProjects: 0,
            totalClients: 0,
            totalTestimonials: 0,
            newContacts: 0,
      });

      // Simulating data loading - in a real app, you'd fetch from your API
      useEffect(() => {
            // Mock data for demonstration
            setStats({
                  totalProjects: 24,
                  totalClients: 18,
                  totalTestimonials: 32,
                  newContacts: 5,
            });
      }, []);

      return (
            <div className="flex flex-col gap-6">
                  <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                              Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2">
                              Overview of your Mogi Studio admin panel
                        </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                          Total Projects
                                    </CardTitle>
                                    <BarChart className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                    <div className="text-2xl font-bold">
                                          {stats.totalProjects}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                          +2 added this month
                                    </p>
                              </CardContent>
                        </Card>

                        <Card>
                              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                          Total Clients
                                    </CardTitle>
                                    <BarChart className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                    <div className="text-2xl font-bold">
                                          {stats.totalClients}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                          +4 added this month
                                    </p>
                              </CardContent>
                        </Card>

                        <Card>
                              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                          Testimonials
                                    </CardTitle>
                                    <LineChart className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                    <div className="text-2xl font-bold">
                                          {stats.totalTestimonials}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                          +8 added this month
                                    </p>
                              </CardContent>
                        </Card>

                        <Card>
                              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                          New Contacts
                                    </CardTitle>
                                    <PieChart className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                    <div className="text-2xl font-bold">
                                          {stats.newContacts}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                          +3 since last week
                                    </p>
                              </CardContent>
                        </Card>
                  </div>

                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                        <Card>
                              <CardHeader className="flex justify-between items-center pb-2">
                                    <div>
                                          <CardTitle>Recent Projects</CardTitle>
                                          <CardDescription>
                                                A list of your most recent
                                                projects
                                          </CardDescription>
                                    </div>
                                    <Link
                                          href="/admin/projects"
                                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                          View All{" "}
                                          <ArrowRight className="h-3 w-3 ml-1" />
                                    </Link>
                              </CardHeader>
                              <CardContent>
                                    <div className="space-y-4">
                                          {[
                                                {
                                                      id: "1",
                                                      title: "Project 1",
                                                      date: "2023-10-15",
                                                      status: "In Progress",
                                                },
                                                {
                                                      id: "2",
                                                      title: "Project 2",
                                                      date: "2023-10-10",
                                                      status: "Completed",
                                                },
                                                {
                                                      id: "3",
                                                      title: "Project 3",
                                                      date: "2023-09-28",
                                                      status: "Completed",
                                                },
                                                {
                                                      id: "4",
                                                      title: "Project 4",
                                                      date: "2023-10-18",
                                                      status: "In Progress",
                                                },
                                                {
                                                      id: "5",
                                                      title: "Project 5",
                                                      date: "2023-09-15",
                                                      status: "New",
                                                },
                                          ].map((project) => (
                                                <div
                                                      key={project.id}
                                                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 pt-1"
                                                >
                                                      <div>
                                                            <p className="text-sm font-medium">
                                                                  {
                                                                        project.title
                                                                  }
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                  Added on{" "}
                                                                  {new Date(
                                                                        project.date,
                                                                  ).toLocaleDateString()}
                                                            </p>
                                                      </div>
                                                      <Badge
                                                            variant={
                                                                  project.status ===
                                                                  "Completed"
                                                                        ? "outline"
                                                                        : project.status ===
                                                                            "In Progress"
                                                                          ? "secondary"
                                                                          : "default"
                                                            }
                                                            className={
                                                                  project.status ===
                                                                  "Completed"
                                                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                                        : project.status ===
                                                                            "In Progress"
                                                                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                                                          : ""
                                                            }
                                                      >
                                                            {project.status}
                                                      </Badge>
                                                </div>
                                          ))}
                                    </div>
                              </CardContent>
                        </Card>

                        <Card>
                              <CardHeader className="flex justify-between items-center pb-2">
                                    <div>
                                          <CardTitle>Recent Contacts</CardTitle>
                                          <CardDescription>
                                                New contact form submissions
                                          </CardDescription>
                                    </div>
                                    <Link
                                          href="/admin/contacts"
                                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                          View All{" "}
                                          <ArrowRight className="h-3 w-3 ml-1" />
                                    </Link>
                              </CardHeader>
                              <CardContent>
                                    <div className="space-y-4">
                                          {[
                                                {
                                                      id: "1",
                                                      name: "Contact 1",
                                                      date: "2023-10-19",
                                                      status: "New",
                                                },
                                                {
                                                      id: "2",
                                                      name: "Contact 2",
                                                      date: "2023-10-17",
                                                      status: "Contacted",
                                                },
                                                {
                                                      id: "3",
                                                      name: "Contact 3",
                                                      date: "2023-10-16",
                                                      status: "New",
                                                },
                                          ].map((contact) => (
                                                <div
                                                      key={contact.id}
                                                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 pt-1"
                                                >
                                                      <div>
                                                            <p className="text-sm font-medium">
                                                                  {contact.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                  Submitted on{" "}
                                                                  {new Date(
                                                                        contact.date,
                                                                  ).toLocaleDateString()}
                                                            </p>
                                                      </div>
                                                      <Badge
                                                            variant={
                                                                  contact.status ===
                                                                  "Contacted"
                                                                        ? "secondary"
                                                                        : "default"
                                                            }
                                                            className={
                                                                  contact.status ===
                                                                  "Contacted"
                                                                        ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                                                        : ""
                                                            }
                                                      >
                                                            {contact.status}
                                                      </Badge>
                                                </div>
                                          ))}
                                    </div>
                              </CardContent>
                        </Card>
                  </div>

                  <Card>
                        <CardHeader>
                              <CardTitle>Activity</CardTitle>
                              <CardDescription>
                                    Recent activity in your admin panel
                              </CardDescription>
                        </CardHeader>
                        <CardContent>
                              <Tabs defaultValue="all">
                                    <TabsList>
                                          <TabsTrigger value="all">
                                                All
                                          </TabsTrigger>
                                          <TabsTrigger value="projects">
                                                Projects
                                          </TabsTrigger>
                                          <TabsTrigger value="contacts">
                                                Contacts
                                          </TabsTrigger>
                                          <TabsTrigger value="users">
                                                Users
                                          </TabsTrigger>
                                    </TabsList>
                                    <TabsContent
                                          value="all"
                                          className="space-y-4 mt-4"
                                    >
                                          <div className="space-y-4">
                                                {[
                                                      {
                                                            action: "Project created",
                                                            time:
                                                                  Date.now() -
                                                                  1 * 86400000,
                                                      },
                                                      {
                                                            action: "Contact form submitted",
                                                            time:
                                                                  Date.now() -
                                                                  2 * 86400000,
                                                      },
                                                      {
                                                            action: "User logged in",
                                                            time:
                                                                  Date.now() -
                                                                  3 * 86400000,
                                                      },
                                                      {
                                                            action: "Project updated",
                                                            time:
                                                                  Date.now() -
                                                                  4 * 86400000,
                                                      },
                                                      {
                                                            action: "Testimonial added",
                                                            time:
                                                                  Date.now() -
                                                                  5 * 86400000,
                                                      },
                                                ].map((activity, i) => (
                                                      <div
                                                            key={i}
                                                            className="flex items-center border-b pb-3 last:border-0"
                                                      >
                                                            <div className="space-y-1">
                                                                  <p className="text-sm font-medium leading-none">
                                                                        {
                                                                              activity.action
                                                                        }
                                                                  </p>
                                                                  <p className="text-xs text-muted-foreground">
                                                                        {new Date(
                                                                              activity.time,
                                                                        ).toLocaleString()}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </TabsContent>
                                    <TabsContent
                                          value="projects"
                                          className="space-y-4 mt-4"
                                    >
                                          <div className="space-y-4">
                                                {[
                                                      {
                                                            action: "Project created",
                                                            time:
                                                                  Date.now() -
                                                                  1 * 86400000,
                                                      },
                                                      {
                                                            action: "Project updated",
                                                            time:
                                                                  Date.now() -
                                                                  4 * 86400000,
                                                      },
                                                ].map((activity, i) => (
                                                      <div
                                                            key={i}
                                                            className="flex items-center border-b pb-3 last:border-0"
                                                      >
                                                            <div className="space-y-1">
                                                                  <p className="text-sm font-medium leading-none">
                                                                        {
                                                                              activity.action
                                                                        }
                                                                  </p>
                                                                  <p className="text-xs text-muted-foreground">
                                                                        {new Date(
                                                                              activity.time,
                                                                        ).toLocaleString()}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </TabsContent>
                                    <TabsContent
                                          value="contacts"
                                          className="space-y-4 mt-4"
                                    >
                                          <div className="space-y-4">
                                                <div className="flex items-center border-b pb-3">
                                                      <div className="space-y-1">
                                                            <p className="text-sm font-medium leading-none">
                                                                  Contact form
                                                                  submitted
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                  {new Date(
                                                                        Date.now() -
                                                                              86400000,
                                                                  ).toLocaleString()}
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                    </TabsContent>
                                    <TabsContent
                                          value="users"
                                          className="space-y-4 mt-4"
                                    >
                                          <div className="space-y-4">
                                                <div className="flex items-center border-b pb-3">
                                                      <div className="space-y-1">
                                                            <p className="text-sm font-medium leading-none">
                                                                  User logged in
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                  {new Date(
                                                                        Date.now() -
                                                                              2 *
                                                                                    86400000,
                                                                  ).toLocaleString()}
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                    </TabsContent>
                              </Tabs>
                        </CardContent>
                  </Card>
            </div>
      );
}
