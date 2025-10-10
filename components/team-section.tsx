import { cn } from '@/lib/utils';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Alex Morgan',
    role: 'Creative Director',
    image: '/placeholder-user.jpg',
    bio: '10+ years shaping brands that break the mold. Previously at Pentagram & Wolff Olins.',
  },
  {
    name: 'Jordan Rivera',
    role: 'Lead Designer',
    image: '/placeholder-user.jpg',
    bio: 'Design systems architect with a passion for bold aesthetics and user-first thinking.',
  },
  {
    name: 'Sam Chen',
    role: 'Tech Lead',
    image: '/placeholder-user.jpg',
    bio: 'Full-stack developer building high-performance websites that actually convert.',
  },
  {
    name: 'Riley Parker',
    role: 'Motion Designer',
    image: '/placeholder-user.jpg',
    bio: 'Bringing brands to life through animation and visual storytelling since 2015.',
  },
];

const values = [
  {
    title: 'Bold Over Safe',
    description: 'We create work that makes people stop scrolling. Safe is forgettable.',
  },
  {
    title: 'Strategy First',
    description: 'Every pixel has a purpose. We build brands with intention, not decoration.',
  },
  {
    title: 'No Templates',
    description: 'Every project starts from zero. Your brand deserves originality.',
  },
  {
    title: 'Real Partnership',
    description: 'Were not vendors—were your creative allies invested in your success.',
  },
];

export function TeamSection({ className }: { className?: string }) {
  return (
    <section id="team" className={cn('mx-auto max-w-6xl px-4 py-8 md:py-12', className)} aria-labelledby="team-title">
      {/* Story Section */}
      <div className="mb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 id="team-title" className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
              We're a team of rebels <span className="text-accent">building unforgettable brands.</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Founded in 2018, Mogi Studio emerged from a simple frustration: too many brands playing it safe. We believe your brand should be impossible to ignore—bold, intentional, and
              unapologetically unique.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Our team brings together strategists, designers, and developers who've worked with everyone from scrappy startups to Fortune 500s. What unites us? A refusal to blend in and a commitment
              to craft that converts.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors">
                Work with us
                <span>→</span>
              </a>
              <a href="#work" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium hover:bg-accent/5 transition-colors">
                See our work
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border bg-card">
              <Image src="/placeholder.jpg" alt="Mogi Studio Team" width={600} height={600} className="h-full w-full object-cover" />
            </div>
            {/* Stats Overlay */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-xl border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-accent">50+</p>
                <p className="mt-1 text-xs text-muted-foreground">Projects Launched</p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-accent">6yr</p>
                <p className="mt-1 text-xs text-muted-foreground">In Business</p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-accent">100%</p>
                <p className="mt-1 text-xs text-muted-foreground">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">What Drives Us</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="rounded-xl border bg-card p-6 hover:border-accent/50 transition-colors">
              <h4 className="font-serif text-lg font-semibold mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">Meet the Team</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="group text-center">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl border bg-card">
                <Image src={member.image} alt={member.name} width={300} height={300} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h4 className="font-serif text-lg font-semibold">{member.name}</h4>
              <p className="text-sm text-accent mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
