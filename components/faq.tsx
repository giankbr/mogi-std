"use client"

import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "What does a typical project look like?",
    a: "We start with strategy and discovery, then identity, product, and web. Timelines average 4–8 weeks depending on scope.",
  },
  {
    q: "Do you offer development?",
    a: "Yes. We ship modern Next.js websites optimized for speed, accessibility, and maintainability.",
  },
  {
    q: "How do we get started?",
    a: "Share your goals. We’ll propose a lean scope with clear milestones and a fixed investment.",
  },
  {
    q: "Do you work with startups?",
    a: "Absolutely. Many of our clients are venture‑backed founders and early teams looking for signal.",
  },
]

export function FAQ({ className }: { className?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className={cn("mx-auto max-w-6xl px-4 py-8 md:py-12", className)}>
      <div className="mb-4">
        <h2 id="faq-title" className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
          Frequently asked
        </h2>
      </div>
      <Accordion type="single" collapsible className="rounded-xl border bg-card px-2">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`q${i}`}>
            <AccordionTrigger className="px-4">{f.q}</AccordionTrigger>
            <AccordionContent className="px-4 text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
