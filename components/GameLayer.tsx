import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { GameTarget } from '../types';

interface GameLayerProps {
  mousePosition: { x: number; y: number };
  onScoreUpdate: (score: number) => void;
  onComplete: () => void;
}

const TOTAL_TARGETS = 7;

const GameLayer: React.FC<GameLayerProps> = ({ mousePosition, onScoreUpdate, onComplete }) => {
  const [targets, setTargets] = useState<GameTarget[]>([]);
  const [score, setScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize targets
  useEffect(() => {
    const newTargets: GameTarget[] = [];
    for (let i = 0; i < TOTAL_TARGETS; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * (window.innerHeight - 100) + 50,
        isCollected: false,
        scale: Math.random() * 0.5 + 0.8,
      });
    }
    setTargets(newTargets);
  }, []);

  // Check collisions
  useEffect(() => {
    setTargets((prevTargets) => {
      let scoreIncrement = 0;
      const updatedTargets = prevTargets.map((target) => {
        if (target.isCollected) return target;

        const dx = mousePosition.x - target.x;
        const dy = mousePosition.y - target.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
          scoreIncrement++;
          return { ...target, isCollected: true };
        }
        return target;
      });

      if (scoreIncrement > 0) {
        const newScore = score + scoreIncrement;
        setScore(newScore);
        onScoreUpdate(newScore);
        if (newScore === TOTAL_TARGETS) {
            setTimeout(onComplete, 1500);
        }
      }

      return updatedTargets;
    });
  }, [mousePosition, score, onScoreUpdate, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-30 pointer-events-none">
      
      {/* Instructions */}
      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0 }}
         className="absolute top-24 left-0 w-full text-center pointer-events-none"
      >
        <p className="font-playfair text-xl text-rose-200/80 italic tracking-wide drop-shadow-md">
           Gather the fragments  {score}/{TOTAL_TARGETS}
        </p>
      </motion.div>

      <AnimatePresence>
        {targets.map((target) => (
          !target.isCollected && (
            <motion.div
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: target.scale, 
                opacity: 1,
                x: target.x - 24, // Center align 
                y: target.y - 24 
              }}
              exit={{ 
                scale: 2, 
                opacity: 0,
                filter: "blur(10px)",
                transition: { duration: 0.5 }
              }}
              whileHover={{ scale: 1.2 }}
              className="absolute w-12 h-12 flex items-center justify-center cursor-none"
            >
               {/* Pulse Effect */}
               <div className="absolute inset-0 bg-rose-500/30 rounded-full animate-ping opacity-75"></div>
               <div className="relative">
                 <Heart 
                    size={32} 
                    className="text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(225,29,72,0.8)]" 
                 />
               </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Floating text feedback when collecting */}
      <AnimatePresence>
          {targets.filter(t => t.isCollected).map((t) => (
              <motion.div
                key={`feedback-${t.id}`}
                initial={{ opacity: 1, x: t.x, y: t.y, scale: 0.5 }}
                animate={{ opacity: 0, y: t.y - 100, scale: 1.5 }}
                transition={{ duration: 1 }}
                className="absolute text-rose-300 font-vibes text-2xl"
              >
                Love
              </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default GameLayer;