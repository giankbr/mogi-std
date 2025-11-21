import { cn } from '@/lib/utils';
import Image from 'next/image';

export function FeaturedTestimonial({ className }: { className?: string }) {
  return (
    <section className={cn('mx-auto max-w-6xl px-4', className)}>
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/5 to-accent/10 p-8 md:p-12">
        {/* Quote Icon */}
        <div className="absolute top-6 left-6 text-accent/20">
          <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <div className="relative z-10 pt-8 md:pt-10">
          <blockquote className="text-pretty text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-foreground">
            "They didn't just redesign our brand—they reframed how people see us. Revenue is up 40% since launch."
          </blockquote>
          
          <div className="mt-6 md:mt-8 flex items-center gap-4">
            <Image 
              src="/placeholder-user.jpg" 
              alt="Jonas K." 
              width={56} 
              height={56} 
              className="h-14 w-14 rounded-full object-cover ring-2 ring-accent/20" 
            />
            <div>
              <p className="font-semibold text-foreground">Jonas K.</p>
              <p className="text-sm text-muted-foreground">CEO at Vanta Club</p>
            </div>
            
            {/* Star Rating */}
            <div className="ml-auto hidden md:flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
