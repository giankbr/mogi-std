'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, ArrowRight, ArrowUpRight, Briefcase, MessageSquare, Star, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
            <div className="flex flex-col gap-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                        <div>
                              <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                              <p className="text-muted-foreground mt-2 text-lg">Welcome back! Here's what's happening today.</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Activity className="h-4 w-4" />
                              <span>Last updated: just now</span>
                        </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="hover:shadow-md transition-shadow">
                              <CardHeader className="flex flex-row items-center justify-between pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                          <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                              </CardHeader>
                              <CardContent>
                                    <div className="text-3xl font-bold">{stats.totalProjects}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                          <div className="flex items-center text-sm text-green-600">
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                +2
                                          </div>
                                          <p className="text-xs text-muted-foreground">added this month</p>
                                    </div>
                              </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                              <CardHeader className="flex flex-row items-center justify-between pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
                                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                              </CardHeader>
                              <CardContent>
                                    <div className="text-3xl font-bold">{stats.totalClients}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                          <div className="flex items-center text-sm text-green-600">
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                +4
                                          </div>
                                          <p className="text-xs text-muted-foreground">added this month</p>
                                    </div>
                              </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                              <CardHeader className="flex flex-row items-center justify-between pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Testimonials</CardTitle>
                                    <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                          <Star className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                              </CardHeader>
                              <CardContent>
                                    <div className="text-3xl font-bold">{stats.totalTestimonials}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                          <div className="flex items-center text-sm text-green-600">
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                +8
                                          </div>
                                          <p className="text-xs text-muted-foreground">added this month</p>
                                    </div>
                              </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                              <CardHeader className="flex flex-row items-center justify-between pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">New Contacts</CardTitle>
                                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                          <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                              </CardHeader>
                              <CardContent>
                                    <div className="text-3xl font-bold">{stats.newContacts}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                          <div className="flex items-center text-sm text-green-600">
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                +3
                                          </div>
                                          <p className="text-xs text-muted-foreground">since last week</p>
                                    </div>
                              </CardContent>
                        </Card>
                  </div>

                  {/* Recent Activity Grid */}
                  <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                        <Card className="hover:shadow-md transition-shadow">
                              <CardHeader className="flex flex-row justify-between items-start pb-4">
                                    <div className="space-y-1">
                                          <CardTitle className="text-xl font-semibold">Recent Projects</CardTitle>
                                          <CardDescription>Your latest portfolio work</CardDescription>
                                    </div>
                                    <Link href="/admin/projects" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1 font-medium">
                                          View All
                                          <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                              </CardHeader>
                              <CardContent>
                                    <div className="space-y-3">
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
                                                <div key={project.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors group">
                                                      <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center">
                                                                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                            </div>
                                                            <div>
                                                                  <p className="text-sm font-semibold group-hover:text-accent transition-colors">{project.title}</p>
                                                                  <p className="text-xs text-muted-foreground">Added {new Date(project.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                                            </div>
                                                      </div>
                                                      <Badge variant={project.status === 'Completed' ? 'outline' : project.status === 'In Progress' ? 'secondary' : 'default'} className={project.status === 'Completed' ? 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400' : project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400' : ''}>
                                                            {project.status}
                                                      </Badge>
                                                </div>
                                          ))}
                                    </div>
                              </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                              <CardHeader className="flex flex-row justify-between items-start pb-4">
                                    <div className="space-y-1">
                                          <CardTitle className="text-xl font-semibold">Recent Contacts</CardTitle>
                                          <CardDescription>New form submissions</CardDescription>
                                    </div>
                                    <Link href="/admin/contacts" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1 font-medium">
                                          View All
                                          <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                              </CardHeader>
                              <CardContent>
                                    <div className="space-y-3">
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
                                                <div key={contact.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors group">
                                                      <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center">
                                                                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                                            </div>
                                                            <div>
                                                                  <p className="text-sm font-semibold group-hover:text-accent transition-colors">{contact.name}</p>
                                                                  <p className="text-xs text-muted-foreground">Submitted {new Date(contact.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                                            </div>
                                                      </div>
                                                      <Badge variant={contact.status === 'Contacted' ? 'secondary' : 'default'} className={contact.status === 'Contacted' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400' : ''}>
                                                            {contact.status}
                                                      </Badge>
                                                </div>
                                          ))}
                                    </div>
                              </CardContent>
                        </Card>
                  </div>

                  {/* Activity Section */}
                  <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                              <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                                          <Activity className="h-4 w-4" />
                                    </div>
                                    <div>
                                          <CardTitle className="text-xl">Activity Timeline</CardTitle>
                                          <CardDescription>Recent events in your admin panel</CardDescription>
                                    </div>
                              </div>
                        </CardHeader>
                        <CardContent>
                              <Tabs defaultValue="all" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4">
                                          <TabsTrigger value="all">All</TabsTrigger>
                                          <TabsTrigger value="projects">Projects</TabsTrigger>
                                          <TabsTrigger value="contacts">Contacts</TabsTrigger>
                                          <TabsTrigger value="users">Users</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="all" className="space-y-4 mt-6">
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
                                                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                  <div className="h-2 w-2 rounded-full bg-accent" />
                                                            </div>
                                                            <div className="flex-1 space-y-1">
                                                                  <p className="text-sm font-medium">{activity.action}</p>
                                                                  <p className="text-xs text-muted-foreground">{new Date(activity.time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </TabsContent>
                                    <TabsContent value="projects" className="space-y-4 mt-6">
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
                                                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                  <div className="h-2 w-2 rounded-full bg-accent" />
                                                            </div>
                                                            <div className="flex-1 space-y-1">
                                                                  <p className="text-sm font-medium">{activity.action}</p>
                                                                  <p className="text-xs text-muted-foreground">{new Date(activity.time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </TabsContent>
                                    <TabsContent value="contacts" className="space-y-4 mt-6">
                                          <div className="space-y-4">
                                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <div className="h-2 w-2 rounded-full bg-accent" />
                                                      </div>
                                                      <div className="flex-1 space-y-1">
                                                            <p className="text-sm font-medium">Contact form submitted</p>
                                                            <p className="text-xs text-muted-foreground">{new Date(Date.now() - 86400000).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                                                      </div>
                                                </div>
                                          </div>
                                    </TabsContent>
                                    <TabsContent value="users" className="space-y-4 mt-6">
                                          <div className="space-y-4">
                                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <div className="h-2 w-2 rounded-full bg-accent" />
                                                      </div>
                                                      <div className="flex-1 space-y-1">
                                                            <p className="text-sm font-medium">User logged in</p>
                                                            <p className="text-xs text-muted-foreground">{new Date(Date.now() - 2 * 86400000).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
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
