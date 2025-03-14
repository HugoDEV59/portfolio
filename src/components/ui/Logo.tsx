'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NeonText from './NeonText';

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  // Variantes d'animation pour les caractères
  const letterVariants = {
    initial: { y: 0 },
    hover: (i: number) => ({
      y: [0, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: i * 0.05,
      }
    })
  };

  // Variantes d'animation pour le conteneur
  const containerVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  // Variantes d'animation pour la lueur
  const glowVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Effet de lueur en arrière-plan */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-radial from-neon-blue/20 via-transparent to-transparent blur-xl -z-10"
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />
      
      <div className="text-2xl font-bold flex items-center">
        <motion.span 
          className="font-mono text-gray-400"
          variants={letterVariants}
          custom={0}
        >
          {'<'}
        </motion.span>
        
        <span className="flex">
          {['H', 'u', 'g', 'o'].map((letter, i) => (
            <NeonText 
              key={`Hugo-${i}`}
              color="blue"
              flickerIntensity={i === 1 ? 'medium' : 'low'}
              className="mx-[1px]"
            >
              {letter}
            </NeonText>
          ))}
        </span>
        
        <span className="flex">
          {['X', 'd', 'e', 'v'].map((letter, i) => (
            <NeonText 
              key={`Xdev-${i}`}
              color="purple"
              flickerIntensity={i % 3 === 0 ? 'medium' : 'low'}
              className="mx-[1px]"
            >
              {letter}
            </NeonText>
          ))}
        </span>
        
        <motion.span 
          className="font-mono text-gray-400"
          variants={letterVariants}
          custom={8}
        >
          {'/>'}
        </motion.span>
      </div>
      
      {/* Ligne d'accentuation qui apparaît au survol */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
} 