'use client';

import { ClientsRow } from '@/components/clients-row';
import { ContactForm } from '@/components/contact-form';
import { FAQ } from '@/components/faq';
import { FeatureCards } from '@/components/feature-cards';
import { Hero } from '@/components/hero';
import { MotionSection } from '@/components/motion-section';
import { Navbar } from '@/components/navbar';
import { ServicesAccordion } from '@/components/services-accordion';
import { SocialLinks } from '@/components/social-links';
import { StatsRow } from '@/components/stats-row';
import { Testimonials } from '@/components/testimonials';
import { WorkGrid } from '@/components/work-grid';
import { useLanguage } from '@/lib/language-context';

export default function Page() {
  const { t } = useLanguage();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mogi Studio',
    alternateName: 'Mogi Studio Design Agency',
    url: 'https://mogistudio.com',
    logo: 'https://mogistudio.com/logo.png',
    description: 'Bold design and brand identity agency crafting high-impact brands and websites that refuse to blend in.',
    sameAs: ['https://instagram.com/mogistudio', 'https://twitter.com/mogistudio', 'https://linkedin.com/company/mogistudio', 'https://dribbble.com/mogistudio', 'https://behance.net/mogistudio'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@mogistudio.com',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    founder: {
      '@type': 'Person',
      name: 'Gian',
      jobTitle: 'Creative Director',
    },
    serviceType: ['Brand Identity', 'Web Design & Development', 'Motion & Visual Art', 'UX Design', 'Brand Strategy'],
  };

  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navbar />

      {/* Hero Section */}
      <MotionSection delay={0.0}>
        <Hero />
      </MotionSection>

      {/* Clients Marquee */}
      <MotionSection delay={0.05}>
        <ClientsRow className="py-6 md:py-8" />
      </MotionSection>

      {/* About Section */}
      <section id="about" className="mx-auto max-w-6xl px-4 pt-8 md:pt-12 pb-12 md:pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-8 md:p-10">
            <p className="text-sm text-muted-foreground">{t('about.byNumbers')}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight">
              {t('about.raisedAmount')}
              <span className="text-accent">+</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t('about.raisedText')}</p>
          </div>
          <div className="rounded-xl border bg-card p-8 md:p-10 md:col-span-2">
            <h2 className="font-serif text-balance text-2xl font-semibold tracking-tight md:text-4xl">{t('about.mission')}</h2>
            <div className="mt-6">
              <a href="#services" className="inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-105">
                {t('about.moreAbout')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <MotionSection delay={0.1}>
        <StatsRow className="pt-0 pb-8 md:pb-12" />
      </MotionSection>

      {/* Feature Cards */}
      <MotionSection delay={0.15}>
        <FeatureCards className="py-8 md:py-12" />
      </MotionSection>

      {/* Services Section */}
      <MotionSection delay={0.2}>
        <ServicesAccordion className="py-8 md:py-12" />
      </MotionSection>

      {/* Work Grid */}
      <MotionSection delay={0.3}>
        <section id="work" className="py-8 md:py-12">
          <WorkGrid />
        </section>
      </MotionSection>

      {/* Testimonials */}
      <MotionSection delay={0.35}>
        <Testimonials className="py-8 md:py-12" />
      </MotionSection>

      {/* FAQ Section */}
      <MotionSection delay={0.4}>
        <FAQ className="py-8 md:py-12" />
      </MotionSection>

      {/* Contact Form */}
      <MotionSection delay={0.5}>
        <ContactForm className="py-8 md:py-12" />
      </MotionSection>

      {/* Footer */}
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
                  <a href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('footer.work')}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('footer.services')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('footer.contact')}
                  </a>
                </li>
              </ul>

              <SocialLinks />
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
