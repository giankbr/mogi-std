'use client';

import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={cn('inline-flex items-center rounded-full border p-0.5 bg-muted/50', className)}>
      <button
        onClick={() => setLanguage('en')}
        className={cn('rounded-full px-3 py-1 text-xs font-medium transition-all', language === 'en' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={cn('rounded-full px-3 py-1 text-xs font-medium transition-all', language === 'id' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
        aria-label="Switch to Indonesian"
      >
        ID
      </button>
    </div>
  );
}
