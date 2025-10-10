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
    <section aria-labelledby="stats-title" className={cn('mx-auto max-w-6xl px-4 py-4 md:py-6', className)}>
      <h2 id="stats-title" className="sr-only">
        {t('stats.title')}
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
