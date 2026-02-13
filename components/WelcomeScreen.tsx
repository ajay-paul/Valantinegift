import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-black/60 to-black/80"></div>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="text-center space-y-10 relative z-10 p-8"
      >
        <div className="space-y-4">
          <p className="text-rose-300/70 tracking-[0.4em] uppercase text-xs md:text-sm font-montserrat">
            A Valentine Gift For
          </p>
          <h1 className="text-6xl md:text-8xl font-vibes text-white drop-shadow-[0_0_20px_rgba(225,29,72,0.5)]">
            Aielin
          </h1>
        </div>
        
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(225, 29, 72, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-10 py-4 bg-transparent border border-rose-500/40 rounded-full overflow-hidden transition-all duration-500 hover:border-rose-400 hover:bg-rose-950/20"
        >
          <span className="relative flex items-center gap-3 font-cinzel tracking-widest text-sm text-rose-100 group-hover:text-white transition-colors">
            OPEN <Heart size={16} className="text-rose-500 fill-rose-500 animate-pulse" />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;