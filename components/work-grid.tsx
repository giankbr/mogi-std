'use client';

import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const projects = [
  { title: 'Reimagine Wellness', tag: 'Brand + Web' },
  { title: 'Harmonia', tag: 'E‑commerce' },
  { title: 'Subway® Concept', tag: 'Identity' },
  { title: 'Move It Move It!', tag: 'Motion' },
  { title: 'Satori', tag: 'Product Site' },
  { title: 'Analog FM', tag: 'Visual System' },
];

export function WorkGrid({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <section className={cn('mx-auto max-w-6xl px-4', className)} aria-labelledby="work-title">
      <div className="mb-8 md:mb-12 flex items-end justify-between">
        <div>
          <h2 id="work-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            {t('work.title')}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">Selected projects that define excellence</p>
        </div>
        <a href="#contact" className="text-sm md:text-base underline hover:text-accent transition-colors">
          {t('work.startProject')}
        </a>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="relative -mx-4 px-4">
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {projects.map((p, i) => (
            <figure
              key={p.title}
              className="group flex-none w-[85vw] sm:w-[420px] md:w-[480px] lg:w-[520px] overflow-hidden rounded-xl border bg-card snap-start shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={`/.jpg?height=360&width=640&query=${encodeURIComponent('portfolio thumbnail for ' + p.title)}`}
                  alt={p.title}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="flex items-center justify-between p-5 md:p-6">
                <div>
                  <p className="text-base md:text-lg font-semibold">{p.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.tag}</p>
                </div>
                <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-transform group-hover:scale-105">{t('work.view')}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, i) => (
            <div key={i} className="h-1.5 w-8 rounded-full bg-muted transition-colors" />
          ))}
        </div>
      </div>
    </section>
  );
}
