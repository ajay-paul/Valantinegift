import React, { useEffect, useRef } from 'react';
import { Particle } from '../types';

interface CursorTrailProps {
  mousePosition: { x: number; y: number };
}

const CursorTrail: React.FC<CursorTrailProps> = ({ mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Add new particles when mouse moves
    const addParticle = () => {
       const id = Math.random();
       // Colors: Red, Rose, Pink, White
       const colors = ['255, 0, 50', '244, 63, 94', '251, 113, 133', '255, 255, 255'];
       const color = colors[Math.floor(Math.random() * colors.length)];
       
       const particle: Particle = {
         id,
         x: mousePosition.x,
         y: mousePosition.y,
         size: Math.random() * 2 + 0.5,
         life: 1, // 100% life
         maxLife: Math.random() * 40 + 20, // Frames to live
         vx: (Math.random() - 0.5) * 1,
         vy: (Math.random() - 0.5) * 1,
         color: color,
       };
       particlesRef.current.push(particle);
    };

    if (mousePosition.x !== 0 && mousePosition.y !== 0) {
        addParticle();
        addParticle();
        if (Math.random() > 0.5) addParticle();
    }
  }, [mousePosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p, index) => {
        p.life -= 0.015; // Slower decay for smoother trail
        p.x += p.vx;
        p.y += p.vy;

        if (p.life <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
          
          // Add a glow effect
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${p.color}, 0.5)`;
          
          ctx.fill();
          ctx.shadowBlur = 0; // Reset for next draw
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] mix-blend-screen"
    />
  );
};

export default CursorTrail;