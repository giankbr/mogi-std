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
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navbar />
      <MotionSection delay={0.0}>
        <Hero />
      </MotionSection>

      <MotionSection delay={0.05}>
        <ClientsRow className="py-4 md:py-6" />
      </MotionSection>

      <section id="about" className="mx-auto max-w-6xl px-4 py-4 md:py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">{t('about.byNumbers')}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {t('about.raisedAmount')}
              <span className="text-accent">+</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{t('about.raisedText')}</p>
          </div>
          <div className="rounded-xl border bg-card p-6 md:col-span-2">
            <h2 className="font-serif text-balance text-2xl font-semibold tracking-tight md:text-3xl">{t('about.mission')}</h2>
            <div className="mt-4">
              <a href="#services" className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                {t('about.moreAbout')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <MotionSection delay={0.1}>
        <StatsRow className="pt-0 md:pt-0 pb-4 md:pb-6" />
      </MotionSection>

      <MotionSection delay={0.15}>
        <FeatureCards className="py-4 md:py-6" />
      </MotionSection>

      <MotionSection delay={0.2}>
        <ServicesAccordion className="py-4 md:py-6" />
      </MotionSection>

      {/* <MotionSection delay={0.25}>
        <TeamSection />
      </MotionSection> */}

      {/* <MotionSection delay={0.3}>
        <WorkGrid />
      </MotionSection> */}

      <MotionSection delay={0.35}>
        <Testimonials className="py-4 md:py-6" />
      </MotionSection>

      <MotionSection delay={0.4}>
        <FAQ className="py-4 md:py-6" />
      </MotionSection>

      {/* <MotionSection delay={0.45}>
        <Newsletter />
      </MotionSection> */}

      <MotionSection delay={0.5}>
        <ContactForm className="py-4 md:py-6" />
      </MotionSection>

      <footer className="mt-4 md:mt-6 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Newsletter Section in Footer */}
          {/* <div className="mb-8 pb-8 border-b">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h3>
              <p className="text-xs text-muted-foreground mb-4">Monthly insights and design inspiration.</p>
              <Newsletter variant="minimal" />
            </div>
          </div> */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-foreground">
                © {new Date().getFullYear()} {t('footer.copyright')}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t('footer.tagline')}</p>
            </div>

            <nav aria-label="Footer" className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
              <ul className="flex items-center gap-6 text-sm">
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
