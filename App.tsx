import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import StarBackground from './components/StarBackground';
import CursorTrail from './components/CursorTrail';
import PoemSection from './components/PoemSection';
import MusicPlayer from './components/MusicPlayer';
import WelcomeScreen from './components/WelcomeScreen';
import { BurstHeart } from './types';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState<BurstHeart[]>([]);

  useEffect(() => {
    // Handle Mouse Movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Handle Touch Movement (for mobile cursor trail)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    setTimeout(() => setIsPlaying(true), 500);
  };

  const handleGlobalClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!hasEntered) return;
    
    let clientX, clientY;
    
    if ('touches' in e) {
        // Touch event
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        // Mouse event
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
    }

    // Create a burst of hearts at click/tap position
    const newHearts: BurstHeart[] = [];
    const count = 5 + Math.floor(Math.random() * 5); // 5-10 hearts
    const words = ["Love", "Forever", "You", "Always", "Mine"];
    
    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: clientX,
        y: clientY,
        angle: Math.random() * 360,
        speed: 2 + Math.random() * 4,
        scale: 0.5 + Math.random(),
        life: 1,
        text: Math.random() > 0.8 ? words[Math.floor(Math.random() * words.length)] : undefined
      });
    }
    setHearts(prev => [...prev, ...newHearts]);
  }, [hasEntered]);

  // Animation loop for burst hearts
  useEffect(() => {
    if (hearts.length === 0) return;

    const interval = setInterval(() => {
      setHearts(prevHearts => 
        prevHearts
          .map(heart => ({
            ...heart,
            x: heart.x + Math.cos(heart.angle * Math.PI / 180) * heart.speed,
            y: heart.y + Math.sin(heart.angle * Math.PI / 180) * heart.speed,
            life: heart.life - 0.02,
            speed: heart.speed * 0.95 // Friction
          }))
          .filter(heart => heart.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [hearts.length]);

  return (
    <main 
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#1a0505] via-[#0f0202] to-black text-white selection:bg-rose-500/30 cursor-none"
      onClick={handleGlobalClick}
      onTouchStart={handleGlobalClick}
    >
      
      {/* Background & Effects */}
      <StarBackground mousePosition={mousePosition} />
      <CursorTrail mousePosition={mousePosition} />

      {/* Burst Hearts Overlay */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 text-rose-500 flex items-center justify-center font-vibes"
          style={{
            left: heart.x,
            top: heart.y,
            transform: `translate(-50%, -50%) scale(${heart.scale})`,
            opacity: heart.life,
            textShadow: '0 0 10px rgba(225,29,72,0.5)'
          }}
        >
          <Heart className="fill-current" size={24} />
          {heart.text && (
            <span className="absolute -top-6 text-rose-200 text-lg whitespace-nowrap">{heart.text}</span>
          )}
        </div>
      ))}

      {/* Logic Layers */}
      <AnimatePresence mode='wait'>
        {!hasEntered && (
          <WelcomeScreen key="welcome" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasEntered && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative z-10 w-full"
          >
            {/* Poem Content - Handles its own internal pages */}
            <PoemSection />

            {/* Footer */}
            <footer className="w-full pb-8 text-center z-20 absolute bottom-0 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                 <p className="font-cinzel text-[10px] text-rose-500/30 tracking-[0.4em] uppercase">
                   For Aielin
                 </p>
              </motion.div>
            </footer>

            {/* Persistent Music Player */}
            <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;