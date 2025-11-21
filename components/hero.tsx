import { Button } from '@/components/ui/button';
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
                {/* Social Proof Badge */}
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-semibold">Trusted by 120+ brands</span>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <h1 id="hero-title" className="text-balance font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-white leading-tight">
                  {t('hero.title')}
                  <span aria-hidden className="text-accent">
                    ®
                  </span>
                </h1>
                
                {/* Enhanced Value Proposition */}
                <div className="space-y-3">
                  <p className="max-w-2xl text-pretty text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">{t('hero.description')}</p>
                  <p className="max-w-2xl text-pretty text-sm md:text-base text-white/70 leading-relaxed">
                    <span className="text-accent font-semibold">$30M+ revenue influenced</span> • <span className="text-accent font-semibold">12+ years</span> of brand expertise • Results delivered in <span className="text-accent font-semibold">4-8 weeks</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <a href="#contact">
                      {t('hero.breakMold')}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur"
                  >
                    <a href="#work">
                      {t('hero.seeWork')}
                    </a>
                  </Button>
                  
                  {/* Urgency Indicator */}
                  <div className="flex items-center gap-2 text-xs md:text-sm text-white/80 mt-2 md:mt-0">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                      </span>
                      <span className="font-medium">3 slots left this month</span>
                    </div>
                  </div>
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
