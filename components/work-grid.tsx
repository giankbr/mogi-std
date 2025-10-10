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
    <section id="work" className={cn('mx-auto max-w-6xl px-4', className)} aria-labelledby="work-title">
      <div className="mb-6 md:mb-8 flex items-end justify-between">
        <h2 id="work-title" className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
          {t('work.title')}
        </h2>
        <a href="#contact" className="text-sm underline">
          {t('work.startProject')}
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((p, i) => (
          <figure key={p.title} className="group overflow-hidden rounded-xl border bg-card">
            <Image
              src={`/.jpg?height=360&width=640&query=${encodeURIComponent('portfolio thumbnail for ' + p.title)}`}
              alt={p.title}
              width={640}
              height={360}
              className="h-44 md:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <figcaption className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.tag}</p>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">{t('work.view')}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
