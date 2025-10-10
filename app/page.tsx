import { ClientsRow } from '@/components/clients-row';
import { CtaBanner } from '@/components/cta-banner';
import { FAQ } from '@/components/faq';
import { FeatureCards } from '@/components/feature-cards';
import { Hero } from '@/components/hero';
import { MotionSection } from '@/components/motion-section';
import { Navbar } from '@/components/navbar';
import { ServicesAccordion } from '@/components/services-accordion';
import { StatsRow } from '@/components/stats-row';
import { Testimonials } from '@/components/testimonials';
import { WorkGrid } from '@/components/work-grid';

export default function Page() {
  return (
    <main>
      <Navbar />
      <MotionSection delay={0.0}>
        <Hero />
      </MotionSection>

      <MotionSection delay={0.05}>
        <ClientsRow />
      </MotionSection>

      <section id="about" className="mx-auto max-w-6xl px-4 py-4 md:py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">BY THE NUMBERS</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              $128k<span className="text-accent">+</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">raised by clients after collaboration</p>
          </div>
          <div className="rounded-xl border bg-card p-6 md:col-span-2">
            <h2 className="font-serif text-balance text-2xl font-semibold tracking-tight md:text-3xl">We exist for brands who speak louder, stand taller, and never apologize for taking up space.</h2>
            <div className="mt-4">
              <a href="#services" className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                More about us
              </a>
            </div>
          </div>
        </div>
      </section>

      <MotionSection delay={0.1}>
        <StatsRow className="pt-0 md:pt-0" />
      </MotionSection>

      <MotionSection delay={0.15}>
        <FeatureCards />
      </MotionSection>

      <MotionSection delay={0.2}>
        <ServicesAccordion />
      </MotionSection>

      <MotionSection delay={0.25}>
        <WorkGrid />
      </MotionSection>

      <MotionSection delay={0.3}>
        <Testimonials className="pb-4 md:pb-6" />
      </MotionSection>

      <MotionSection delay={0.35}>
        <FAQ className="pb-4 md:pb-6" />
      </MotionSection>

      <MotionSection delay={0.4}>
        <CtaBanner className="pb-4 md:pb-6" />
      </MotionSection>

      <footer className="mt-6 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex items-center justify-between">
          <p>© {new Date().getFullYear()} Mogi Studio</p>
          <nav aria-label="Footer">
            <ul className="flex items-center gap-4">
              <li>
                <a href="#work" className="hover:underline">
                  Work
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </main>
  );
}
