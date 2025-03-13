'use client';

import { ReactNode, useState } from 'react';
import { motion, MotionProps, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type GlowColor = 'blue' | 'purple' | 'pink' | 'green';

interface CardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  href?: string;
  isExternal?: boolean;
  variant?: 'default' | 'elevated' | 'bordered' | 'gradient';
  hoverEffect?: 'lift' | 'glow' | 'border' | 'scale' | 'none';
  interactive?: boolean;
  badge?: string;
  badgeColor?: GlowColor;
}

export default function Card({ 
  children, 
  className = '', 
  glowColor = 'blue',
  href,
  isExternal = false,
  variant = 'default',
  hoverEffect = 'lift',
  interactive = true,
  badge,
  badgeColor = 'blue',
  ...motionProps
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Correction des classes dynamiques qui ne fonctionnent pas avec Tailwind
  const getGlowClass = (glowColor: GlowColor) => {
    switch(glowColor) {
      case 'blue': return 'neon-border hover:shadow-neon-blue';
      case 'purple': return 'neon-border-purple hover:shadow-neon-purple';
      case 'pink': return 'neon-border-pink hover:shadow-neon-pink';
      case 'green': return 'neon-border-green hover:shadow-neon-green';
      default: return 'neon-border hover:shadow-neon-blue';
    }
  };

  const getVariantClass = (variant: string, glowColor: GlowColor) => {
    switch(variant) {
      case 'default': return 'bg-dark/25 backdrop-blur-sm';
      case 'elevated': return 'bg-dark/40 shadow-lg backdrop-blur-md';
      case 'bordered': 
        switch(glowColor) {
          case 'blue': return 'border border-neon-blue/30 backdrop-blur-sm';
          case 'purple': return 'border border-neon-purple/30 backdrop-blur-sm';
          case 'pink': return 'border border-neon-pink/30 backdrop-blur-sm';
          case 'green': return 'border border-neon-green/30 backdrop-blur-sm';
          default: return 'border border-neon-blue/30 backdrop-blur-sm';
        }
      case 'gradient':
        switch(glowColor) {
          case 'blue': return 'bg-gradient-to-br from-dark/60 to-dark/90 border-t border-neon-blue/20 backdrop-blur-md';
          case 'purple': return 'bg-gradient-to-br from-dark/60 to-dark/90 border-t border-neon-purple/20 backdrop-blur-md';
          case 'pink': return 'bg-gradient-to-br from-dark/60 to-dark/90 border-t border-neon-pink/20 backdrop-blur-md';
          case 'green': return 'bg-gradient-to-br from-dark/60 to-dark/90 border-t border-neon-green/20 backdrop-blur-md';
          default: return 'bg-gradient-to-br from-dark/60 to-dark/90 border-t border-neon-blue/20 backdrop-blur-md';
        }
      default: return 'bg-dark/25 backdrop-blur-sm';
    }
  };

  const getBadgeClass = (badgeColor: GlowColor) => {
    switch(badgeColor) {
      case 'blue': return 'bg-neon-blue/90 text-dark';
      case 'purple': return 'bg-neon-purple/90 text-dark';
      case 'pink': return 'bg-neon-pink/90 text-dark';
      case 'green': return 'bg-neon-green/90 text-dark';
      default: return 'bg-neon-blue/90 text-dark';
    }
  };

  // Classes de base
  const baseClasses = 'glassmorphism rounded-lg p-6 transition-all duration-300 relative overflow-hidden group';

  // Combinaison de toutes les classes
  const cardClasses = `${baseClasses} ${getGlowClass(glowColor)} ${getVariantClass(variant, glowColor)} ${className}`;

  // Animation au survol
  const getHoverAnimation = () => {
    if (!interactive) return {};
    
    switch(hoverEffect) {
      case 'lift': return { y: -8, transition: { duration: 0.3 } };
      case 'glow': return { boxShadow: `0 0 20px 2px rgba(var(--${glowColor}-rgb), 0.3)`, transition: { duration: 0.3 } };
      case 'border': return { borderColor: `rgba(var(--${glowColor}-rgb), 0.6)`, transition: { duration: 0.3 } };
      case 'scale': return { scale: 1.02, transition: { duration: 0.3 } };
      case 'none': return {};
      default: return { y: -8, transition: { duration: 0.3 } };
    }
  };

  // Contenu de la carte
  const cardContent = (
    <motion.div
      className={cardClasses}
      whileHover={getHoverAnimation()}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...motionProps}
    >
      {/* Badge (si présent) */}
      {badge && (
        <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg ${getBadgeClass(badgeColor)} z-10`}>
          {badge}
        </div>
      )}
      
      {/* Effet de lueur au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      
      {/* Effet de bordure animée */}
      <div className="absolute inset-0 rounded-lg border border-transparent bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Points lumineux aux coins */}
      <AnimatePresence>
        {isHovered && interactive && (
          <>
            <motion.div 
              className={`absolute top-0 left-0 w-1 h-1 rounded-full bg-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : 'neon-green'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className={`absolute top-0 right-0 w-1 h-1 rounded-full bg-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : 'neon-green'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
            <motion.div 
              className={`absolute bottom-0 left-0 w-1 h-1 rounded-full bg-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : 'neon-green'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.div 
              className={`absolute bottom-0 right-0 w-1 h-1 rounded-full bg-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : 'neon-green'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Contenu principal */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Indicateur de lien (si href est présent) */}
      {href && interactive && (
        <div className={`absolute bottom-3 right-3 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : 'neon-green'}/20`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : 'neon-green'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      )}
    </motion.div>
  );

  // Si un lien est fourni, envelopper la carte dans un composant Link
  if (href) {
    return (
      <Link 
        href={href} 
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
} 