import { cn } from '@/lib/utils';
import { IconBrush, IconChartLine, IconPalette } from '@tabler/icons-react';

type Feature = {
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string; stroke?: number }>;
};

const features: Feature[] = [
  {
    title: 'Disruptive Creativity',
    body: 'Original thinking that cuts through the noise—strategy meets craft for standout brands.',
    icon: IconPalette,
  },
  {
    title: 'Bold Aesthetic, Real Impact',
    body: "Design that doesn't just look good—it's memorable, accessible, and built to convert.",
    icon: IconChartLine,
  },
  {
    title: 'Unfiltered Expression',
    body: 'Your brand, your rules. We build systems that scale without losing soul.',
    icon: IconBrush,
  },
];

export function FeatureCards({ className }: { className?: string }) {
  return (
    <section id="services" className={cn('mx-auto max-w-6xl px-4', className)} aria-labelledby="services-title">
      <div className="mb-8 md:mb-12 flex items-end justify-between">
        <div>
          <h2 id="services-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            What we do
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">Core capabilities that drive results</p>
        </div>
        <a href="#contact" className="text-sm md:text-base underline hover:text-accent transition-colors">
          Book a call
        </a>
      </div>
      <div className="grid gap-5 md:gap-6 md:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <article key={f.title} className="rounded-xl border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-all hover:border-accent/50 group">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                <Icon className="h-6 w-6" stroke={1.5} />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{f.body}</p>
              <a href="#work" className="mt-4 inline-flex items-center gap-2 text-sm md:text-base font-medium text-accent hover:gap-3 transition-all">
                Learn more
                <span>→</span>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
