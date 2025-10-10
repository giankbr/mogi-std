import { cn } from '@/lib/utils';

type Feature = {
  title: string;
  body: string;
  cta?: string;
};

const features: Feature[] = [
  {
    title: 'Disruptive Creativity',
    body: 'Original thinking that cuts through the noise—strategy meets craft for standout brands.',
  },
  {
    title: 'Bold Aesthetic, Real Impact',
    body: "Design that doesn't just look good—it's memorable, accessible, and built to convert.",
  },
  {
    title: 'Unfiltered Expression',
    body: 'Your brand, your rules. We build systems that scale without losing soul.',
  },
];

export function FeatureCards({ className }: { className?: string }) {
  return (
    <section id="services" className={cn('mx-auto max-w-6xl px-4 py-4 md:py-6', className)} aria-labelledby="services-title">
      <div className="mb-5 md:mb-6 flex items-end justify-between">
        <h2 id="services-title" className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
          What we do
        </h2>
        <a href="#contact" className="text-sm underline">
          Book a call
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((f) => (
          <article key={f.title} className="rounded-xl border bg-card p-5 md:p-6">
            <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold">•</div>
            <h3 className="font-serif text-lg font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            <a href="#work" className="mt-3 inline-block text-sm font-medium underline">
              Learn more
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
