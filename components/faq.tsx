'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';

export function FAQ({ className }: { className?: string }) {
  const { t } = useLanguage();

  const faqs = [
    {
      q: t('faq.q1'),
      a: t('faq.a1'),
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2'),
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3'),
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4'),
    },
  ];

  return (
    <section id="faq" aria-labelledby="faq-title" className={cn('mx-auto max-w-6xl px-4 py-8 md:py-12', className)}>
      <div className="mb-4">
        <h2 id="faq-title" className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
          {t('faq.title')}
        </h2>
      </div>
      <Accordion type="single" collapsible className="rounded-xl border bg-card px-2">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`q${i}`}>
            <AccordionTrigger className="px-4">{f.q}</AccordionTrigger>
            <AccordionContent className="px-4 text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
