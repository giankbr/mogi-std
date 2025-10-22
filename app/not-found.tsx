'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Home, RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isFlying: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  moving?: boolean;
  direction?: number;
  speed?: number;
}

interface Level {
  number: number;
  obstacles: Obstacle[];
  requiredScore: number;
  basketY: number;
}

const levels: Level[] = [
  { number: 1, obstacles: [], requiredScore: 3, basketY: 100 },
  { number: 2, obstacles: [{ x: 200, y: 250, width: 100, height: 20 }], requiredScore: 3, basketY: 100 },
  {
    number: 3,
    obstacles: [
      { x: 150, y: 200, width: 80, height: 20 },
      { x: 250, y: 300, width: 80, height: 20 },
    ],
    requiredScore: 4,
    basketY: 80,
  },
  { number: 4, obstacles: [{ x: 100, y: 200, width: 60, height: 20, moving: true, direction: 1, speed: 2 }], requiredScore: 4, basketY: 80 },
  {
    number: 5,
    obstacles: [
      { x: 150, y: 180, width: 70, height: 20, moving: true, direction: 1, speed: 1.5 },
      { x: 200, y: 280, width: 70, height: 20, moving: true, direction: -1, speed: 2 },
    ],
    requiredScore: 5,
    basketY: 70,
  },
];

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [ball, setBall] = useState<Ball>({ x: 200, y: 450, vx: 0, vy: 0, radius: 12, isFlying: false });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState<Obstacle[]>(levels[0].obstacles.map((o) => ({ ...o })));

  const canvasWidth = 400;
  const canvasHeight = 500;
  const basketWidth = 80;
  const basketHeight = 20;
  const basketX = canvasWidth / 2 - basketWidth / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw basket
      const currentLevelData = levels[currentLevel];
      const basketY = currentLevelData.basketY;
      ctx.fillStyle = '#ff6b35';
      ctx.fillRect(basketX, basketY, basketWidth, basketHeight);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏀', basketX + basketWidth / 2, basketY + 15);

      // Update and draw moving obstacles
      obstacles.forEach((obstacle) => {
        if (obstacle.moving) {
          obstacle.x += obstacle.direction! * obstacle.speed!;
          if (obstacle.x <= 0 || obstacle.x + obstacle.width >= canvasWidth) {
            obstacle.direction! *= -1;
          }
        }

        // Draw obstacle
        ctx.fillStyle = '#64748b';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Update ball physics
      if (ball.isFlying) {
        const newBall = { ...ball };
        newBall.vy += 0.4; // gravity
        newBall.x += newBall.vx;
        newBall.y += newBall.vy;

        // Check collision with obstacles
        let hitObstacle = false;
        obstacles.forEach((obstacle) => {
          if (
            newBall.x + newBall.radius > obstacle.x &&
            newBall.x - newBall.radius < obstacle.x + obstacle.width &&
            newBall.y + newBall.radius > obstacle.y &&
            newBall.y - newBall.radius < obstacle.y + obstacle.height
          ) {
            hitObstacle = true;
          }
        });

        // Check if ball scored
        if (
          !hitObstacle &&
          newBall.x > basketX &&
          newBall.x < basketX + basketWidth &&
          newBall.y > basketY &&
          newBall.y < basketY + basketHeight &&
          newBall.vy > 0
        ) {
          setScore((s) => s + 1);
          newBall.isFlying = false;
          newBall.x = 200;
          newBall.y = 450;
          newBall.vx = 0;
          newBall.vy = 0;
        }

        // Check if ball is out of bounds
        if (newBall.y > canvasHeight + 50 || hitObstacle) {
          newBall.isFlying = false;
          newBall.x = 200;
          newBall.y = 450;
          newBall.vx = 0;
          newBall.vy = 0;
          setAttempts((a) => a - 1);
        }

        setBall(newBall);
      }

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff8c42';
      ctx.fill();
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw trajectory preview when dragging
      if (isDragging && !ball.isFlying) {
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(ball.x, ball.y);
        const previewLength = Math.min(Math.hypot(dragStart.x - ball.x, dragStart.y - ball.y), 150);
        const angle = Math.atan2(dragStart.y - ball.y, dragStart.x - ball.x);
        ctx.lineTo(ball.x - Math.cos(angle) * previewLength, ball.y - Math.sin(angle) * previewLength);
        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [ball, isDragging, dragStart, obstacles, currentLevel]);

  // Check level completion
  useEffect(() => {
    const currentLevelData = levels[currentLevel];
    if (score >= currentLevelData.requiredScore) {
      if (currentLevel < levels.length - 1) {
        // Next level
        setTimeout(() => {
          setCurrentLevel((l) => l + 1);
          setScore(0);
          setAttempts(5);
          setObstacles(levels[currentLevel + 1].obstacles.map((o) => ({ ...o })));
        }, 500);
      } else {
        // Game won!
        setGameWon(true);
      }
    }
  }, [score, currentLevel]);

  // Check game over
  useEffect(() => {
    if (attempts <= 0 && !ball.isFlying) {
      setGameOver(true);
    }
  }, [attempts, ball.isFlying]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (ball.isFlying || gameWon || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distance = Math.hypot(x - ball.x, y - ball.y);
    if (distance <= ball.radius * 2) {
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragStart({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDragging || ball.isFlying) return;

    const power = Math.min(Math.hypot(dragStart.x - ball.x, dragStart.y - ball.y), 150) / 15;
    const angle = Math.atan2(dragStart.y - ball.y, dragStart.x - ball.x);

    setBall({
      ...ball,
      vx: -Math.cos(angle) * power,
      vy: -Math.sin(angle) * power,
      isFlying: true,
    });

    setIsDragging(false);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setAttempts(5);
    setGameWon(false);
    setGameOver(false);
    setBall({ x: 200, y: 450, vx: 0, vy: 0, radius: 12, isFlying: false });
    setObstacles(levels[0].obstacles.map((o) => ({ ...o })));
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((l) => l + 1);
      setScore(0);
      setAttempts(5);
      setObstacles(levels[currentLevel + 1].obstacles.map((o) => ({ ...o })));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1 className="text-8xl md:text-9xl font-serif font-bold text-accent mb-2">404</h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
          <p className="text-xl md:text-2xl font-medium mt-6 mb-2">Oops! Page Not Found</p>
          <p className="text-muted-foreground">But hey, play some Basketball while you're here! 🏀</p>
        </div>

        {/* Game Stats */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Level</p>
            <p className="text-2xl font-bold">{currentLevel + 1}/{levels.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Score</p>
            <p className="text-2xl font-bold text-accent">
              {score}/{levels[currentLevel].requiredScore}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Attempts</p>
            <p className="text-2xl font-bold">{attempts}</p>
          </div>
        </div>

        {/* Game Board */}
        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-2">
          <div className="max-w-md mx-auto">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setIsDragging(false)}
              className="w-full border-2 border-border rounded-lg bg-background/50 cursor-pointer"
              style={{ touchAction: 'none' }}
            />

            <p className="text-center text-sm text-muted-foreground mt-4">
              🎯 Drag the ball and release to shoot! Avoid obstacles!
            </p>
          </div>

          {/* Win Message */}
          {gameWon && (
            <div className="mt-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full mb-4">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">All Levels Completed! 🎉</span>
              </div>
              <p className="text-muted-foreground">You're a basketball champion!</p>
            </div>
          )}

          {/* Game Over Message */}
          {gameOver && (
            <div className="mt-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-6 py-3 rounded-full mb-4">
                <span className="font-semibold">Game Over!</span>
              </div>
              <p className="text-muted-foreground">You ran out of attempts. Try again!</p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Button onClick={resetGame} variant="outline" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Game
          </Button>
          {score >= levels[currentLevel].requiredScore && currentLevel < levels.length - 1 && !gameWon && (
            <Button onClick={nextLevel} size="lg" className="animate-pulse">
              <ArrowRight className="mr-2 h-4 w-4" />
              Next Level
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
        <p className="text-center text-sm text-muted-foreground mt-8">
          Lost your way? Score some hoops first, then find your way home!
        </p>
      </div>
    </div>
  );
}
