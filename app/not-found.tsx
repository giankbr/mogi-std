'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Home, RotateCcw, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Hole {
  id: number;
  active: boolean;
  type: 'mole' | 'boss' | 'trap' | null;
}

interface Level {
  number: number;
  name: string;
  targetScore: number;
  timeLimit: number;
  moleSpeed: number; // ms to stay up
  trapChance: number; // 0-1
  bossChance: number; // 0-1
}

const levels: Level[] = [
  { number: 1, name: 'Warm Up', targetScore: 10, timeLimit: 30, moleSpeed: 1200, trapChance: 0.1, bossChance: 0.05 },
  { number: 2, name: 'Getting Hot', targetScore: 20, timeLimit: 30, moleSpeed: 1000, trapChance: 0.15, bossChance: 0.1 },
  { number: 3, name: 'Speed Run', targetScore: 30, timeLimit: 30, moleSpeed: 800, trapChance: 0.2, bossChance: 0.15 },
  { number: 4, name: 'Expert', targetScore: 40, timeLimit: 30, moleSpeed: 650, trapChance: 0.25, bossChance: 0.2 },
  { number: 5, name: 'Master', targetScore: 50, timeLimit: 30, moleSpeed: 500, trapChance: 0.3, bossChance: 0.25 },
];

export default function NotFound() {
  const [holes, setHoles] = useState<Hole[]>(Array.from({ length: 9 }, (_, i) => ({ id: i, active: false, type: null })));
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(levels[0].timeLimit);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [hitAnimation, setHitAnimation] = useState<number | null>(null);

  const currentLevelData = levels[currentLevel];

  // Timer
  useEffect(() => {
    if (!gameStarted || gameOver || gameWon) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, gameWon]);

  // Check level completion
  useEffect(() => {
    if (score >= currentLevelData.targetScore && gameStarted) {
      if (currentLevel < levels.length - 1) {
        // Next level
        setTimeout(() => {
          setCurrentLevel((l) => l + 1);
          setScore(0);
          setTimeLeft(levels[currentLevel + 1].timeLimit);
          setCombo(0);
        }, 500);
      } else {
        // Game won!
        setGameWon(true);
        setGameStarted(false);
      }
    }
  }, [score, currentLevelData.targetScore, gameStarted, currentLevel]);

  // Spawn moles/traps/bosses
  useEffect(() => {
    if (!gameStarted || gameOver || gameWon) {
      console.log('Spawn disabled:', { gameStarted, gameOver, gameWon });
      return;
    }

    console.log('Starting spawn interval...');

    const spawnInterval = setInterval(() => {
      setHoles((prev) => {
        const emptyHoles = prev.filter((h) => !h.active);
        console.log('Empty holes:', emptyHoles.length, 'out of', prev.length);

        if (emptyHoles.length === 0) return prev;

        // Pick random empty hole
        const randomHole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
        const rand = Math.random();

        let type: 'mole' | 'boss' | 'trap';
        if (rand < currentLevelData.trapChance) {
          type = 'trap';
        } else if (rand < currentLevelData.trapChance + currentLevelData.bossChance) {
          type = 'boss';
        } else {
          type = 'mole';
        }

        console.log(`Spawning ${type} at hole ${randomHole.id}`);

        // Activate hole
        const newHoles = prev.map((h) => (h.id === randomHole.id ? { ...h, active: true, type } : h));

        // Auto-hide after moleSpeed
        setTimeout(() => {
          console.log(`Hiding ${type} at hole ${randomHole.id}`);
          setHoles((prevHoles) => prevHoles.map((h) => (h.id === randomHole.id ? { ...h, active: false, type: null } : h)));
        }, currentLevelData.moleSpeed);

        return newHoles;
      });
    }, 600);

    return () => {
      console.log('Clearing spawn interval');
      clearInterval(spawnInterval);
    };
  }, [gameStarted, gameOver, gameWon, currentLevelData]);

  const handleHoleClick = (hole: Hole) => {
    if (!hole.active || !gameStarted) return;

    setHitAnimation(hole.id);
    setTimeout(() => setHitAnimation(null), 300);

    // Hide immediately
    setHoles((prev) => prev.map((h) => (h.id === hole.id ? { ...h, active: false, type: null } : h)));

    if (hole.type === 'mole') {
      setScore((s) => s + 1);
      setCombo((c) => c + 1);
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 500);
    } else if (hole.type === 'boss') {
      setScore((s) => s + 3);
      setCombo((c) => c + 3);
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 500);
    } else if (hole.type === 'trap') {
      setScore((s) => Math.max(0, s - 2));
      setCombo(0);
    }
  };

  const startGame = () => {
    setShowTutorial(false);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(currentLevelData.timeLimit);
    setCombo(0);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setTimeLeft(levels[0].timeLimit);
    setGameStarted(false);
    setGameWon(false);
    setGameOver(false);
    setShowTutorial(true);
    setCombo(0);
    setHoles(Array.from({ length: 9 }, (_, i) => ({ id: i, active: false, type: null })));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-8xl md:text-9xl font-serif font-bold mb-4">404</h1>
          <p className="text-2xl md:text-3xl font-medium mb-2">Page Not Found</p>
          <p className="text-muted-foreground">But hey, let's play Whack-a-Mole! 🎪</p>
        </div>

        {/* Level Info */}
        {gameStarted && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="font-semibold">{currentLevelData.name}</span>
            </div>
          </div>
        )}

        {/* Game Stats */}
        {gameStarted && (
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Level</p>
              <p className="text-2xl font-bold">
                {currentLevel + 1}/{levels.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Score</p>
              <p className="text-2xl font-bold text-accent">
                {score}/{currentLevelData.targetScore}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Time</p>
              <p className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-destructive animate-pulse' : ''}`}>{timeLeft}s</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Combo</p>
              <p className="text-2xl font-bold text-green-600">{combo}x</p>
            </div>
          </div>
        )}

        {/* Game Board */}
        <Card className="p-6 md:p-8 relative">
          <div className="max-w-lg mx-auto">
            {/* Tutorial Overlay */}
            {showTutorial && (
              <div className="text-center mb-8 animate-in fade-in">
                <div className="text-6xl mb-4">🎪</div>
                <h2 className="text-2xl font-bold mb-4">Whack-a-Mole!</h2>

                <div className="text-left space-y-3 mb-6 max-w-md mx-auto">
                  <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                    <span className="text-3xl">🐹</span>
                    <div>
                      <p className="font-semibold">Mole</p>
                      <p className="text-sm text-muted-foreground">Click for +1 point</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                    <span className="text-3xl">👑</span>
                    <div>
                      <p className="font-semibold">Boss Mole</p>
                      <p className="text-sm text-muted-foreground">Click for +3 points!</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                    <span className="text-3xl">💣</span>
                    <div>
                      <p className="font-semibold">Trap</p>
                      <p className="text-sm text-muted-foreground text-destructive">DON'T CLICK! -2 points</p>
                    </div>
                  </div>
                </div>

                <Button size="lg" onClick={startGame} className="w-full max-w-xs">
                  Start Game!
                </Button>
              </div>
            )}

            {/* Game Grid */}
            {gameStarted && (
              <div className="relative">
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {holes.map((hole) => (
                    <button
                      key={hole.id}
                      onClick={() => handleHoleClick(hole)}
                      className={`aspect-square rounded-2xl border-2 bg-muted relative transition-all ${hole.active ? 'cursor-pointer hover:scale-105' : 'cursor-default'} ${
                        hitAnimation === hole.id ? 'scale-95' : ''
                      }`}
                      disabled={!hole.active}
                    >
                      {/* Hole */}
                      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-background border-2 border-border" />
                      </div>

                      {/* Mole/Boss/Trap */}
                      {hole.active && (
                        <div className={`absolute inset-0 flex items-center justify-center z-20 animate-in zoom-in duration-200 ${hole.type === 'trap' ? 'animate-pulse' : ''}`}>
                          {hole.type === 'mole' && <span className="text-7xl md:text-8xl select-none">🐹</span>}
                          {hole.type === 'boss' && <span className="text-8xl md:text-9xl animate-bounce select-none">👑</span>}
                          {hole.type === 'trap' && <span className="text-7xl md:text-8xl select-none">💣</span>}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Combo Animation */}
                {showCombo && combo > 1 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-accent animate-in zoom-in duration-300 pointer-events-none">+{combo}</div>
                )}
              </div>
            )}

            {/* Win Message */}
            {gameWon && (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full mb-4">
                  <Trophy className="h-5 w-5" />
                  <span className="font-semibold">All Levels Completed! 🎉</span>
                </div>
                <p className="text-muted-foreground mb-4">Final Score: {score}</p>
                <p className="text-sm text-muted-foreground">You're a Whack-a-Mole champion!</p>
              </div>
            )}

            {/* Game Over Message */}
            {gameOver && (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-6 py-3 rounded-full mb-4">
                  <span className="font-semibold">Time's Up!</span>
                </div>
                <p className="text-muted-foreground mb-2">Final Score: {score}</p>
                <p className="text-sm text-muted-foreground">{score >= currentLevelData.targetScore ? 'So close! Try again?' : 'Keep practicing!'}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {(gameOver || gameWon) && (
            <Button onClick={resetGame} variant="outline" size="lg">
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
          )}
          <Link href="/">
            <Button size="lg">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button variant="ghost" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-8">Lost your way? Whack some moles first! 🎪</p>
      </div>
    </div>
  );
}
