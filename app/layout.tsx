import { LanguageProvider } from '@/lib/language-context';
import { Analytics } from '@vercel/analytics/next';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { Sora, Urbanist } from 'next/font/google';
import type React from 'react';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mogistudio.com'),
  title: {
    default: 'Mogi Studio® — Bold Design & Brand Identity Agency',
    template: '%s | Mogi Studio',
  },
  description: 'We craft high-impact brands and websites that refuse to blend in. Bold design, strategic thinking, and unfiltered creativity for brands that want to stand out.',
  keywords: ['brand identity', 'web design', 'UX design', 'motion design', 'creative agency', 'design studio', 'branding agency', 'website development', 'visual identity', 'brand strategy'],
  authors: [{ name: 'Mogi Studio' }],
  creator: 'Mogi Studio',
  publisher: 'Mogi Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mogistudio.com',
    siteName: 'Mogi Studio',
    title: 'Mogi Studio® — Bold Design & Brand Identity Agency',
    description: 'We craft high-impact brands and websites that refuse to blend in. Bold design, strategic thinking, and unfiltered creativity.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mogi Studio - Bold Design Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mogi Studio® — Bold Design & Brand Identity Agency',
    description: 'We craft high-impact brands and websites that refuse to blend in.',
    images: ['/og-image.jpg'],
    creator: '@mogistudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${urbanist.variable} ${sora.variable} ${GeistMono.variable} antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <LanguageProvider>
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  );
}
