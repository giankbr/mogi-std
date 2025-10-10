import { cn } from '@/lib/utils';

export function CtaBanner({ className }: { className?: string }) {
  return (
    <section id="contact" className={cn('mx-auto max-w-6xl px-4 py-4 md:py-6', className)} aria-labelledby="cta-title">
      <div className="rounded-2xl border bg-primary text-primary-foreground dark:bg-card dark:text-foreground p-8 md:p-12">
        <h2 id="cta-title" className="font-serif text-balance text-2xl md:text-3xl font-semibold tracking-tight">
          Helping brands go loud with storytelling that hits where it matters.
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="mailto:hello@mogistudio.com" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground">
            Work with us
          </a>
          <a
            href="#services"
            className="rounded-full bg-primary-foreground/10 dark:bg-foreground/10 px-5 py-2.5 text-sm font-medium backdrop-blur-sm border border-primary-foreground/20 dark:border-foreground/20"
          >
            Explore services
          </a>
        </div>
      </div>
    </section>
  );
}
