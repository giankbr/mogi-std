import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { IconArrowLeft, IconExternalLink } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Project data
const projects: Record<string, {
  title: string;
  tag: string;
  year: string;
  client: string;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  images: number;
  liveUrl?: string;
}> = {
  'reimagine-wellness': {
    title: 'Reimagine Wellness',
    tag: 'Brand + Web',
    year: '2024',
    client: 'Wellness Co.',
    services: ['Brand Identity', 'Web Design', 'UX/UI'],
    description: 'A complete brand transformation for a wellness company, creating a fresh, modern identity that resonates with health-conscious millennials.',
    challenge: 'The client needed to differentiate in a saturated wellness market while maintaining credibility and trust.',
    solution: 'We developed a bold visual identity paired with a clean, conversion-focused website that emphasizes transparency and results.',
    results: [
      '40% increase in organic traffic',
      '65% improvement in conversion rate',
      '3x social media engagement'
    ],
    images: 3,
    liveUrl: 'https://example.com'
  },
  'harmonia': {
    title: 'Harmonia',
    tag: 'E-commerce',
    year: '2024',
    client: 'Harmonia Store',
    services: ['E-commerce Design', 'Development', 'Brand Strategy'],
    description: 'Premium e-commerce experience for a sustainable fashion brand focused on mindful consumption.',
    challenge: 'Create an online shopping experience that reflects the brand\'s values of sustainability and premium quality.',
    solution: 'Built a custom Shopify store with editorial-style layouts and seamless checkout experience.',
    results: [
      '$500K revenue in first quarter',
      '28% conversion rate',
      '4.8/5 customer satisfaction'
    ],
    images: 4
  },
  'subway-concept': {
    title: 'Subway® Concept',
    tag: 'Identity',
    year: '2023',
    client: 'Subway',
    services: ['Visual Identity', 'Brand Guidelines'],
    description: 'A conceptual rebrand exploring modern interpretations of the Subway brand identity.',
    challenge: 'Modernize an established brand while maintaining recognition and heritage.',
    solution: 'Created a fresh visual system that honors Subway\'s legacy while appealing to contemporary audiences.',
    results: [
      'Featured in Brand New',
      '50K+ social impressions',
      'Selected for design awards'
    ],
    images: 3
  },
  'move-it': {
    title: 'Move It Move It!',
    tag: 'Motion',
    year: '2024',
    client: 'Fitness App',
    services: ['Motion Design', 'Animation', 'UI Animation'],
    description: 'Dynamic motion design system for a fitness tracking application.',
    challenge: 'Create animations that motivate users while maintaining performance.',
    solution: 'Developed a playful yet sophisticated motion language that energizes the user experience.',
    results: [
      '92% user satisfaction',
      '45% increase in daily active users',
      'App Store feature'
    ],
    images: 3
  },
  'satori': {
    title: 'Satori',
    tag: 'Product Site',
    year: '2023',
    client: 'Satori Tech',
    services: ['Web Design', 'Development', 'Content Strategy'],
    description: 'Landing page and product site for a meditation and mindfulness app.',
    challenge: 'Communicate complex features in a calm, intuitive way.',
    solution: 'Clean product site with interactive demos and conversion-optimized flow.',
    results: [
      '10K+ beta signups',
      '38% signup conversion',
      'Press coverage in TechCrunch'
    ],
    images: 3
  },
  'analog-fm': {
    title: 'Analog FM',
    tag: 'Visual System',
    year: '2024',
    client: 'Analog FM Radio',
    services: ['Visual Identity', 'Brand System', 'Guidelines'],
    description: 'Complete visual identity for an independent radio station celebrating analog culture.',
    challenge: 'Balance nostalgia with contemporary design sensibilities.',
    solution: 'Created a flexible visual system inspired by vintage radio aesthetics with modern execution.',
    results: [
      'Award winning identity',
      'Featured in It\'s Nice That',
      '200% listener growth'
    ],
    images: 4
  }
};

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug: slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pt-24 md:pt-32 pb-12 md:pb-16">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <IconArrowLeft className="h-4 w-4" />
          Back to all projects
        </Link>

        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-start">
          <div>
            <div className="inline-block rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-semibold mb-4">
              {project.tag}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>
            
            {project.liveUrl && (
              <Button asChild size="lg" className="rounded-full">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                  View Live Site
                  <IconExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Client</p>
              <p className="font-semibold">{project.client}</p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground mb-2">Year</p>
              <p className="font-semibold">{project.year}</p>
            </div>
            <div className="rounded-xl border bg-card p-6 sm:col-span-2">
              <p className="text-sm text-muted-foreground mb-2">Services</p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span key={service} className="text-sm font-medium bg-accent/10 text-accent px-3 py-1 rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="rounded-2xl overflow-hidden border bg-card shadow-lg">
          <Image
            src={`/.jpg?height=800&width=1200&query=${encodeURIComponent(project.title + ' hero image')}`}
            alt={project.title}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
          </div>
          <div className="rounded-xl border bg-card p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">Our Solution</h2>
            <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: project.images }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border bg-card shadow-sm">
              <Image
                src={`/.jpg?height=600&width=800&query=${encodeURIComponent(project.title + ' image ' + (i + 1))}`}
                alt={`${project.title} image ${i + 1}`}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="rounded-2xl border bg-gradient-to-br from-accent/5 to-accent/10 p-8 md:p-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">Results</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {project.results.map((result, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-2xl font-bold">✓</span>
                <span className="text-base md:text-lg font-medium">{result}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to create something bold?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let's start your project
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/#contact">
              Get in touch
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
