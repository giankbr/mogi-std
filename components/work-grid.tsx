'use client';

import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const projects = [
  { title: 'Reimagine Wellness', tag: 'Brand + Web', slug: 'reimagine-wellness' },
  { title: 'Harmonia', tag: 'E‑commerce', slug: 'harmonia' },
  { title: 'Subway® Concept', tag: 'Identity', slug: 'subway-concept' },
  { title: 'Move It Move It!', tag: 'Motion', slug: 'move-it' },
  { title: 'Satori', tag: 'Product Site', slug: 'satori' },
  { title: 'Analog FM', tag: 'Visual System', slug: 'analog-fm' },
];

export function WorkGrid({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

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

      {/* Carousel Container */}
      <div className="relative -mx-4 px-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/project/${p.slug}`}
                className="group flex-none w-[85vw] sm:w-[420px] md:w-[480px] lg:w-[520px] overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md transition-all hover:border-accent/50"
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
                <div className="flex items-center justify-between p-5 md:p-6">
                  <div>
                    <p className="text-base md:text-lg font-semibold">{p.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{p.tag}</p>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-transform group-hover:scale-105">
                    {t('work.view')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                'h-1.5 w-8 rounded-full transition-all',
                selectedIndex === i ? 'bg-accent w-12' : 'bg-muted hover:bg-muted-foreground/30'
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
