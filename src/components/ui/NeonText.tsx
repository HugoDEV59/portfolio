'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type NeonColor = 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'yellow';

interface NeonTextProps {
  children: React.ReactNode;
  color?: NeonColor;
  className?: string;
  flickerIntensity?: 'low' | 'medium' | 'high';
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
}

export default function NeonText({ 
  children, 
  color = 'blue', 
  className = '', 
  flickerIntensity = 'medium',
  tag = 'span'
}: NeonTextProps) {
  const [isFlickering, setIsFlickering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Fonction pour générer un délai aléatoire basé sur l'intensité
  const getRandomDelay = () => {
    const baseDelay = flickerIntensity === 'high' ? 2000 : 
                     flickerIntensity === 'medium' ? 4000 : 8000;
    return baseDelay + Math.random() * 5000;
  };
  
  // Fonction pour générer une durée aléatoire de clignotement
  const getRandomFlickerDuration = () => {
    return 100 + Math.random() * 200;
  };
  
  useEffect(() => {
    const scheduleNextFlicker = () => {
      const delay = getRandomDelay();
      timeoutRef.current = setTimeout(() => {
        setIsFlickering(true);
        
        const flickerDuration = getRandomFlickerDuration();
        setTimeout(() => {
          setIsFlickering(false);
          scheduleNextFlicker();
        }, flickerDuration);
      }, delay);
    };
    
    scheduleNextFlicker();
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [flickerIntensity]);
  
  const baseClass = `neon-text-${color}`;
  const flickerClass = isFlickering ? 'opacity-30' : '';
  
  const MotionComponent = motion[tag];
  
  return (
    <MotionComponent
      className={`${baseClass} ${flickerClass} ${className} transition-opacity duration-100`}
      animate={{ 
        opacity: isFlickering ? [1, 0.3, 0.8, 0.2, 1] : 1,
        textShadow: isFlickering ? 'none' : undefined
      }}
      transition={{ 
        duration: isFlickering ? 0.2 : 0.1,
        ease: "easeInOut" 
      }}
    >
      {children}
    </MotionComponent>
  );
} 