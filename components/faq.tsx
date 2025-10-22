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
      category: 'Process',
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2'),
      category: 'Services',
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3'),
      category: 'Timeline',
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4'),
      category: 'Pricing',
    },
  ];

  return (
    <section id="faq" aria-labelledby="faq-title" className={cn('mx-auto max-w-6xl px-4', className)}>
      <div className="mb-10 md:mb-14">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-3">FAQ</p>
          <h2 id="faq-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Got questions? We've got answers. Can't find what you're looking for?{' '}
            <a href="#contact" className="text-accent hover:underline">
              Get in touch
            </a>
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:gap-5 md:grid-cols-2">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all group">
            <Accordion type="single" collapsible>
              <AccordionItem value={`q${i}`} className="border-0">
                <AccordionTrigger className="px-6 md:px-8 py-6 hover:no-underline text-left [&[data-state=open]>div>span]:text-accent">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-sm transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">{f.category}</p>
                      <h3 className="font-serif text-base md:text-lg font-semibold pr-4">{f.q}</h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 md:px-8 pb-6 pl-[4.5rem] md:pl-[5rem]">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 md:mt-16 text-center">
        <div className="rounded-2xl border bg-gradient-to-br from-card to-muted/20 p-8 md:p-12">
          <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">Still have questions?</h3>
          <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-xl mx-auto">Can't find the answer you're looking for? Our team is here to help you get started.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm md:text-base font-medium text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105"
            >
              Contact us
              <span>→</span>
            </a>
            <a
              href="mailto:hello@mogistudio.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border bg-background px-6 py-3 text-sm md:text-base font-medium hover:bg-muted transition-colors"
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
