'use client';

import { SocialLinks } from '@/components/social-links';
import { useLanguage } from '@/lib/language-context';
import { IconMail, IconMapPin } from '@tabler/icons-react';
import Link from 'next/link';

export function Footer() {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-6xl px-4">
        {/* Main Footer Content */}
        <div className="grid gap-8 py-12 md:py-16 md:grid-cols-12">
          {/* Brand & Contact Info - Takes 5 columns */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <Link href="/" className="font-serif font-bold text-2xl tracking-tight hover:text-accent transition-colors inline-block">
                Mogi Studio<span className="text-accent">®</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <IconMail className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Email</p>
                  <a href="mailto:hello@mogistudio.com" className="hover:text-accent transition-colors">
                    hello@mogistudio.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <IconMapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Location</p>
                  <p>Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links - Takes 7 columns, distributed */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Company */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/#about" className="text-muted-foreground hover:text-accent transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#work" className="text-muted-foreground hover:text-accent transition-colors">
                    {t('footer.work')}
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-accent transition-colors">
                    {t('footer.services')}
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-muted-foreground hover:text-accent transition-colors">
                    {t('footer.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Services
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-accent transition-colors">
                    Brand Identity
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-accent transition-colors">
                    Web Design
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-accent transition-colors">
                    UX/UI Design
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-accent transition-colors">
                    Motion Design
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Follow Us
              </h3>
              <div className="flex flex-col gap-3">
                <SocialLinks variant="footer" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} {t('footer.copyright')}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
