"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
      ChevronLeft,
      ChevronRight,
      Gauge,
      Image as ImageIcon,
      LogOut,
      Menu,
      MessageSquare,
      Settings,
      Star,
      Users,
      Home,
      Sun,
      Moon,
      User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
      {
            title: "Dashboard",
            icon: Gauge,
            href: "/admin",
      },
      {
            title: "Projects",
            icon: ImageIcon,
            href: "/admin/projects",
      },
      {
            title: "Clients",
            icon: Users,
            href: "/admin/clients",
      },
      {
            title: "Testimonials",
            icon: Star,
            href: "/admin/testimonials",
      },
      {
            title: "Services",
            icon: Settings,
            href: "/admin/services",
      },
      {
            title: "Contact Submissions",
            icon: MessageSquare,
            href: "/admin/contacts",
      },
];

export default function AdminLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      const pathname = usePathname();
      const [isCollapsed, setIsCollapsed] = useState(false);
      const [isMobileOpen, setIsMobileOpen] = useState(false);
      const { theme, setTheme } = useTheme();

      // Check if we're on a mobile device and set sidebar accordingly
      useEffect(() => {
            const checkMobile = () => {
                  return window.innerWidth < 768;
            };

            // Initialize collapsed state based on screen size
            setIsCollapsed(checkMobile());

            // Update collapsed state on resize
            const handleResize = () => {
                  if (checkMobile()) {
                        setIsCollapsed(true);
                  }
            };

            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
      }, []);

      // Close mobile sidebar when navigating
      useEffect(() => {
            setIsMobileOpen(false);
      }, [pathname]);

      const toggleTheme = () => {
            setTheme(theme === "dark" ? "light" : "dark");
      };

      return (
            <div className="flex min-h-screen bg-background">
                  {/* Desktop sidebar */}
                  <div
                        className={cn(
                              "hidden md:flex flex-col border-r transition-all duration-300",
                              isCollapsed ? "w-[70px]" : "w-[240px]",
                        )}
                  >
                        <div
                              className={cn(
                                    "flex items-center h-16 px-4 border-b transition-all duration-300",
                                    isCollapsed
                                          ? "justify-center"
                                          : "justify-between",
                              )}
                        >
                              {!isCollapsed && (
                                    <Link
                                          href="/admin"
                                          className="font-semibold text-lg"
                                    >
                                          Mogi Studio Admin
                                    </Link>
                              )}
                              <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className={isCollapsed ? "" : "ml-auto"}
                              >
                                    {isCollapsed ? (
                                          <ChevronRight className="h-5 w-5" />
                                    ) : (
                                          <ChevronLeft className="h-5 w-5" />
                                    )}
                              </Button>
                        </div>

                        <div className="flex-1 overflow-auto py-4">
                              <nav className="grid gap-1 px-2">
                                    {sidebarItems.map((item) => {
                                          const isActive =
                                                pathname === item.href ||
                                                pathname.startsWith(
                                                      `${item.href}/`,
                                                );
                                          return (
                                                <Link
                                                      key={item.title}
                                                      href={item.href}
                                                      className={cn(
                                                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                                            isActive
                                                                  ? "bg-accent text-accent-foreground"
                                                                  : "text-foreground opacity-80",
                                                            isCollapsed
                                                                  ? "justify-center"
                                                                  : "",
                                                      )}
                                                      title={
                                                            isCollapsed
                                                                  ? item.title
                                                                  : undefined
                                                      }
                                                >
                                                      <item.icon
                                                            className={cn(
                                                                  "h-5 w-5",
                                                                  isCollapsed
                                                                        ? "flex-none"
                                                                        : "flex-shrink-0",
                                                            )}
                                                      />
                                                      {!isCollapsed && (
                                                            <span>
                                                                  {item.title}
                                                            </span>
                                                      )}
                                                </Link>
                                          );
                                    })}
                              </nav>
                        </div>

                        <div
                              className={cn(
                                    "border-t p-4 flex",
                                    isCollapsed
                                          ? "justify-center"
                                          : "justify-between items-center",
                              )}
                        >
                              {!isCollapsed && (
                                    <span className="text-sm text-muted-foreground">
                                          Mogi Studio
                                    </span>
                              )}
                              <Link
                                    href="/"
                                    className={cn(
                                          "rounded-md hover:bg-accent hover:text-accent-foreground p-2",
                                          isCollapsed ? "" : "ml-auto",
                                    )}
                                    title="Back to site"
                              >
                                    <Home className="h-5 w-5" />
                              </Link>
                        </div>
                  </div>

                  {/* Mobile sidebar */}
                  <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                        <SheetContent side="left" className="w-[240px] p-0">
                              <div className="flex flex-col h-full">
                                    <div className="flex items-center h-16 px-4 border-b">
                                          <Link
                                                href="/admin"
                                                className="font-semibold text-lg"
                                          >
                                                Mogi Studio Admin
                                          </Link>
                                    </div>
                                    <div className="flex-1 overflow-auto py-4">
                                          <nav className="grid gap-1 px-2">
                                                {sidebarItems.map((item) => {
                                                      const isActive =
                                                            pathname ===
                                                                  item.href ||
                                                            pathname.startsWith(
                                                                  `${item.href}/`,
                                                            );
                                                      return (
                                                            <Link
                                                                  key={
                                                                        item.title
                                                                  }
                                                                  href={
                                                                        item.href
                                                                  }
                                                                  className={cn(
                                                                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                                                        isActive
                                                                              ? "bg-accent text-accent-foreground"
                                                                              : "text-foreground opacity-80",
                                                                  )}
                                                            >
                                                                  <item.icon className="h-5 w-5 flex-shrink-0" />
                                                                  <span>
                                                                        {
                                                                              item.title
                                                                        }
                                                                  </span>
                                                            </Link>
                                                      );
                                                })}
                                          </nav>
                                    </div>
                                    <div className="border-t p-4 flex justify-between items-center">
                                          <span className="text-sm text-muted-foreground">
                                                Mogi Studio
                                          </span>
                                          <Link
                                                href="/"
                                                className="rounded-md hover:bg-accent hover:text-accent-foreground p-2 ml-auto"
                                                title="Back to site"
                                          >
                                                <Home className="h-5 w-5" />
                                          </Link>
                                    </div>
                              </div>
                        </SheetContent>
                  </Sheet>

                  {/* Main content */}
                  <div className="flex flex-col flex-1">
                        {/* Top navbar */}
                        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 border-b md:px-6">
                              <div className="flex items-center gap-2">
                                    {/* Mobile menu trigger */}
                                    <Button
                                          variant="outline"
                                          size="icon"
                                          className="md:hidden"
                                          onClick={() => setIsMobileOpen(true)}
                                    >
                                          <Menu className="h-5 w-5" />
                                          <span className="sr-only">
                                                Toggle menu
                                          </span>
                                    </Button>

                                    {/* Brand name */}
                                    <div className="md:hidden font-semibold text-lg">
                                          Mogi Studio
                                    </div>

                                    {/* Desktop - current section */}
                                    <div className="hidden md:block font-semibold">
                                          {sidebarItems.find(
                                                (item) =>
                                                      pathname === item.href ||
                                                      pathname.startsWith(
                                                            `${item.href}/`,
                                                      ),
                                          )?.title || "Dashboard"}
                                    </div>
                              </div>

                              {/* Right side actions */}
                              <div className="flex items-center gap-2">
                                    {/* Theme toggle */}
                                    <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={toggleTheme}
                                          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                                    >
                                          {theme === "dark" ? (
                                                <Sun className="h-5 w-5" />
                                          ) : (
                                                <Moon className="h-5 w-5" />
                                          )}
                                    </Button>

                                    {/* User dropdown */}
                                    <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                                <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="gap-2"
                                                >
                                                      <User className="h-4 w-4" />
                                                      <span className="hidden sm:inline-block">
                                                            Admin
                                                      </span>
                                                </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                      <Link
                                                            href="/"
                                                            className="flex w-full items-center"
                                                      >
                                                            <Home className="mr-2 h-4 w-4" />
                                                            View Site
                                                      </Link>
                                                </DropdownMenuItem>
                                                <Separator className="my-1" />
                                                <DropdownMenuItem className="flex items-center text-destructive focus:text-destructive">
                                                      <LogOut className="mr-2 h-4 w-4" />{" "}
                                                      Logout
                                                </DropdownMenuItem>
                                          </DropdownMenuContent>
                                    </DropdownMenu>
                              </div>
                        </header>

                        {/* Page content */}
                        <main
                              className={cn(
                                    "flex-1 overflow-auto",
                                    !isCollapsed
                                          ? "md:pl-[240px]"
                                          : "md:pl-[70px]",
                              )}
                        >
                              <div className="container mx-auto py-6 px-4">
                                    {children}
                              </div>
                        </main>
                  </div>
            </div>
      );
}
