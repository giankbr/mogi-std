'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react';

export default function ThemeTest() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Theme Test</h1>
        <p className="text-muted-foreground">Current theme: {theme}</p>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setTheme('light')}
          className={theme === 'light' ? 'border-primary' : ''}
        >
          <SunIcon className="mr-2 h-4 w-4" />
          Light
        </Button>

        <Button
          variant="outline"
          onClick={() => setTheme('dark')}
          className={theme === 'dark' ? 'border-primary' : ''}
        >
          <MoonIcon className="mr-2 h-4 w-4" />
          Dark
        </Button>

        <Button
          variant="outline"
          onClick={() => setTheme('system')}
          className={theme === 'system' ? 'border-primary' : ''}
        >
          <MonitorIcon className="mr-2 h-4 w-4" />
          System
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Light/Dark Mode Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This card should reflect the current theme.</p>
            <div className="mt-4 space-y-2">
              <p className="font-bold">CSS Variables:</p>
              <p>Background: <span className="px-2 py-1 rounded bg-background border">bg-background</span></p>
              <p>Foreground: <span className="px-2 py-1 rounded bg-foreground text-background">bg-foreground</span></p>
              <p>Card: <span className="px-2 py-1 rounded bg-card border">bg-card</span></p>
              <p>Muted: <span className="px-2 py-1 rounded bg-muted">bg-muted</span></p>
              <p>Accent: <span className="px-2 py-1 rounded bg-accent text-accent-foreground">bg-accent</span></p>
              <p>Primary: <span className="px-2 py-1 rounded bg-primary text-primary-foreground">bg-primary</span></p>
              <p>Border: <span className="px-2 py-1 rounded border-2 border-border">border-border</span></p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Components Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-bold">Buttons:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              <div>
                <p className="mb-2 font-bold">Typography:</p>
                <h1 className="text-xl font-bold">Heading 1</h1>
                <h2 className="text-lg font-semibold">Heading 2</h2>
                <p>Regular paragraph text</p>
                <p className="text-sm text-muted-foreground">Small muted text</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
