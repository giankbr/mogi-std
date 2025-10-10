'use client';

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

const projectTypes = ['Brand Identity', 'Web Design & Development', 'Motion & Visual Art', 'Full Package', 'Other'];

const budgets = ['Under $10k', '$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+', 'Not sure yet'];

export function ContactForm({ className }: { className?: string }) {
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
      // TODO: Replace with actual API endpoint
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
    <section id="contact" className={cn('mx-auto max-w-6xl px-4 py-4 md:py-6', className)} aria-labelledby="contact-title">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column - Info */}
        <div>
          <h2 id="contact-title" className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
            Let's create something <span className="text-accent">bold together.</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">Ready to make your brand impossible to ignore? Drop us a message and we'll get back to you within 24 hours.</p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">Contact Info</h3>
              <div className="space-y-3">
                <a href="mailto:hello@mogistudio.com" className="block text-foreground hover:text-accent transition-colors">
                  hello@mogistudio.com
                </a>
                <p className="text-muted-foreground">Available Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">What to Expect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Free consultation call</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Custom proposal tailored to your needs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                placeholder="Your Company Inc."
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                >
                  <option value="">Select type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                >
                  <option value="">Select budget</option>
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
                Project Details *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors resize-none"
                placeholder="Tell us about your project, goals, and timeline..."
              />
            </div>

            {submitStatus === 'success' && <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 text-sm text-accent">✓ Thank you! We'll get back to you within 24 hours.</div>}

            {submitStatus === 'error' && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-500">✗ Something went wrong. Please try again or email us directly.</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            <p className="text-xs text-center text-muted-foreground">By submitting this form, you agree to our Privacy Policy.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
