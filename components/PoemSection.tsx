import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';

// --- Global Background Component ---
const GlobalLoveBackground = () => {
  // Generate random positions for background hearts
  const [bgHearts] = useState(() => 
    [...Array(80)].map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 12 + 6, // 6px to 18px (Tiny)
      rotation: Math.random() * 360,
      delay: Math.random() * 2,
      beatDuration: 0.8 + Math.random() * 1.2 // 0.8s to 2s
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden">
        {/* Scattered Tiny Beating Hearts */}
        {bgHearts.map((heart) => (
             <motion.div
               key={heart.id}
               initial={{ opacity: 0, scale: 0.8, rotate: heart.rotation }}
               animate={{ 
                   opacity: [0.15, 0.3, 0.15], 
                   scale: [1, 1.3, 1] 
               }}
               transition={{ 
                   opacity: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: heart.delay },
                   scale: { duration: heart.beatDuration, repeat: Infinity, ease: "easeInOut", delay: heart.delay }
               }}
               className="absolute text-rose-500 mix-blend-screen"
               style={{
                 top: `${heart.top}%`,
                 left: `${heart.left}%`,
               }}
             >
                <Heart 
                    size={heart.size} 
                    className="fill-rose-600" 
                    strokeWidth={0}
                />
             </motion.div>
        ))}
        
        {/* Elegant "Love" Text Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] mix-blend-screen pointer-events-none">
             <span className="font-vibes text-[35vmin] text-rose-300 opacity-[0.03] select-none whitespace-nowrap blur-sm">Love</span>
        </div>
    </div>
  );
};

// --- Background Vector Components (Per Slide) ---

// 1. Time / Beginning: Infinity symbol entwined with a heart
const BgGraphic1 = () => (
  <svg viewBox="0 0 500 500" className="absolute w-[100%] h-[100%] opacity-20 text-rose-900 fill-none stroke-current stroke-[1.5]">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'rgb(88, 28, 135)', stopOpacity: 0.5 }} />
        <stop offset="100%" style={{ stopColor: 'rgb(225, 29, 72)', stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    {/* Infinity Shape */}
    <path d="M150,250 C150,150 250,150 250,250 C250,350 350,350 350,250 C350,150 250,150 250,250 C250,350 150,350 150,250 Z" 
          className="animate-pulse-slow" stroke="url(#grad1)" />
    {/* Central Heart */}
    <path d="M250,270 C220,240 220,200 250,200 C280,200 280,240 250,270" fill="currentColor" className="opacity-30" />
  </svg>
);

// 2. Stars: Constellation forming a heart
const BgGraphic2 = () => (
  <svg viewBox="0 0 500 500" className="absolute w-[100%] h-[100%] opacity-20 text-rose-800 fill-none stroke-current stroke-1">
    {/* Star trails */}
    <path d="M100,100 Q250,50 400,100" strokeDasharray="4,4" opacity="0.5"/>
    
    {/* Heart Constellation */}
    <path d="M250,350 C150,300 150,150 250,150 C350,150 350,300 250,350 Z" strokeDasharray="2,6" strokeWidth="2" />
    
    {/* Stars */}
    <circle cx="250" cy="150" r="4" fill="currentColor" className="animate-pulse" />
    <circle cx="180" cy="200" r="3" fill="currentColor" />
    <circle cx="320" cy="200" r="3" fill="currentColor" />
    <circle cx="250" cy="350" r="4" fill="currentColor" className="animate-pulse" />
    
    {/* Connecting lines to stars */}
    <line x1="250" y1="150" x2="180" y2="200" strokeWidth="0.5" />
    <line x1="250" y1="150" x2="320" y2="200" strokeWidth="0.5" />
    <line x1="180" y1="200" x2="250" y2="350" strokeWidth="0.5" />
    <line x1="320" y1="200" x2="250" y2="350" strokeWidth="0.5" />
  </svg>
);

