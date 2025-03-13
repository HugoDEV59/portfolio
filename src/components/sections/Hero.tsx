'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Button from '../ui/Button';
import { FaArrowDown, FaCode, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';

// Enregistrement des plugins GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function Hero() {
  // État pour stocker les dimensions de la fenêtre
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Références pour les animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Valeurs pour les animations parallaxes
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Animation de la souris pour les particules
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  // Effet pour mettre à jour les dimensions de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Effet de suivi de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Animation GSAP pour le texte et les éléments
  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animation du titre avec effet de machine à écrire
    if (headingRef.current) {
      const heading = headingRef.current;
      const originalText = heading.textContent || '';
      
      tl.set(heading, { text: '' })
        .to(heading, { 
          duration: 2, 
          text: originalText, 
          ease: 'none',
        });
    }
    
    // Animation du sous-titre
    if (subheadingRef.current) {
      tl.fromTo(
        subheadingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );
    }
    
    // Animation des boutons CTA
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
        '-=0.3'
      );
    }
    
    // Animation de l'image
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        '-=1'
      );
    }
    
    // Animation de l'indicateur de défilement
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.2'
      )
      .to(
        scrollIndicatorRef.current.querySelector('.scroll-arrow'),
        { y: 10, repeat: -1, yoyo: true, duration: 0.8, ease: 'power1.inOut' }
      );
    }
    
    // Animation des particules
    const particles = document.querySelectorAll('.hero-particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: 'random(-100, 100)',
        x: 'random(-100, 100)',
        opacity: 'random(0.1, 0.6)',
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1,
      });
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  // Variantes d'animation pour les éléments
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  // Génération des particules
  const particles = Array.from({ length: 30 }, (_, i) => {
    const colors = ['neon-blue', 'neon-purple', 'neon-pink', 'neon-green', 'neon-orange', 'neon-yellow'];
    const colorIndex = i % colors.length;
    const size = Math.random() * 10 + 5;
    
    return (
      <div 
        key={`particle-${i}`} 
        className={`hero-particle absolute rounded-full bg-${colors[colorIndex]}/20`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5,
          filter: `blur(${Math.random() * 2}px)`,
        }}
      />
    );
  });
  
  // Transformation de la position de la souris pour l'effet parallaxe
  const imageX = useTransform(smoothMouseX, [0, windowSize.width], [20, -20]);
  const imageY = useTransform(smoothMouseY, [0, windowSize.height], [20, -20]);
  
  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
      style={{ y, opacity }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none neon-particles">
        {particles}
      </div>
      
      {/* Cercles lumineux */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-radial from-neon-blue/15 via-transparent to-transparent blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-radial from-neon-purple/15 via-transparent to-transparent blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-2/3 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-radial from-neon-pink/10 via-transparent to-transparent blur-3xl animate-pulse-slow"></div>
      
      {/* Lignes de grille */}
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`grid-v-${i}`} className="h-full w-px bg-gradient-to-b from-transparent via-neon-blue/10 to-transparent"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-6 pointer-events-none">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`grid-h-${i}`} className="w-full h-px bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent"></div>
        ))}
      </div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texte et CTA */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.h1 
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="text-light">Développeur Web</span>
                <br />
                <span className="neon-text-blue animate-neon-pulse">Créatif</span> & <span className="neon-text-purple animate-neon-pulse-purple">Passionné</span>
              </motion.h1>
              
              <motion.p 
                ref={subheadingRef}
                className="text-xl text-gray-300 max-w-lg"
              >
                Je crée des expériences web <span className="neon-text-green">modernes</span>, <span className="neon-text-pink">interactives</span> et <span className="neon-text-orange">performantes</span> qui transforment vos idées en réalité numérique.
              </motion.p>
            </div>
            
            <motion.div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button 
                variant="neon" 
                size="lg" 
                href="/projects"
                icon={<FaCode />}
                glowColor="blue"
                intense={true}
              >
                Voir mes projets
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                href="/contact"
                glowColor="purple"
                icon={<FaEnvelope />}
              >
                Me contacter
              </Button>
            </motion.div>
            
            {/* Badges de compétences */}
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {[
                { name: 'React', color: 'blue' },
                { name: 'Next.js', color: 'purple' },
                { name: 'TypeScript', color: 'pink' },
                { name: 'Tailwind CSS', color: 'green' },
                { name: 'Node.js', color: 'orange' }
              ].map((skill) => (
                <span 
                  key={skill.name}
                  className={`px-3 py-1 text-sm bg-dark/50 border border-${skill.color === 'blue' ? 'neon-blue' : skill.color === 'purple' ? 'neon-purple' : skill.color === 'pink' ? 'neon-pink' : skill.color === 'green' ? 'neon-green' : 'neon-orange'}/30 rounded-full text-gray-300 hover:border-${skill.color === 'blue' ? 'neon-blue' : skill.color === 'purple' ? 'neon-purple' : skill.color === 'pink' ? 'neon-pink' : skill.color === 'green' ? 'neon-green' : 'neon-orange'} hover:text-${skill.color === 'blue' ? 'neon-blue' : skill.color === 'purple' ? 'neon-purple' : skill.color === 'pink' ? 'neon-pink' : skill.color === 'green' ? 'neon-green' : 'neon-orange'} transition-colors duration-300`}
                >
                  {skill.name}
                </span>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Image/Illustration */}
          <motion.div 
            ref={imageRef}
            className="relative"
            variants={itemVariants}
            style={{
              x: imageX,
              y: imageY,
            }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Cercle décoratif */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-blue/30 animate-spin-slow"></div>
              
              {/* Image avec masque */}
              <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-dark/80 to-darker/80 backdrop-blur-sm border border-neon-blue/20 shadow-neon-blue">
                <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
                <Image
                  src="https://placehold.co/600x600/1a1a2e/e2e2e2?text=Developer"
                  alt="Développeur Web"
                  fill
                  className="object-cover mix-blend-luminosity opacity-80"
                />
                
                {/* Effet de scanline */}
                <div className="absolute inset-0 scanline-text"></div>
              </div>
              
              {/* Points lumineux */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-blue shadow-neon-blue animate-pulse"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple shadow-neon-purple animate-pulse"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-pink shadow-neon-pink animate-pulse"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-green shadow-neon-green animate-pulse"></div>
            </div>
            
            {/* Statistiques flottantes */}
            <motion.div 
              className="absolute -top-4 -right-4 p-3 bg-dark/80 backdrop-blur-sm border border-neon-blue/30 rounded-lg shadow-neon-blue neon-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="text-neon-blue font-mono neon-text">5+ ans</div>
              <div className="text-xs text-gray-400">d'expérience</div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 p-3 bg-dark/80 backdrop-blur-sm border border-neon-purple/30 rounded-lg shadow-neon-purple neon-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              <div className="text-neon-purple font-mono neon-text-purple">50+</div>
              <div className="text-xs text-gray-400">projets réalisés</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Indicateur de défilement */}
      <motion.div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        variants={itemVariants}
      >
        <span className="text-gray-400 text-sm mb-2">Découvrir</span>
        <div className="scroll-arrow w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center pt-2 shadow-neon-blue">
          <motion.div 
            className="w-1 h-1 rounded-full bg-neon-blue shadow-neon-blue"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}