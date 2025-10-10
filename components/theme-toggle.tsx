'use client';

import type React from 'react';

import { useEffect, useState } from 'react';

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </g>
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" fill="currentColor" />
    </svg>
  );
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
    setIsDark(next);
  }

  // Prevent hydration mismatch by not rendering theme-specific content until mounted
  if (!mounted) {
    return (
      <button type="button" aria-label="Toggle theme" className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground hover:bg-muted transition">
        <span className="opacity-0">
          <MoonIcon />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground hover:bg-muted transition"
    >
      <span className={isDark ? 'hidden' : ''}>
        <MoonIcon />
      </span>
      <span className={isDark ? '' : 'hidden'}>
        <SunIcon />
      </span>
    </button>
  );
}