// 3. Searching: Two winding paths meeting at a heart
const BgGraphic3 = () => (
  <svg viewBox="0 0 500 500" className="absolute w-[100%] h-[100%] opacity-15 text-rose-600 fill-none stroke-current stroke-[1.5]">
    {/* Path 1 */}
    <path d="M50,450 Q150,400 150,300 T250,200" strokeDasharray="10,5" />
    {/* Path 2 */}
    <path d="M450,450 Q350,400 350,300 T250,200" strokeDasharray="10,5" />
    
    {/* Destination Heart */}
    <path d="M250,200 m-25,-20 a25,25 0 1,1 50,0 a25,25 0 1,1 -50,0" 
          fill="currentColor" className="opacity-50 animate-bounce" style={{ animationDuration: '3s' }} />
  </svg>
);

// 4. Meeting: Abstract couple / Interlocking hearts
const BgGraphic4 = () => (
  <svg viewBox="0 0 500 500" className="absolute w-[100%] h-[100%] opacity-20 text-rose-700 fill-none stroke-current stroke-2">
     {/* Heart 1 */}
     <path d="M230,250 C180,200 180,100 250,100 C280,100 300,130 300,150" strokeDasharray="5,5"/> 
     
     {/* Heart 2 Interlocking */}
     <path d="M270,250 C320,200 320,100 250,100 C220,100 200,130 200,150" strokeDasharray="5,5" />

     {/* United Heart Shape */}
     <path d="M250,180 C200,180 150,220 150,280 C150,350 250,420 250,420 C250,420 350,350 350,280 C350,220 300,180 250,180 Z" 
           fill="currentColor" className="opacity-10" />
  </svg>
);

const BgGraphicFinal = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
     <div className="absolute w-[800px] h-[800px] bg-gradient-radial from-rose-900/20 via-transparent to-transparent opacity-60" />
     <svg viewBox="0 0 100 100" className="absolute w-full h-full opacity-30 animate-pulse-slow">
       <defs>
         <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
           <stop offset="0%" style={{stopColor:'rgb(225,29,72)', stopOpacity:0.2}} />
           <stop offset="100%" style={{stopColor:'rgb(0,0,0)', stopOpacity:0}} />
         </radialGradient>
       </defs>
       <circle cx="50" cy="50" r="40" fill="url(#grad1)" />
     </svg>
  </div>
);


// --- Data ---
const poemSteps = [
  {
    id: 0,
    lines: [
      "Somewhere at the beginning of time,",
      "I think your heart was a part of mine."
    ],
    buttonText: "To the Journey",
    Graphic: BgGraphic1
  },
  {
    id: 1,
    lines: [
      "Two souls fallen from the same star",
      "found two different people far apart."
    ],
    buttonText: "Follow the Stars",
    Graphic: BgGraphic2
  },
  {
    id: 2,
    lines: [
      "All my life I looked for you",
      "and all yours you've been searching too."
    ],
    buttonText: "Almost There",
    Graphic: BgGraphic3
  },
  {
    id: 3,
    lines: [
      "Today we met on second first time",
      "on the ground instead of the sky."
    ],
    buttonText: "Our Destiny",
    Graphic: BgGraphic4
  },
  {
    id: 4,
    lines: [
      "I didn't know it,",
      "I couldn't see that..."
    ],
    buttonText: "The Revelation",
    Graphic: BgGraphic2
  },
  {
    id: 5,
    isFinal: true,
    lines: [
      "Meeting you was meeting the",
      "Missing part of me"
    ],
    buttonText: "",
    Graphic: BgGraphicFinal
  }
];

const PoemSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle parallax effect
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextStep = () => {
    if (step < poemSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const currentData = poemSteps[step];
  const Graphic = currentData.Graphic;

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Global Background Elements (Persistent) */}
      <GlobalLoveBackground />

      {/* Slide Specific Background Layer (Changes per step) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 transition-opacity duration-1000">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${step}`}
            initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 10, scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            <Graphic />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Name Watermark (On every page) */}
      <div className="absolute top-8 left-0 w-full flex justify-center pointer-events-none z-20 mix-blend-overlay opacity-70">
         <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex items-center gap-4"
         >
           <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-rose-300" />
           <span className="font-cinzel text-xs md:text-sm text-rose-200 tracking-[0.6em] uppercase drop-shadow-[0_0_5px_rgba(225,29,72,0.8)]">
             Aielin
           </span>
           <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-rose-300" />
         </motion.div>
      </div>

      {/* Main Content Card */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
            {currentData.isFinal ? (
                /* FINAL SLIDE LAYOUT */
                <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="relative py-8"
                    >
                        <h1 className="font-cinzel font-bold text-6xl md:text-8xl lg:text-9xl tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-br from-rose-100 via-rose-200 to-rose-400 drop-shadow-[0_0_35px_rgba(225,29,72,0.6)]">
                            AIELIN
                        </h1>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-rose-500/5 blur-3xl -z-10 rounded-full"></div>
                    </motion.div>

                    <div className="mt-16 space-y-6">
                        <p className="font-cinzel text-lg md:text-xl text-rose-200/80 uppercase tracking-[0.2em] font-light">
                            {currentData.lines[0]}
                        </p>
                        <p className="font-vibes text-5xl md:text-8xl text-rose-500 drop-shadow-[0_0_15px_rgba(225,29,72,0.8)] animate-pulse-slow leading-relaxed">
                            {currentData.lines[1]}
                        </p>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 2 }}
                        className="mt-12 flex gap-4 text-rose-400/60"
                    >
                         <Heart size={24} className="fill-current animate-bounce" style={{ animationDuration: '3s' }} />
                    </motion.div>
                </div>
            ) : (
                /* STANDARD SLIDE LAYOUT */
                <div className="space-y-4">
                     <div className="space-y-8">
                        {currentData.lines.map((line, idx) => (
                            <motion.p 
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.3), duration: 1 }}
                                whileHover={{ scale: 1.02, textShadow: "0 0 8px rgba(244,63,94,0.6)" }}
                                className={`text-2xl md:text-5xl leading-tight cursor-default transition-all duration-300 ${
                                    idx % 2 !== 0 
                                    ? 'font-vibes text-rose-300 drop-shadow-md text-4xl md:text-6xl mt-4' 
                                    : 'font-playfair italic text-rose-100/90 font-light tracking-wide'
                                }`}
                            >
                                {line}
                            </motion.p>
                        ))}
                     </div>

                     {/* Heart Divider on Every Page */}
                     <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex items-center justify-center gap-4 py-6 opacity-60"
                     >
                        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
                        <Heart size={16} className="text-rose-400 fill-rose-500/20 animate-pulse" />
                        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
                     </motion.div>

                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                     >
                        <button 
                            onClick={nextStep}
                            className="group relative flex items-center gap-4 px-10 py-4 mx-auto mt-4 bg-transparent border-t border-b border-rose-500/20 text-rose-200/80 hover:text-white transition-all duration-700 hover:border-rose-400/50 hover:tracking-widest"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <span className="font-cinzel text-xs tracking-[0.3em] uppercase relative z-10">
                                {currentData.buttonText}
                            </span>
                            <ChevronRight className="w-3 h-3 text-rose-400 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
                        </button>
                     </motion.div>
                </div>
            )}
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator (Dots) */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center gap-4 z-20">
         {poemSteps.map((s, i) => (
             <div 
                key={i}
                className={`h-1 rounded-full transition-all duration-700 ${
                    i === step ? 'w-12 bg-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.8)]' : 
                    i < step ? 'w-1 bg-rose-800' : 'w-1 bg-rose-900/20'
                }`}
             />
         ))}
      </div>

    </div>
  );
};

export default PoemSection;
