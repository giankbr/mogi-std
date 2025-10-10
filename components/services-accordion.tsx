'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const services = [
  {
    id: '01',
    title: 'Brand Identity',
    body: 'Strategic platforms and unmistakable visual systems that make your brand impossible to ignore.',
  },
  {
    id: '02',
    title: 'Web & UX Design',
    body: 'Conversion‑focused websites—minimal when it should be, expressive when it matters. Built to impress.',
  },
  {
    id: '03',
    title: 'Motion & Visual Art',
    body: 'Art direction, motion, and content that bring stories to life across screens and channels.',
  },
];

export function ServicesAccordion({ className }: { className?: string }) {
  return (
    <section id="services-accordion" aria-labelledby="services-accordion-title" className={cn('mx-auto max-w-6xl px-4 py-4 md:py-6', className)}>
      <div className="mb-6 md:mb-8 text-center md:text-left">
        <h2 id="services-accordion-title" className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
          We don't do templates. <br className="hidden md:block" />
          <span className="text-accent">We do intent.</span>
        </h2>
        <p className="mt-3 text-base text-muted-foreground max-w-2xl">Every project starts from zero and ends with a punch.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {services.map((s, index) => (
            <div key={s.id} className="rounded-2xl border bg-card">
              <Accordion type="single" collapsible>
                <AccordionItem value={s.id} className="border-0">
                  <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:text-accent">
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-left">{s.title}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.body}</p>
                    <a href="#work" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all group/link">
                      Learn more
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden border bg-card group/image h-[400px] lg:h-auto">
          <Image src="/placeholder.jpg" alt="Service preview" width={800} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 translate-y-4 group-hover/image:translate-y-0">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors">
              Book a call
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
