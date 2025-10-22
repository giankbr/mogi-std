'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Home, RotateCcw, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const particlesRef = useRef<Particle[]>([]);
  const netAnimRef = useRef(0);
  const ballRef = useRef<Ball>({ x: 200, y: 450, vx: 0, vy: 0, radius: 14, isFlying: false, rotation: 0 });
  const obstaclesRef = useRef<Obstacle[]>(levels[0].obstacles.map((o) => ({ ...o })));

  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [aimAngle, setAimAngle] = useState(-Math.PI / 2); // Default aim up
  const [power, setPower] = useState(8); // Default power
  const [useKeyboard, setUseKeyboard] = useState(false);

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
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + width / 2 - 40, y - backboardHeight, 80, backboardHeight);

    // Backboard square (target area)
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + width / 2 - 20, y - 30, 40, 25);

    // Rim
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x + width / 2, y, width / 2, 0, Math.PI, true);
    ctx.stroke();

    // Net (animated)
    ctx.strokeStyle = '#999999';
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
    // Simple background
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Subtle court lines
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;

    // Three-point line (arc)
    ctx.beginPath();
    ctx.arc(canvasWidth / 2, canvasHeight, 150, 0, Math.PI, true);
    ctx.stroke();

    // Free throw line
    ctx.beginPath();
    ctx.moveTo(100, canvasHeight - 100);
    ctx.lineTo(300, canvasHeight - 100);
    ctx.stroke();

    // Center line
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

  const addParticles = useCallback((particles: Particle[]) => {
    particlesRef.current = [...particlesRef.current, ...particles];
  }, []);

  const createScoreParticles = useCallback(
    (x: number, y: number) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 50,
          color: ['#10b981', '#fbbf24', '#3b82f6'][Math.floor(Math.random() * 3)],
        });
      }
      addParticles(newParticles);
    },
    [addParticles]
  );

  const createMissParticles = useCallback(
    (x: number, y: number) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 10; i++) {
        newParticles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          life: 30,
          color: '#ef4444',
        });
      }
      addParticles(newParticles);
    },
    [addParticles]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (ballRef.current.isFlying || gameWon || gameOver) return;

      setUseKeyboard(true);
      setShowTutorial(false);

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setAimAngle((prev) => Math.max(prev - 0.1, -Math.PI));
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setAimAngle((prev) => Math.min(prev + 0.1, 0));
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          setPower((prev) => Math.min(prev + 0.5, 15));
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setPower((prev) => Math.max(prev - 0.5, 3));
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          // Shoot!
          ballRef.current.vx = Math.cos(aimAngle) * power;
          ballRef.current.vy = Math.sin(aimAngle) * power;
          ballRef.current.isFlying = true;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aimAngle, power, gameWon, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = () => {
      try {
        // Draw court background
        drawCourt(ctx);

        const currentLevelData = levels[currentLevel];
        const basketY = currentLevelData.basketY;

        // Draw basket with net
        netAnimRef.current += 0.1;
        drawBasket(ctx, basketX, basketY, basketWidth, netAnimRef.current);

        // Update and draw obstacles
        obstaclesRef.current.forEach((obstacle) => {
          if (obstacle.moving) {
            obstacle.x += obstacle.direction! * obstacle.speed!;
            if (obstacle.x <= 0 || obstacle.x + obstacle.width >= canvasWidth) {
              obstacle.direction! *= -1;
            }
          }

          // Draw obstacle
          ctx.fillStyle = '#d4d4d4';
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          ctx.strokeStyle = '#a3a3a3';
          ctx.lineWidth = 2;
          ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

          // Moving indicator
          if (obstacle.moving) {
            ctx.fillStyle = '#666666';
            ctx.beginPath();
            ctx.arc(obstacle.x + obstacle.width / 2, obstacle.y - 8, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Update ball physics
        const ball = ballRef.current;
        if (ball.isFlying) {
          ball.vy += 0.4; // gravity
          ball.x += ball.vx;
          ball.y += ball.vy;
          ball.rotation += 0.1;

          // Ball trail effect
          if (Math.random() > 0.7) {
            particlesRef.current.push({
              x: ball.x,
              y: ball.y,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 20,
              color: '#ff9f5f',
            });
          }

          // Check collision with obstacles
          let hitObstacle = false;
          obstaclesRef.current.forEach((obstacle) => {
            if (ball.x + ball.radius > obstacle.x && ball.x - ball.radius < obstacle.x + obstacle.width && ball.y + ball.radius > obstacle.y && ball.y - ball.radius < obstacle.y + obstacle.height) {
              hitObstacle = true;
              createMissParticles(ball.x, ball.y);
            }
          });

          // Check if ball scored
          if (!hitObstacle && ball.x > basketX && ball.x < basketX + basketWidth && ball.y > basketY - 5 && ball.y < basketY + basketHeight + 5 && ball.vy > 0) {
            setScore((s) => s + 1);
            setShowScoreAnimation(true);
            setTimeout(() => setShowScoreAnimation(false), 1000);
            createScoreParticles(basketX + basketWidth / 2, basketY);

            ball.isFlying = false;
            ball.x = 200;
            ball.y = 450;
            ball.vx = 0;
            ball.vy = 0;
            ball.rotation = 0;
          }

          // Check if ball is out of bounds
          if (ball.y > canvasHeight + 50 || hitObstacle || ball.x < -50 || ball.x > canvasWidth + 50) {
            ball.isFlying = false;
            ball.x = 200;
            ball.y = 450;
            ball.vx = 0;
            ball.vy = 0;
            ball.rotation = 0;
            setAttempts((a) => Math.max(0, a - 1));
          }
        }

        // Draw ball
        drawBasketball(ctx, ball.x, ball.y, ball.radius, ball.rotation);

        // Draw trajectory preview (both drag and keyboard mode)
        if (!ball.isFlying && (isDragging || useKeyboard)) {
          let angle, currentPower;

          if (isDragging) {
            // Mouse/Touch drag mode
            const distance = Math.hypot(dragStart.x - ball.x, dragStart.y - ball.y);
            currentPower = Math.min(distance, 150) / 15;
            angle = Math.atan2(dragStart.y - ball.y, dragStart.x - ball.x);
          } else {
            // Keyboard mode
            currentPower = power;
            angle = aimAngle;
          }

          // Draw power meter
          drawPowerMeter(ctx, currentPower * 15);

          // Draw trajectory arc with dots (more intuitive)
          ctx.strokeStyle = '#333333';
          ctx.fillStyle = '#333333';
          ctx.lineWidth = 2;

          // Simulate ball trajectory
          let simX = ball.x;
          let simY = ball.y;
          let simVx = Math.cos(angle) * currentPower;
          let simVy = Math.sin(angle) * currentPower;

          // Draw dots along trajectory
          for (let i = 0; i < 30; i++) {
            if (simY > canvasHeight || simX < 0 || simX > canvasWidth) break;

            // Draw dot
            ctx.beginPath();
            ctx.arc(simX, simY, 3, 0, Math.PI * 2);
            ctx.fill();

            // Update position
            simVy += 0.4; // gravity
            simX += simVx;
            simY += simVy;
          }

          // Draw arrow at ball showing direction
          ctx.save();
          ctx.translate(ball.x, ball.y);
          ctx.rotate(angle);
          ctx.fillStyle = '#333333';
          ctx.beginPath();
          ctx.moveTo(25, 0);
          ctx.lineTo(15, -5);
          ctx.lineTo(15, 5);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // Update and draw particles
        particlesRef.current = particlesRef.current
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1,
            vy: p.vy + 0.2,
          }))
          .filter((p) => p.life > 0);

        particlesRef.current.forEach((p) => {
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
      } catch (error) {
        console.error('Animation error:', error);
        cancelAnimationFrame(animationId);
      }
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentLevel, isDragging, dragStart, showScoreAnimation, useKeyboard, aimAngle, power, createScoreParticles, createMissParticles]);

  // Check level completion
  useEffect(() => {
    const currentLevelData = levels[currentLevel];
    if (score >= currentLevelData.requiredScore) {
      if (currentLevel < levels.length - 1) {
        setTimeout(() => {
          setCurrentLevel((l) => l + 1);
          setScore(0);
          setAttempts(5);
          obstaclesRef.current = levels[currentLevel + 1].obstacles.map((o) => ({ ...o }));
          ballRef.current = { x: 200, y: 450, vx: 0, vy: 0, radius: 14, isFlying: false, rotation: 0 };
        }, 800);
      } else {
        setGameWon(true);
      }
    }
  }, [score, currentLevel]);

  // Check game over
  useEffect(() => {
    if (attempts <= 0 && !ballRef.current.isFlying) {
      setGameOver(true);
    }
  }, [attempts]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (ballRef.current.isFlying || gameWon || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const distance = Math.hypot(x - ballRef.current.x, y - ballRef.current.y);
    if (distance <= ballRef.current.radius * 3) {
      setIsDragging(true);
      setDragStart({ x, y });
      setShowTutorial(false);
      setUseKeyboard(false); // Switch to mouse mode
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
    if (!isDragging || ballRef.current.isFlying) return;

    const distance = Math.hypot(dragStart.x - ballRef.current.x, dragStart.y - ballRef.current.y);
    const power = Math.min(distance, 150) / 15;
    const angle = Math.atan2(dragStart.y - ballRef.current.y, dragStart.x - ballRef.current.x);

    ballRef.current.vx = -Math.cos(angle) * power;
    ballRef.current.vy = -Math.sin(angle) * power;
    ballRef.current.isFlying = true;

    setIsDragging(false);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setAttempts(5);
    setGameWon(false);
    setGameOver(false);
    setShowTutorial(true);
    ballRef.current = { x: 200, y: 450, vx: 0, vy: 0, radius: 14, isFlying: false, rotation: 0 };
    obstaclesRef.current = levels[0].obstacles.map((o) => ({ ...o }));
    particlesRef.current = [];
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-8xl md:text-9xl font-serif font-bold mb-4">404</h1>
          <p className="text-2xl md:text-3xl font-medium mb-2">Page Not Found</p>
          <p className="text-muted-foreground">Play some basketball while you're here! 🏀</p>
        </div>

        {/* Level Info */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2">
            <Zap className="h-4 w-4 text-accent" />
            <span className="font-semibold">{levels[currentLevel].name}</span>
          </div>
        </div>

        {/* Game Stats */}
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
              {score}/{levels[currentLevel].requiredScore}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Shots Left</p>
            <p className="text-2xl font-bold">{attempts}</p>
          </div>
        </div>

        {/* Game Board */}
        <Card className="p-6 md:p-8 relative">
          <div className="max-w-md mx-auto relative">
            {/* Tutorial Overlay */}
            {showTutorial && (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-lg animate-in fade-in cursor-pointer"
                onClick={() => setShowTutorial(false)}
              >
                <div className="text-center p-6 max-w-sm" onClick={(e) => e.stopPropagation()}>
                  <div className="text-5xl mb-3">🏀</div>
                  <p className="font-semibold text-lg mb-3">How to Play</p>
                  
                  <div className="text-left space-y-2 mb-4 text-sm">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-medium mb-1">🖱️ Mouse/Touch:</p>
                      <p className="text-muted-foreground text-xs">Drag the ball and release to shoot</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-medium mb-1">⌨️ Keyboard:</p>
                      <p className="text-muted-foreground text-xs">
                        <span className="font-mono bg-background px-1 rounded">←→</span> or <span className="font-mono bg-background px-1 rounded">A/D</span> = Aim<br/>
                        <span className="font-mono bg-background px-1 rounded">↑↓</span> or <span className="font-mono bg-background px-1 rounded">W/S</span> = Power<br/>
                        <span className="font-mono bg-background px-1 rounded">Space</span> = Shoot!
                      </p>
                    </div>
                  </div>
                  
                  <Button size="sm" onClick={() => setShowTutorial(false)} className="w-full">
                    Let's Play!
                  </Button>
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
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const rect = canvasRef.current?.getBoundingClientRect();
                if (!rect) return;
                const scaleX = canvasWidth / rect.width;
                const scaleY = canvasHeight / rect.height;
                const x = (touch.clientX - rect.left) * scaleX;
                const y = (touch.clientY - rect.top) * scaleY;
                const distance = Math.hypot(x - ballRef.current.x, y - ballRef.current.y);
                if (distance <= ballRef.current.radius * 3) {
                  setIsDragging(true);
                  setDragStart({ x, y });
                  setShowTutorial(false);
                  setUseKeyboard(false); // Switch to touch mode
                }
              }}
              onTouchMove={(e) => {
                if (!isDragging) return;
                e.preventDefault();
                const touch = e.touches[0];
                const rect = canvasRef.current?.getBoundingClientRect();
                if (!rect) return;
                const scaleX = canvasWidth / rect.width;
                const scaleY = canvasHeight / rect.height;
                const x = (touch.clientX - rect.left) * scaleX;
                const y = (touch.clientY - rect.top) * scaleY;
                setDragStart({ x, y });
              }}
              onTouchEnd={handleMouseUp}
              className="w-full border rounded-lg cursor-pointer touch-none"
              style={{ touchAction: 'none' }}
            />
            
            {/* Control Hint */}
            {!showTutorial && !gameWon && !gameOver && (
              <p className="text-center text-xs text-muted-foreground mt-3">
                {useKeyboard ? (
                  <>
                    ← → = Aim | ↑ ↓ = Power | <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground">Space</kbd> = Shoot
                  </>
                ) : (
                  <>
                    Drag & release to shoot | Press any key for keyboard controls
                  </>
                )}
              </p>
            )}
          </div>

          {/* Win Message */}
          {gameWon && (
            <div className="mt-6 text-center animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full mb-2">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">All Levels Completed! 🎉</span>
              </div>
              <p className="text-muted-foreground">You're a basketball champion!</p>
            </div>
          )}

          {/* Game Over Message */}
          {gameOver && (
            <div className="mt-6 text-center animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-6 py-3 rounded-full mb-2">
                <span className="font-semibold">Game Over!</span>
              </div>
              <p className="text-muted-foreground">Out of shots. Try again!</p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Button onClick={resetGame} variant="outline" size="lg">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Game
          </Button>
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
        <p className="text-center text-sm text-muted-foreground mt-8">Lost your way? Score some hoops first! 🏀</p>
      </div>
    </div>
  );
}
