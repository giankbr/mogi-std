'use client';

import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';

export function StatsRow({ className }: { className?: string }) {
  const { t } = useLanguage();

  const stats = [
    { k: t('stats.stat1Key'), v: t('stats.stat1Value') },
    { k: t('stats.stat2Key'), v: t('stats.stat2Value') },
    { k: t('stats.stat3Key'), v: t('stats.stat3Value') },
  ];

  return (
    <section aria-labelledby="stats-title" className={cn('mx-auto max-w-6xl px-4', className)}>
      <h2 id="stats-title" className="sr-only">
        {t('stats.title')}
      </h2>
      <div className="grid gap-5 md:gap-6 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.k} className="rounded-xl border bg-card p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow group">
            <p className="text-4xl md:text-5xl font-bold tracking-tight group-hover:text-accent transition-colors">{s.k}</p>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
