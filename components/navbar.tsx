'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Navbar({ className }: { className?: string }) {
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
        <nav aria-label="Primary">
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
      </div>
    </header>
  );
}
