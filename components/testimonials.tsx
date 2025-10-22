import { cn } from '@/lib/utils';
import Image from 'next/image';

const items = [
  {
    quote: "They didn't just redesign our brand—they reframed how people see us. It was a creative awakening.",
    author: 'Jonas K., CEO at Vanta Club',
  },
  {
    quote: "We needed bold, then they gave us savage. Our visuals finally match our brand's voice.",
    author: 'Selene T., Founder of Noir Supply',
  },
  {
    quote: 'Impactful storytelling that actually converts. Traffic is up and so is revenue.',
    author: 'Ravi P., CMO at Satori',
  },
];

export function Testimonials({ className }: { className?: string }) {
  return (
    <section id="testimonials" className={cn('mx-auto max-w-6xl px-4', className)} aria-labelledby="testimonials-title">
      <div className="mb-8 md:mb-12">
        <h2 id="testimonials-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          What clients say
        </h2>
        <p className="mt-2 text-muted-foreground text-sm md:text-base">Real results from real partnerships</p>
      </div>
      <div className="grid gap-5 md:gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.author} className="rounded-xl border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            <blockquote className="text-pretty text-base md:text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Image src="/placeholder-user.jpg" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-2 ring-border" />
              <span className="font-medium">{t.author}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
