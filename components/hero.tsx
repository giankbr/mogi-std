'use client';

import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Hero({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <section className={cn('relative', className)} aria-labelledby="hero-title">
      <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-8 pb-0">
        <div className="rounded-xl overflow-hidden border bg-card shadow-sm">
          <div className="relative">
            <Image
              src="/images/hero-reference.jpg"
              alt="Desk setup with speakers and headphones"
              width={1600}
              height={900}
              className="h-[400px] sm:h-[480px] md:h-[560px] lg:h-[620px] w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
              <div className="flex items-center justify-between text-sm text-white/90">
                <p className="hidden md:block font-medium">{t('hero.tagline')}</p>
              </div>

              <div className="space-y-6 md:space-y-8">
                <h1 id="hero-title" className="text-balance font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-white leading-tight">
                  {t('hero.title')}
                  <span aria-hidden className="text-accent">
                    ®
                  </span>
                </h1>
                <p className="max-w-2xl text-pretty text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">{t('hero.description')}</p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <a
                    href="#contact"
                    className="rounded-full bg-accent px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base font-medium text-accent-foreground transition-transform hover:scale-105 active:scale-95"
                  >
                    {t('hero.breakMold')}
                  </a>
                  <a
                    href="#work"
                    className="rounded-full bg-white/10 px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base font-medium text-white ring-1 ring-white/30 backdrop-blur transition-all hover:bg-white/20"
                  >
                    {t('hero.seeWork')}
                  </a>
                </div>
              </div>

              <p className="self-end text-sm text-white/70 hidden md:block">{t('hero.scrollDown')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
