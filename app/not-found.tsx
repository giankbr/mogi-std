'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Home, RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CardType {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const emojis = ['🎨', '🎭', '🎪', '🎬', '🎮', '🎯', '🎲', '🎸'];

export default function NotFound() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setIsChecking(false);
  };

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length === 2 || cards[id].matched || flippedCards.includes(id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Update card to show it's flipped
    setCards((prev) => prev.map((card) => (card.id === id ? { ...card, flipped: true } : card)));

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, matched: true } : card))
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
          setIsChecking(false);

          // Check if game is won
          if (matches + 1 === emojis.length) {
            setGameWon(true);
          }
        }, 500);
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, flipped: false } : card))
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
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
          <p className="text-muted-foreground">But hey, while you're here... Play a quick memory game! 🎮</p>
        </div>

        {/* Game Stats */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Moves</p>
            <p className="text-2xl font-bold">{moves}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Matches</p>
            <p className="text-2xl font-bold text-accent">
              {matches}/{emojis.length}
            </p>
          </div>
        </div>

        {/* Game Board */}
        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-2">
          <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-lg mx-auto">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.matched || isChecking}
                className={`
                  aspect-square rounded-xl flex items-center justify-center text-4xl md:text-5xl
                  transition-all duration-300 transform hover:scale-105
                  ${
                    card.flipped || card.matched
                      ? 'bg-accent text-accent-foreground shadow-lg'
                      : 'bg-muted hover:bg-muted/80 shadow-md'
                  }
                  ${card.matched ? 'opacity-75 scale-95' : ''}
                  ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {card.flipped || card.matched ? (
                  <span className="animate-in zoom-in duration-200">{card.emoji}</span>
                ) : (
                  <span className="text-muted-foreground">?</span>
                )}
              </button>
            ))}
          </div>

          {/* Win Message */}
          {gameWon && (
            <div className="mt-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full mb-4">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">You Won! 🎉</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Completed in <span className="font-bold text-foreground">{moves}</span> moves
              </p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Button onClick={initializeGame} variant="outline" size="lg">
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
        <p className="text-center text-sm text-muted-foreground mt-8">
          Lost? No worries! Match all cards to win, then head back home.
        </p>
      </div>
    </div>
  );
}

