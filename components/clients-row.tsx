import { cn } from '@/lib/utils';
import Image from 'next/image';

const logos = [
  { src: '/placeholder-logo.svg', alt: 'Client 1' },
  { src: '/placeholder-logo.svg', alt: 'Client 2' },
  { src: '/placeholder-logo.svg', alt: 'Client 3' },
  { src: '/placeholder-logo.svg', alt: 'Client 4' },
  { src: '/placeholder-logo.svg', alt: 'Client 5' },
  { src: '/placeholder-logo.svg', alt: 'Client 6' },
];

export function ClientsRow({ className }: { className?: string }) {
  return (
    <section aria-labelledby="clients-title" className={cn('mx-auto max-w-6xl px-4 py-4 md:py-6', className)}>
      <h2 id="clients-title" className="sr-only">
        Trusted by
      </h2>
      <div className="rounded-xl border bg-card p-4 md:p-6 overflow-hidden">
        <div className="relative flex overflow-hidden">
          <div className="flex animate-scroll-left gap-8 pr-8">
            {logos.map((l, i) => (
              <div key={i} className="flex items-center justify-center min-w-[120px]">
                <Image src={l.src || '/placeholder.svg'} alt={l.alt} width={120} height={40} className="h-6 w-auto opacity-70 grayscale" />
              </div>
            ))}
          </div>
          <div className="flex animate-scroll-left gap-8 pr-8" aria-hidden="true">
            {logos.map((l, i) => (
              <div key={`duplicate-${i}`} className="flex items-center justify-center min-w-[120px]">
                <Image src={l.src || '/placeholder.svg'} alt={l.alt} width={120} height={40} className="h-6 w-auto opacity-70 grayscale" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
