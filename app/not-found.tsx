'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Home, RotateCcw, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isFlying: boolean;
  rotation: number;
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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface Level {
  number: number;
  obstacles: Obstacle[];
  requiredScore: number;
  basketY: number;
  name: string;
}

const levels: Level[] = [
  { number: 1, obstacles: [], requiredScore: 3, basketY: 80, name: 'Warm Up' },
  { number: 2, obstacles: [{ x: 200, y: 250, width: 100, height: 15 }], requiredScore: 3, basketY: 80, name: 'First Block' },
  {
    number: 3,
    obstacles: [
      { x: 150, y: 200, width: 80, height: 15 },
      { x: 250, y: 300, width: 80, height: 15 },
    ],
    requiredScore: 4,
    basketY: 70,
    name: 'Double Trouble',
  },
  {
    number: 4,
    obstacles: [{ x: 100, y: 220, width: 60, height: 15, moving: true, direction: 1, speed: 2 }],
    requiredScore: 4,
    basketY: 70,
    name: 'Moving Target',
  },
  {
    number: 5,
    obstacles: [
      { x: 120, y: 180, width: 70, height: 15, moving: true, direction: 1, speed: 1.8 },
      { x: 200, y: 280, width: 70, height: 15, moving: true, direction: -1, speed: 2.2 },
    ],
    requiredScore: 5,
    basketY: 60,
    name: 'Champion Court',
  },
];

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [ball, setBall] = useState<Ball>({ x: 200, y: 450, vx: 0, vy: 0, radius: 14, isFlying: false, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState<Obstacle[]>(levels[0].obstacles.map((o) => ({ ...o })));
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lastScore, setLastScore] = useState(0);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [netAnimation, setNetAnimation] = useState(0);

  const canvasWidth = 400;
  const canvasHeight = 500;
  const basketWidth = 70;
  const basketHeight = 8;
  const basketX = canvasWidth / 2 - basketWidth / 2;
  const backboardHeight = 50;

  // Draw basketball with seams
  const drawBasketball = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Ball body
    const gradient = ctx.createRadialGradient(-radius / 3, -radius / 3, 0, 0, 0, radius);
    gradient.addColorStop(0, '#ff9f5f');
    gradient.addColorStop(1, '#ff6b35');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Ball seams
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.8, -Math.PI / 4, Math.PI / 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.8, (Math.PI * 3) / 4, (Math.PI * 5) / 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -radius);
    ctx.lineTo(0, radius);
    ctx.stroke();

    ctx.restore();
  };

  // Draw basket with backboard and net
  const drawBasket = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, netAnim: number) => {
    // Backboard
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + width / 2 - 40, y - backboardHeight, 80, backboardHeight);
    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 3;
    ctx.strokeRect(x + width / 2 - 40, y - backboardHeight, 80, backboardHeight);

    // Backboard square (target area)
    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + width / 2 - 20, y - 30, 40, 25);

    // Rim
    ctx.strokeStyle = '#ff4500';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x + width / 2, y, width / 2, 0, Math.PI, true);
    ctx.stroke();

    // Net (animated)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const startX = x + (width / 6) * i;
      const netOffset = Math.sin(netAnim + i) * 2;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.quadraticCurveTo(startX + 5, y + 15 + netOffset, startX, y + 25);
      ctx.stroke();
    }
  };

  // Draw court background
  const drawCourt = (ctx: CanvasRenderingContext2D) => {
    // Court gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#1a1f2e');
    gradient.addColorStop(1, '#0f1419');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Court lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.15;

    // Three-point line (arc)
    ctx.beginPath();
    ctx.arc(canvasWidth / 2, canvasHeight, 150, 0, Math.PI, true);
    ctx.stroke();

    // Free throw line
    ctx.beginPath();
    ctx.moveTo(100, canvasHeight - 100);
    ctx.lineTo(300, canvasHeight - 100);
    ctx.stroke();

    // Center lines
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    ctx.globalAlpha = 1;
  };

  // Draw power meter
  const drawPowerMeter = (ctx: CanvasRenderingContext2D, power: number) => {
    const maxPower = 150;
    const powerPercent = Math.min(power / maxPower, 1);

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(10, canvasHeight - 30, 100, 20);

    // Power bar
    const powerColor = powerPercent < 0.5 ? '#10b981' : powerPercent < 0.8 ? '#f59e0b' : '#ef4444';
    ctx.fillStyle = powerColor;
    ctx.fillRect(10, canvasHeight - 30, 100 * powerPercent, 20);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, canvasHeight - 30, 100, 20);

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('POWER', 60, canvasHeight - 35);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = () => {
      // Draw court background
      drawCourt(ctx);

      const currentLevelData = levels[currentLevel];
      const basketY = currentLevelData.basketY;

      // Draw basket with net
      drawBasket(ctx, basketX, basketY, basketWidth, netAnimation);
      setNetAnimation((prev) => prev + 0.1);

      // Update and draw moving obstacles
      obstacles.forEach((obstacle) => {
        if (obstacle.moving) {
          obstacle.x += obstacle.direction! * obstacle.speed!;
          if (obstacle.x <= 0 || obstacle.x + obstacle.width >= canvasWidth) {
            obstacle.direction! *= -1;
          }
        }

        // Draw obstacle with 3D effect
        ctx.fillStyle = '#475569';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.fillStyle = '#334155';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height / 2);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Moving indicator
        if (obstacle.moving) {
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(obstacle.x + obstacle.width / 2, obstacle.y - 8, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Update ball physics
      if (ball.isFlying) {
        const newBall = { ...ball };
        newBall.vy += 0.4; // gravity
        newBall.x += newBall.vx;
        newBall.y += newBall.vy;
        newBall.rotation += 0.1;

        // Ball trail effect
        if (Math.random() > 0.7) {
          setParticles((prev) => [
            ...prev,
            {
              x: newBall.x,
              y: newBall.y,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 20,
              color: '#ff9f5f',
            },
          ]);
        }

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
            // Miss effect
            for (let i = 0; i < 10; i++) {
              setParticles((prev) => [
                ...prev,
                {
                  x: newBall.x,
                  y: newBall.y,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  life: 30,
                  color: '#ef4444',
                },
              ]);
            }
          }
        });

        // Check if ball scored
        if (
          !hitObstacle &&
          newBall.x > basketX &&
          newBall.x < basketX + basketWidth &&
          newBall.y > basketY - 5 &&
          newBall.y < basketY + basketHeight + 5 &&
          newBall.vy > 0
        ) {
          setScore((s) => s + 1);
          setLastScore((s) => s + 1);
          setShowScoreAnimation(true);
          setTimeout(() => setShowScoreAnimation(false), 1000);

          // Score celebration particles
          for (let i = 0; i < 30; i++) {
            setParticles((prev) => [
              ...prev,
              {
                x: basketX + basketWidth / 2,
                y: basketY,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 50,
                color: ['#10b981', '#fbbf24', '#3b82f6'][Math.floor(Math.random() * 3)],
              },
            ]);
          }

          newBall.isFlying = false;
          newBall.x = 200;
          newBall.y = 450;
          newBall.vx = 0;
          newBall.vy = 0;
          newBall.rotation = 0;
        }

        // Check if ball is out of bounds
        if (newBall.y > canvasHeight + 50 || hitObstacle || newBall.x < -50 || newBall.x > canvasWidth + 50) {
          newBall.isFlying = false;
          newBall.x = 200;
          newBall.y = 450;
          newBall.vx = 0;
          newBall.vy = 0;
          newBall.rotation = 0;
          if (!hitObstacle || newBall.y > canvasHeight + 50) {
            setAttempts((a) => a - 1);
          } else {
            setAttempts((a) => a - 1);
          }
        }

        setBall(newBall);
      }

      // Draw ball
      drawBasketball(ctx, ball.x, ball.y, ball.radius, ball.rotation);

      // Draw trajectory preview when dragging
      if (isDragging && !ball.isFlying) {
        const distance = Math.hypot(dragStart.x - ball.x, dragStart.y - ball.y);
        const power = Math.min(distance, 150);

        // Draw power meter
        drawPowerMeter(ctx, power);

        // Trajectory line
        ctx.beginPath();
        ctx.setLineDash([8, 8]);
        ctx.moveTo(ball.x, ball.y);
        const angle = Math.atan2(dragStart.y - ball.y, dragStart.x - ball.x);
        const previewLength = power * 1.5;
        ctx.lineTo(ball.x - Math.cos(angle) * previewLength, ball.y - Math.sin(angle) * previewLength);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.setLineDash([]);

        // Target indicator
        const targetX = ball.x - Math.cos(angle) * previewLength;
        const targetY = ball.y - Math.sin(angle) * previewLength;
        ctx.fillStyle = 'rgba(251, 191, 36, 0.3)';
        ctx.beginPath();
        ctx.arc(targetX, targetY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Update and draw particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1,
            vy: p.vy + 0.2,
          }))
          .filter((p) => p.life > 0)
      );

      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 50;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Score animation
      if (showScoreAnimation) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 40px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 20;
        ctx.fillText('+1', canvasWidth / 2, canvasHeight / 2);
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [ball, isDragging, dragStart, obstacles, currentLevel, particles, showScoreAnimation, netAnimation]);

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
          setBall({ x: 200, y: 450, vx: 0, vy: 0, radius: 14, isFlying: false, rotation: 0 });
        }, 800);
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
    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const distance = Math.hypot(x - ball.x, y - ball.y);
    if (distance <= ball.radius * 3) {
      setIsDragging(true);
      setDragStart({ x, y });
      setShowTutorial(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setDragStart({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDragging || ball.isFlying) return;

    const distance = Math.hypot(dragStart.x - ball.x, dragStart.y - ball.y);
    const power = Math.min(distance, 150) / 15;
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
    setShowTutorial(true);
    setBall({ x: 200, y: 450, vx: 0, vy: 0, radius: 14, isFlying: false, rotation: 0 });
    setObstacles(levels[0].obstacles.map((o) => ({ ...o })));
    setParticles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block">
            <h1 className="text-7xl md:text-8xl font-serif font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              404
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          </div>
          <p className="text-xl md:text-2xl font-medium mt-4 mb-1 text-white">Page Not Found</p>
          <p className="text-slate-400">Play some basketball while you're here! 🏀</p>
        </div>

        {/* Level Info */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2">
            <Zap className="h-4 w-4 text-orange-500" />
            <span className="font-semibold text-white">{levels[currentLevel].name}</span>
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
          <div className="text-center bg-slate-800/50 backdrop-blur rounded-lg px-4 py-2 border border-slate-700">
            <p className="text-xs text-slate-400 mb-1">Level</p>
            <p className="text-xl font-bold text-white">
              {currentLevel + 1}/{levels.length}
            </p>
          </div>
          <div className="text-center bg-slate-800/50 backdrop-blur rounded-lg px-4 py-2 border border-slate-700">
            <p className="text-xs text-slate-400 mb-1">Score</p>
            <p className="text-xl font-bold text-orange-500">
              {score}/{levels[currentLevel].requiredScore}
            </p>
          </div>
          <div className="text-center bg-slate-800/50 backdrop-blur rounded-lg px-4 py-2 border border-slate-700">
            <p className="text-xs text-slate-400 mb-1">Shots Left</p>
            <p className="text-xl font-bold text-white">{attempts}</p>
          </div>
        </div>

        {/* Game Board */}
        <Card className="p-4 md:p-6 bg-slate-800/50 backdrop-blur border-slate-700 relative">
          <div className="max-w-md mx-auto relative">
            {/* Tutorial Overlay */}
            {showTutorial && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg animate-in fade-in">
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">👆</div>
                  <p className="text-white font-semibold text-lg mb-2">Drag & Release to Shoot!</p>
                  <p className="text-slate-300 text-sm">Click the ball, drag back, and let go!</p>
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setIsDragging(false)}
              className="w-full border-2 border-slate-700 rounded-lg bg-slate-900 cursor-pointer shadow-2xl"
              style={{ touchAction: 'none' }}
            />
          </div>

          {/* Win Message */}
          {gameWon && (
            <div className="mt-6 text-center animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-500 px-6 py-3 rounded-full mb-2">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">All Levels Completed! 🎉</span>
              </div>
              <p className="text-slate-400">You're a basketball champion!</p>
            </div>
          )}

          {/* Game Over Message */}
          {gameOver && (
            <div className="mt-6 text-center animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-3 rounded-full mb-2">
                <span className="font-semibold">Game Over!</span>
              </div>
              <p className="text-slate-400">Out of shots. Try again!</p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Button onClick={resetGame} variant="outline" size="lg" className="border-slate-700 hover:bg-slate-800">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Game
          </Button>
          <Link href="/">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button variant="ghost" size="lg" onClick={() => window.history.back()} className="hover:bg-slate-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-slate-500 mt-6">Lost your way? Score some hoops first! 🏀</p>
      </div>
    </div>
  );
}
