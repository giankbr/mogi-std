import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Hero({ className }: { className?: string }) {
  return (
    <section className={cn('relative', className)} aria-labelledby="hero-title">
      <div className="mx-auto max-w-6xl px-4 pt-4 pb-6">
        <div className="rounded-xl overflow-hidden border bg-card">
          <div className="relative">
            <Image
              src="/images/hero-reference.jpg"
              alt="Desk setup with speakers and headphones"
              width={1600}
              height={900}
              className="h-[280px] sm:h-[350px] md:h-[380px] w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-sm text-white/80">
                <p className="hidden md:block">— a bold design studio.</p>
                {/* <ul className="ml-auto hidden md:flex items-center gap-5">
                  <li>
                    <a href="#services" className="hover:underline">
                      Expertise
                    </a>
                  </li>
                  <li>
                    <a href="#work" className="hover:underline">
                      Work
                    </a>
                  </li>
                  <li>
                    <a href="#testimonials" className="hover:underline">
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:underline">
                      Get Connected
                    </a>
                  </li>
                </ul> */}
              </div>

              <div>
                <h1 id="hero-title" className="text-balance font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-white">
                  Mogi Studio
                  <span aria-hidden className="text-accent">
                    ®
                  </span>
                </h1>
                <p className="mt-3 md:mt-4 max-w-2xl text-pretty text-sm sm:text-base text-white/85 leading-relaxed">We craft bold, high‑impact brands and websites that refuse to blend in.</p>
                <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-2 md:gap-3">
                  <a href="#contact" className="rounded-full bg-accent px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium text-accent-foreground">
                    Break the mold
                  </a>
                  <a href="#work" className="rounded-full bg-white/10 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur">
                    See our work
                  </a>
                </div>
              </div>

              <p className="self-end text-xs text-white/70">Scroll down</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
