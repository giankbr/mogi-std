'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn('sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b', className)}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Mogi Studio
          <span aria-hidden="true" className="text-accent">
            ®
          </span>
          <span className="sr-only">Mogi Studio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <Link href="#work" className="hover:underline">
                Work
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
            <li>
              <Link href="#contact" className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                Get in touch
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-4">
            <ul className="space-y-3">
              <li>
                <Link href="#work" className="block py-2 hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Work
                </Link>
              </li>
              <li>
                <Link href="#services" className="block py-2 hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="block py-2 hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="block text-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
