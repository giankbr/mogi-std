import { cn } from '@/lib/utils';

const stats = [
  { k: '12+', v: 'Years crafting brands' },
  { k: '120+', v: 'Companies launched' },
  { k: '$30M', v: 'Client revenue influenced' },
];

export function StatsRow({ className }: { className?: string }) {
  return (
    <section aria-labelledby="stats-title" className={cn('mx-auto max-w-6xl px-4 py-4 md:py-6', className)}>
      <h2 id="stats-title" className="sr-only">
        By the numbers
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.k} className="rounded-xl border bg-card p-6">
            <p className="text-3xl font-semibold tracking-tight">{s.k}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
