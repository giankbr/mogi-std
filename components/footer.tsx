'use client';

import { SocialLinks } from '@/components/social-links';
import { useLanguage } from '@/lib/language-context';
import Link from 'next/link';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-center">
            <ul className="flex items-center gap-8 text-sm">
              <li>
                <Link href="/#work" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.work')}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.services')}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>

            <SocialLinks />
          </nav>
        </div>
      </div>
    </footer>
  );
}
