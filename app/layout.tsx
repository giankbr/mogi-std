import { Analytics } from '@vercel/analytics/next';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { Sora, Urbanist } from 'next/font/google';
import type React from 'react';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mogi Studio — bold design',
  description: 'We craft high-impact brands and websites.',
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
      <body className="font-sans">
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
