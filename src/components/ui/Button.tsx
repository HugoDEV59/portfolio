'use client';

import { ReactNode, useState } from 'react';
import { motion, MotionProps, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type GlowColor = 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'yellow';

interface ButtonProps extends MotionProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'gradient' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: GlowColor;
  className?: string;
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  intense?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  glowColor = 'blue',
  className = '',
  href,
  isExternal = false,
  onClick,
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'left',
  loading = false,
  intense = false,
  ...motionProps
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Correction des classes dynamiques qui ne fonctionnent pas avec Tailwind
  const getVariantClass = (variant: string, glowColor: GlowColor, intense: boolean) => {
    const intensityClass = intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue';
    
    switch(variant) {
      case 'primary':
        switch(glowColor) {
          case 'blue': return `bg-neon-blue text-dark hover:${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'} font-medium`;
          case 'purple': return `bg-neon-purple text-dark hover:${intense ? 'shadow-neon-purple-lg' : 'shadow-neon-purple'} font-medium`;
          case 'pink': return `bg-neon-pink text-dark hover:${intense ? 'shadow-neon-pink-lg' : 'shadow-neon-pink'} font-medium`;
          case 'green': return `bg-neon-green text-dark hover:${intense ? 'shadow-neon-green-lg' : 'shadow-neon-green'} font-medium`;
          case 'orange': return `bg-neon-orange text-dark hover:${intense ? 'shadow-neon-orange-lg' : 'shadow-neon-orange'} font-medium`;
          case 'yellow': return `bg-neon-yellow text-dark hover:${intense ? 'shadow-neon-yellow-lg' : 'shadow-neon-yellow'} font-medium`;
          default: return `bg-neon-blue text-dark hover:${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'} font-medium`;
        }
      case 'outline':
        switch(glowColor) {
          case 'blue': return `border border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'}`;
          case 'purple': return `border border-neon-purple text-neon-purple hover:bg-neon-purple/10 hover:${intense ? 'shadow-neon-purple-lg' : 'shadow-neon-purple'}`;
          case 'pink': return `border border-neon-pink text-neon-pink hover:bg-neon-pink/10 hover:${intense ? 'shadow-neon-pink-lg' : 'shadow-neon-pink'}`;
          case 'green': return `border border-neon-green text-neon-green hover:bg-neon-green/10 hover:${intense ? 'shadow-neon-green-lg' : 'shadow-neon-green'}`;
          case 'orange': return `border border-neon-orange text-neon-orange hover:bg-neon-orange/10 hover:${intense ? 'shadow-neon-orange-lg' : 'shadow-neon-orange'}`;
          case 'yellow': return `border border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10 hover:${intense ? 'shadow-neon-yellow-lg' : 'shadow-neon-yellow'}`;
          default: return `border border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'}`;
        }
      case 'ghost':
        switch(glowColor) {
          case 'blue': return `text-light hover:bg-neon-blue/10 hover:text-neon-blue`;
          case 'purple': return `text-light hover:bg-neon-purple/10 hover:text-neon-purple`;
          case 'pink': return `text-light hover:bg-neon-pink/10 hover:text-neon-pink`;
          case 'green': return `text-light hover:bg-neon-green/10 hover:text-neon-green`;
          case 'orange': return `text-light hover:bg-neon-orange/10 hover:text-neon-orange`;
          case 'yellow': return `text-light hover:bg-neon-yellow/10 hover:text-neon-yellow`;
          default: return `text-light hover:bg-neon-blue/10 hover:text-neon-blue`;
        }
      case 'gradient':
        switch(glowColor) {
          case 'blue': return `bg-neon-gradient-blue text-dark hover:${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'} font-medium`;
          case 'purple': return `bg-neon-gradient-purple text-dark hover:${intense ? 'shadow-neon-purple-lg' : 'shadow-neon-purple'} font-medium`;
          case 'pink': return `bg-neon-gradient-pink text-dark hover:${intense ? 'shadow-neon-pink-lg' : 'shadow-neon-pink'} font-medium`;
          case 'green': return `bg-neon-gradient-green text-dark hover:${intense ? 'shadow-neon-green-lg' : 'shadow-neon-green'} font-medium`;
          case 'orange': return `bg-neon-gradient-orange text-dark hover:${intense ? 'shadow-neon-orange-lg' : 'shadow-neon-orange'} font-medium`;
          case 'yellow': return `bg-neon-gradient-yellow text-dark hover:${intense ? 'shadow-neon-yellow-lg' : 'shadow-neon-yellow'} font-medium`;
          default: return `bg-neon-gradient-blue text-dark hover:${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'} font-medium`;
        }
      case 'neon':
        switch(glowColor) {
          case 'blue': return `bg-transparent border border-neon-blue text-neon-blue ${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'} neon-button`;
          case 'purple': return `bg-transparent border border-neon-purple text-neon-purple ${intense ? 'shadow-neon-purple-lg' : 'shadow-neon-purple'} neon-button`;
          case 'pink': return `bg-transparent border border-neon-pink text-neon-pink ${intense ? 'shadow-neon-pink-lg' : 'shadow-neon-pink'} neon-button`;
          case 'green': return `bg-transparent border border-neon-green text-neon-green ${intense ? 'shadow-neon-green-lg' : 'shadow-neon-green'} neon-button`;
          case 'orange': return `bg-transparent border border-neon-orange text-neon-orange ${intense ? 'shadow-neon-orange-lg' : 'shadow-neon-orange'} neon-button`;
          case 'yellow': return `bg-transparent border border-neon-yellow text-neon-yellow ${intense ? 'shadow-neon-yellow-lg' : 'shadow-neon-yellow'} neon-button`;
          default: return `bg-transparent border border-neon-blue text-neon-blue ${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'} neon-button`;
        }
      default: return `bg-neon-blue text-dark hover:${intense ? 'shadow-neon-blue-lg' : 'shadow-neon-blue'} font-medium`;
    }
  };

  // Définition des classes en fonction des tailles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  // Classes communes
  const baseClasses = 'rounded-md transition-all duration-300 inline-flex items-center justify-center relative overflow-hidden';
  const disabledClasses = disabled || loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer';

  // Combinaison de toutes les classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${getVariantClass(variant, glowColor, intense)} ${disabledClasses} ${className}`;

  // Animation au survol
  const hoverAnimation = {
    scale: disabled || loading ? 1 : 1.03,
    y: disabled || loading ? 0 : -2,
  };

  // Effet de particules au survol
  const particleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Contenu du bouton
  const buttonContent = (
    <motion.button
      type={type}
      className={buttonClasses}
      whileHover={hoverAnimation}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      disabled={disabled || loading}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...motionProps}
    >
      {/* Effet de lueur au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      
      {/* Effet de particules au survol */}
      <AnimatePresence>
        {isHovered && !disabled && !loading && (
          <>
            <motion.span
              className={`absolute top-0 left-1/4 w-1 h-1 rounded-full bg-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : glowColor === 'green' ? 'neon-green' : glowColor === 'orange' ? 'neon-orange' : 'neon-yellow'}/40`}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -20, opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.span
              className={`absolute top-0 left-2/4 w-1 h-1 rounded-full bg-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : glowColor === 'green' ? 'neon-green' : glowColor === 'orange' ? 'neon-orange' : 'neon-yellow'}/40`}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -15, opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            />
            <motion.span
              className={`absolute top-0 left-3/4 w-1 h-1 rounded-full bg-${glowColor === 'blue' ? 'neon-blue' : glowColor === 'purple' ? 'neon-purple' : glowColor === 'pink' ? 'neon-pink' : glowColor === 'green' ? 'neon-green' : glowColor === 'orange' ? 'neon-orange' : 'neon-yellow'}/40`}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -20, opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Contenu du bouton avec icône et texte */}
      <div className="flex items-center justify-center gap-2 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Chargement...</span>
          </div>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
          </>
        )}
      </div>
    </motion.button>
  );

  // Si un lien est fourni, envelopper le bouton dans un composant Link
  if (href && !disabled && !loading) {
    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
} 