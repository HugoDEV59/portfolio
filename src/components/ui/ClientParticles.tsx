'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
  className?: string;
  count?: number;
  color?: string;
  seed?: number; // Utiliser une graine fixe pour la génération aléatoire
}

// Fonction de génération pseudo-aléatoire avec graine
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ClientParticles = ({ 
  className = '', 
  count = 20, 
  color = 'bg-neon-purple/40',
  seed = 42 // Valeur par défaut
}: ParticleProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  // Générer les particules de manière déterministe
  const particles = Array.from({ length: count }, (_, i) => {
    const particleSeed = seed + i;
    return {
      id: i,
      x: seededRandom(particleSeed) * 100,
      y: seededRandom(particleSeed + 100) * 100,
      size: 1 + seededRandom(particleSeed + 200) * 4
    };
  });
  
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
            duration: 4 + seededRandom(particle.id + seed) * 6,
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

export default ClientParticles; 