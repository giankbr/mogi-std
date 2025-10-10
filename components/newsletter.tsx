'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Newsletter({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'minimal' }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('', className)}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && <p className="mt-2 text-xs text-accent">✓ Subscribed! Check your inbox.</p>}
        {status === 'error' && <p className="mt-2 text-xs text-red-500">✗ Something went wrong. Try again.</p>}
      </div>
    );
  }

  return (
    <section className={cn('mx-auto max-w-6xl px-4 py-8 md:py-12', className)}>
      <div className="rounded-2xl border bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 p-8 md:p-12 text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">Stay in the loop</h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">Get design insights, agency updates, and bold ideas delivered monthly. No spam, just signal.</p>

        <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          {status === 'success' && <div className="mt-4 rounded-lg bg-accent/10 border border-accent/20 p-3 text-sm text-accent">✓ You're subscribed! Check your inbox for confirmation.</div>}

          {status === 'error' && <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">✗ Oops! Something went wrong. Please try again.</div>}

          <p className="mt-4 text-xs text-muted-foreground">We respect your privacy. Unsubscribe anytime.</p>
        </form>
      </div>
    </section>
  );
}
