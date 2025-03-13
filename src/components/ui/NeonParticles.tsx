'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NeonParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

export default function NeonParticles({ 
  count = 30, 
  colors = ['neon-blue', 'neon-purple', 'neon-pink', 'neon-green'],
  className = ''
}: NeonParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Fonction pour créer une particule
    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 2;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const colorClass = colors[colorIndex];
      
      particle.className = `absolute rounded-full bg-${colorClass} opacity-0`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.filter = `blur(${Math.random() * 2}px)`;
      
      container.appendChild(particle);
      
      // Animation de la particule
      const duration = 3 + Math.random() * 7;
      const delay = Math.random() * 5;
      
      // Opacité initiale
      setTimeout(() => {
        particle.style.transition = `opacity ${duration}s ease-in-out, transform ${duration}s ease-in-out`;
        particle.style.opacity = `${0.1 + Math.random() * 0.5}`;
        
        // Mouvement aléatoire
        const xMove = (Math.random() - 0.5) * 100;
        const yMove = (Math.random() - 0.5) * 100;
        particle.style.transform = `translate(${xMove}px, ${yMove}px)`;
        
        // Clignotement aléatoire
        setInterval(() => {
          if (Math.random() > 0.9) {
            particle.style.opacity = '0.1';
            setTimeout(() => {
              particle.style.opacity = `${0.1 + Math.random() * 0.5}`;
            }, 100 + Math.random() * 200);
          }
        }, 2000 + Math.random() * 3000);
        
      }, delay * 1000);
      
      return particle;
    };
    
    // Créer les particules
    const particles = Array.from({ length: count }, () => createParticle());
    
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      });
    };
  }, [count, colors]);
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
} 