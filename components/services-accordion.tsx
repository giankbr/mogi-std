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
      <div className="mb-5 md:mb-6 grid gap-6 md:grid-cols-2 md:items-end">
        <div>
          <h2 id="services-accordion-title" className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
            We don’t do templates. We do intent.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Every project starts from zero and ends with a punch.</p>
        </div>
        <div className="md:justify-self-end">
          <a href="#contact" className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
            Book a call
          </a>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Accordion type="single" collapsible className="rounded-xl border bg-card px-2">
          {services.map((s) => (
            <AccordionItem key={s.id} value={s.id}>
              <AccordionTrigger className="px-4">
                <span className="text-muted-foreground mr-4">{s.id}</span>
                {s.title}
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                <a href="#work" className="mt-3 inline-block text-sm underline">
                  Learn more
                </a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="rounded-xl overflow-hidden border bg-card">
          <Image src="/placeholder.jpg" alt="Service preview" width={800} height={600} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
