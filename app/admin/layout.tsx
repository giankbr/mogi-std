'use client';

import { ChevronLeft, ChevronRight, Gauge, Home, Image as ImageIcon, LogOut, Menu, MessageSquare, Moon, Settings, Star, Sun, User, Users } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: Gauge,
    href: '/admin',
  },
  {
    title: 'Projects',
    icon: ImageIcon,
    href: '/admin/projects',
  },
  {
    title: 'Clients',
    icon: Users,
    href: '/admin/clients',
  },
  {
    title: 'Testimonials',
    icon: Star,
    href: '/admin/testimonials',
  },
  {
    title: 'Services',
    icon: Settings,
    href: '/admin/services',
  },
  {
    title: 'Contact Submissions',
    icon: MessageSquare,
    href: '/admin/contacts',
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className={cn('hidden md:flex flex-col border-r bg-card transition-all duration-300', isCollapsed ? 'w-[80px]' : 'w-[260px]')}>
        <div className={cn('flex items-center h-16 border-b', isCollapsed ? 'justify-center px-3' : 'justify-between px-5')}>
          {!isCollapsed && (
            <Link href="/admin" className="font-serif font-bold text-xl tracking-tight">
              Mogi Studio<span className="text-accent">®</span>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/admin" className="font-serif font-bold text-2xl text-accent" title="Mogi Studio Admin">
              M
            </Link>
          )}
          {!isCollapsed && (
            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="hover:bg-muted ml-auto">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-auto py-6">
          <nav className="grid gap-2 px-3">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg text-sm font-medium transition-all relative',
                    isActive && !isCollapsed
                      ? 'bg-accent/10 text-accent border-l-2 border-accent pl-3 pr-4 py-3'
                      : isActive && isCollapsed
                      ? 'bg-accent/10 text-accent justify-center p-3'
                      : isCollapsed
                      ? 'hover:bg-muted text-muted-foreground hover:text-foreground justify-center p-3'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground px-4 py-3'
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                  {isCollapsed && isActive && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={cn('border-t p-3 flex gap-2', isCollapsed ? 'flex-col items-stretch' : 'items-center')}>
          {isCollapsed ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsCollapsed(false)} 
                className="hover:bg-muted"
                title="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Link href="/" className="rounded-lg hover:bg-muted p-2.5 transition-colors flex items-center justify-center" title="Back to site">
                <Home className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <div className="flex-1">
                <p className="text-xs font-medium">Admin Panel</p>
                <p className="text-xs text-muted-foreground">Mogi Studio</p>
              </div>
              <Link href="/" className="rounded-lg hover:bg-muted p-2.5 transition-colors" title="Back to site">
                <Home className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-[260px] p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-5 border-b">
              <Link href="/admin" className="font-serif font-bold text-xl tracking-tight">
                Mogi Studio<span className="text-accent">®</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-6">
              <nav className="grid gap-2 px-3">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg text-sm font-medium transition-all relative',
                        isActive 
                          ? 'bg-accent/10 text-accent border-l-2 border-accent pl-3 pr-4 py-3' 
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground px-4 py-3'
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="border-t p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs font-medium">Admin Panel</p>
                <p className="text-xs text-muted-foreground">Mogi Studio</p>
              </div>
              <Link href="/" className="rounded-lg hover:bg-muted p-2.5 transition-colors" title="Back to site">
                <Home className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Top navbar */}
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Brand name - Mobile */}
            <div className="md:hidden font-serif font-bold text-lg">
              Mogi Studio<span className="text-accent">®</span>
            </div>

            {/* Desktop - current section */}
            <div className="hidden md:block">
              <h1 className="font-semibold text-lg">{sidebarItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.title || 'Dashboard'}</h1>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block font-medium">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex w-full items-center cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    View Site
                  </Link>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem className="flex items-center text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-muted/30">
          <div className="p-6 md:p-8 max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
