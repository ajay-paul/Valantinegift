export interface Point {
  x: number;
  y: number;
}

export interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  twinkleSpeed: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  color: string;
}

export interface BurstHeart {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  scale: number;
  life: number;
  text?: string;
}

export interface GameTarget {
  id: number;
  x: number;
  y: number;
  isCollected: boolean;
  scale: number;
}