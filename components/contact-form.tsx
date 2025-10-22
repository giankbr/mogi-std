'use client';

import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export function ContactForm({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projectTypes = [
    t('contact.projectTypes.brandIdentity'),
    t('contact.projectTypes.webDesign'),
    t('contact.projectTypes.motion'),
    t('contact.projectTypes.fullPackage'),
    t('contact.projectTypes.other'),
  ];

  const budgets = [
    t('contact.budgets.under10k'),
    t('contact.budgets.range10k25k'),
    t('contact.budgets.range25k50k'),
    t('contact.budgets.range50k100k'),
    t('contact.budgets.over100k'),
    t('contact.budgets.notSure'),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className={cn('mx-auto max-w-6xl px-4', className)} aria-labelledby="contact-title">
      <div className="grid gap-10 md:gap-12 lg:grid-cols-2">
        {/* Left Column - Info */}
        <div className="space-y-8 md:space-y-10">
          <div>
            <h2 id="contact-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {t('contact.title')} <span className="text-accent">{t('contact.titleAccent')}</span>
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">{t('contact.subtitle')}</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">{t('contact.contactInfoTitle')}</h3>
              <div className="space-y-3">
                <a href={`mailto:${t('contact.email')}`} className="block text-lg font-medium text-foreground hover:text-accent transition-colors">
                  {t('contact.email')}
                </a>
                <p className="text-muted-foreground">{t('contact.availability')}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">{t('contact.expectTitle')}</h3>
              <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span>{t('contact.expect1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span>{t('contact.expect2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span>{t('contact.expect3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="rounded-2xl border bg-card p-6 md:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('contact.yourName')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('contact.emailAddress')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                {t('contact.company')}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                placeholder={t('contact.companyPlaceholder')}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                  {t('contact.projectType')} *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                >
                  <option value="">{t('contact.selectType')}</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2">
                  {t('contact.budgetRange')}
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                >
                  <option value="">{t('contact.selectBudget')}</option>
                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t('contact.projectDetails')} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors resize-none"
                placeholder={t('contact.messagePlaceholder')}
              />
            </div>

            {submitStatus === 'success' && <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 text-sm text-accent">{t('contact.successMessage')}</div>}

            {submitStatus === 'error' && <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-500">{t('contact.errorMessage')}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
            </button>

            <p className="text-xs text-center text-muted-foreground">{t('contact.privacyPolicy')}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
