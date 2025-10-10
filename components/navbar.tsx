'use client';

import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { href: '#work', label: t('nav.work'), number: '01' },
    { href: '#services', label: t('nav.services'), number: '02' },
    { href: '#about', label: t('nav.about'), number: '03' },
    { href: '#contact', label: t('nav.contact'), number: '04' },
  ];

  return (
    <>
      <header className={cn('sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b', className)}>
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-lg relative z-50">
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
                  {t('nav.work')}
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:underline">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:underline">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <LanguageToggle />
              </li>
              <li>
                <ThemeToggle />
              </li>
              <li>
                <Link href="#contact" className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                  {t('nav.getInTouch')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="relative z-50 p-2 hover:text-accent transition-colors" aria-label="Toggle menu">
              <div className="relative w-6 h-6">
                <span className={cn('absolute top-1/2 left-0 w-full h-0.5 bg-current transition-all duration-300', mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2')} />
                <span className={cn('absolute top-1/2 left-0 w-full h-0.5 bg-current transition-all duration-300', mobileMenuOpen ? 'opacity-0' : 'opacity-100')} />
                <span className={cn('absolute top-1/2 left-0 w-full h-0.5 bg-current transition-all duration-300', mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2')} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Sheet Mobile Menu */}
      <div className={cn('fixed inset-0 z-40 md:hidden transition-all duration-300', mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none')}>
        {/* Backdrop */}
        <div onClick={() => setMobileMenuOpen(false)} className={cn('absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300', mobileMenuOpen ? 'opacity-100' : 'opacity-0')} />

        {/* Bottom Sheet Content */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl border-t shadow-2xl transition-transform duration-500 ease-out',
            mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
          </div>

          {/* Menu Content */}
          <nav aria-label="Mobile" className="px-6 pb-8 pt-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li
                  key={item.href}
                  className={cn('transform transition-all duration-500', mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}
                  style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' }}
                >
                  <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="group flex items-center justify-between py-4 px-4 rounded-xl hover:bg-accent/5 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-semibold text-accent">{item.number}</span>
                      <span className="font-serif text-xl font-semibold">{item.label}</span>
                    </div>
                    <svg className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className={cn('mt-6 transform transition-all duration-500 delay-300', mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-accent px-6 py-4 text-base font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                {t('nav.startProject')}
                <span>→</span>
              </Link>
            </div>

            {/* Bottom Safe Area */}
            <div className="h-4" />
          </nav>
        </div>
      </div>
    </>
  );
}
