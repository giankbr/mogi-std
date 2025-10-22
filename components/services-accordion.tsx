'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function ServicesAccordion({ className }: { className?: string }) {
  const { t } = useLanguage();

  const services = [
    {
      id: '01',
      title: t('services.service1Title'),
      body: t('services.service1Body'),
    },
    {
      id: '02',
      title: t('services.service2Title'),
      body: t('services.service2Body'),
    },
    {
      id: '03',
      title: t('services.service3Title'),
      body: t('services.service3Body'),
    },
  ];

  return (
    <section id="services-accordion" aria-labelledby="services-accordion-title" className={cn('mx-auto max-w-6xl px-4', className)}>
      <div className="mb-10 md:mb-14 text-center md:text-left">
        <h2 id="services-accordion-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {t('services.title')} <br className="hidden md:block" />
          <span className="text-accent">{t('services.titleAccent')}</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">{t('services.subtitle')}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-5">
          {services.map((s, index) => (
            <div key={s.id} className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow">
              <Accordion type="single" collapsible>
                <AccordionItem value={s.id} className="border-0">
                  <AccordionTrigger className="px-6 md:px-8 py-6 hover:no-underline [&[data-state=open]]:text-accent">
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-left">{s.title}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 md:px-8 pb-6">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">{s.body}</p>
                    <a href="#work" className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-accent hover:gap-3 transition-all group/link">
                      {t('services.learnMore')}
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden border bg-card group/image h-[400px] lg:h-full lg:min-h-[500px] shadow-sm">
          <Image src="/placeholder.jpg" alt="Service preview" width={800} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-8 left-8 right-8 opacity-0 group-hover/image:opacity-100 transition-all duration-300 translate-y-4 group-hover/image:translate-y-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm md:text-base font-medium text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105"
            >
              {t('services.bookCall')}
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
