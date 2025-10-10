import Image from "next/image"
import { cn } from "@/lib/utils"

const items = [
  {
    quote: "They didn’t just redesign our brand—they reframed how people see us. It was a creative awakening.",
    author: "Jonas K., CEO at Vanta Club",
  },
  {
    quote: "We needed bold, then they gave us savage. Our visuals finally match our brand’s voice.",
    author: "Selene T., Founder of Noir Supply",
  },
  {
    quote: "Impactful storytelling that actually converts. Traffic is up and so is revenue.",
    author: "Ravi P., CMO at Satori",
  },
]

export function Testimonials({ className }: { className?: string }) {
  return (
    <section
      id="testimonials"
      className={cn("mx-auto max-w-6xl px-4 py-8 md:py-12", className)}
      aria-labelledby="testimonials-title"
    >
      <div className="mb-5 md:mb-6">
        <h2 id="testimonials-title" className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
          What clients say
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.author} className="rounded-xl border bg-card p-6">
            <blockquote className="text-pretty leading-relaxed">
              {"“"}
              {t.quote}
              {"”"}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <Image
                src="/placeholder-user.jpg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span>{t.author}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
