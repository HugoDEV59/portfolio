'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
  className?: string;
  count?: number;
  color?: string;
}

const AnimatedParticles = ({ className = '', count = 20, color = 'bg-neon-blue/30' }: ParticleProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Générer des particules avec des positions et tailles fixes
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 100), // Position en pourcentage
      y: Math.floor(Math.random() * 100), // Position en pourcentage
      size: 1 + Math.random() * 5 // Taille fixe
    }));
    
    setParticles(newParticles);
  }, [count]);
  
  if (!isMounted) return null;
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div
            className={`absolute w-1 h-1 rounded-full ${color}`}
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedParticles; 