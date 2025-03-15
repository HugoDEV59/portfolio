'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Button from '../ui/Button';
import { FaArrowDown, FaCode, FaEnvelope, FaRocket } from 'react-icons/fa';
import Image from 'next/image';
import NeonText from '../ui/NeonText';
import NeonParticles from '../ui/NeonParticles';

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
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Valeurs pour les animations parallaxes
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
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
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Animation de la grille cyber en fonction de la position de la souris
      if (gridRef.current) {
        const moveX = (e.clientX - windowSize.width / 2) / 50;
        const moveY = (e.clientY - windowSize.height / 2) / 50;
        gridRef.current.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${-moveX}deg)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, windowSize]);
  
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
      );
    }
    
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
  
  // Transformation de la position de la souris pour l'effet parallaxe
  const imageX = useTransform(smoothMouseX, [0, windowSize.width], [30, -30]);
  const imageY = useTransform(smoothMouseY, [0, windowSize.height], [30, -30]);
  
  // Effet de parallaxe pour les cercles lumineux
  const circle1X = useTransform(smoothMouseX, [0, windowSize.width], [-20, 20]);
  const circle1Y = useTransform(smoothMouseY, [0, windowSize.height], [-20, 20]);
  const circle2X = useTransform(smoothMouseX, [0, windowSize.width], [20, -20]);
  const circle2Y = useTransform(smoothMouseY, [0, windowSize.height], [20, -20]);
  const circle3X = useTransform(smoothMouseX, [0, windowSize.width], [-15, 15]);
  const circle3Y = useTransform(smoothMouseY, [0, windowSize.height], [15, -15]);
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Fond avec dégradé */}
      <div className="absolute inset-0 bg-gradient-radial from-darker via-dark to-black opacity-90"></div>
      
      {/* Grille cyber en perspective */}
      <motion.div 
        ref={gridRef}
        className="absolute inset-0 cyber-grid opacity-20 transition-transform duration-300"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      ></motion.div>
      
      {/* Effet de scanline */}
      <div className="absolute inset-0 scanline-effect opacity-10 pointer-events-none"></div>
      
      {/* Cercles lumineux avec effet de parallaxe */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-radial from-neon-blue/20 via-transparent to-transparent blur-[100px]"
        style={{ x: circle1X, y: circle1Y }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] rounded-full bg-gradient-radial from-neon-purple/20 via-transparent to-transparent blur-[100px]"
        style={{ x: circle2X, y: circle2Y }}
      ></motion.div>
      <motion.div 
        className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-radial from-neon-pink/15 via-transparent to-transparent blur-[100px]"
        style={{ x: circle3X, y: circle3Y }}
      ></motion.div>
      
      {/* Particules néon flottantes */}
      <NeonParticles count={40} colors={['neon-blue', 'neon-purple', 'neon-pink', 'neon-green']} />
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Colonne de gauche - Texte */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.h1 
                ref={headingRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight glassmorphism p-6 rounded-xl border border-gray-700/50 shadow-lg"
              >
                <span className="text-light">Développeur Web </span>
                <br/>
                <span className="mr-2 text-neon-blue"><NeonText color="blue" flickerIntensity="low">Créatif</NeonText></span> &   
                <span className="ml-2 text-neon-purple"><NeonText color="purple" flickerIntensity="medium"> Passionné</NeonText></span>
              </motion.h1>
              
              <motion.p 
                ref={subheadingRef}
                className="text-xl md:text-2xl text-gray-300 max-w-lg glassmorphism p-4 rounded-xl border border-gray-700/50"
              >
                Je crée des expériences web <span><NeonText color="pink">modernes</NeonText></span>, 
                <span className="mx-1"><NeonText color="green">interactives</NeonText></span> et 
                <span className="ml-1"><NeonText color="orange">performantes</NeonText></span>
              </motion.p>
            </div>
            
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
              ].map((skill, index) => (
                <motion.span 
                  key={skill.name}
                  className={`px-3 py-1 text-sm bg-${skill.color === 'blue' ? 'neon-blue' : skill.color === 'purple' ? 'neon-purple' : skill.color === 'pink' ? 'neon-pink' : skill.color === 'green' ? 'neon-green' : 'neon-orange'}/10 border border-${skill.color === 'blue' ? 'neon-blue' : skill.color === 'purple' ? 'neon-purple' : skill.color === 'pink' ? 'neon-pink' : skill.color === 'green' ? 'neon-green' : 'neon-orange'}/30 rounded-full text-${skill.color === 'blue' ? 'neon-blue' : skill.color === 'purple' ? 'neon-purple' : skill.color === 'pink' ? 'neon-pink' : skill.color === 'green' ? 'neon-green' : 'neon-orange'} hover:bg-${skill.color === 'blue' ? 'neon-blue' : skill.color === 'purple' ? 'neon-purple' : skill.color === 'pink' ? 'neon-pink' : skill.color === 'green' ? 'neon-green' : 'neon-orange'}/20 transition-colors duration-300`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Boutons CTA */}
            <motion.div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button 
                variant="neon" 
                size="lg" 
                href="#projects"
                icon={<FaCode />}
                glowColor="blue"
                intense={true}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                Voir mes projets
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                href="#contact"
                glowColor="purple"
                icon={<FaEnvelope />}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                Me contacter
              </Button>
            </motion.div>
            
            {/* Statistiques */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8 max-w-[90%]"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="glassmorphism p-4 rounded-lg border border-neon-blue/20 text-center">
                <div className="text-3xl font-bold text-neon-blue mb-1">5+</div>
                <div className="text-sm text-gray-400">Années d'expérience</div>
              </div>
              
              <div className="glassmorphism p-4 rounded-lg border border-neon-purple/20 text-center">
                <div className="text-3xl font-bold text-neon-purple mb-1">50+</div>
                <div className="text-sm text-gray-400">Projets réalisés</div>
              </div>
              
              <div className="glassmorphism p-4 rounded-lg border border-neon-green/20 text-center sm:col-span-1 col-span-2">
                <div className="text-3xl font-bold text-neon-green mb-1">100%</div>
                <div className="text-sm text-gray-400">Satisfaction client</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Colonne de droite - Image */}
          <motion.div 
            ref={imageRef}
            className="relative"
            variants={itemVariants}
            style={{ x: imageX, y: imageY }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Cercle décoratif */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-blue/30 animate-spin-slow"></div>
              
              {/* Image avec masque */}
              <div className="absolute inset-4 rounded-full overflow-hidden glassmorphism border border-neon-blue/20 shadow-lg shadow-neon-blue/20">
                <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
                <Image
                  src="/images/0_0_1.png"
                  alt="Développeur Web"
                  fill
                  className="object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                />
                
                {/* Effet de scanline */}
                <div className="absolute inset-0 scanline-effect opacity-30"></div>
                
                {/* Effet de glitch */}
                <div className="absolute inset-0 glitch-effect opacity-10"></div>
                
                {/* Effet de scan */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/10 to-transparent animate-scan"></div>
              </div>
              
              {/* Points lumineux */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-blue shadow-lg shadow-neon-blue animate-pulse"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple shadow-lg shadow-neon-purple animate-pulse"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-pink shadow-lg shadow-neon-pink animate-pulse"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-green shadow-lg shadow-neon-green animate-pulse"></div>
              
              {/* Lignes de connexion */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                <line x1="100" y1="0" x2="100" y2="20" stroke="rgba(var(--neon-blue), 0.5)" strokeWidth="1" />
                <line x1="100" y1="180" x2="100" y2="200" stroke="rgba(var(--neon-purple), 0.5)" strokeWidth="1" />
                <line x1="0" y1="100" x2="20" y2="100" stroke="rgba(var(--neon-pink), 0.5)" strokeWidth="1" />
                <line x1="180" y1="100" x2="200" y2="100" stroke="rgba(var(--neon-green), 0.5)" strokeWidth="1" />
              </svg>
              
              {/* Cercles concentriques */}
              <div className="absolute inset-0 rounded-full border border-neon-blue/10"></div>
              <div className="absolute inset-[10px] rounded-full border border-neon-purple/10"></div>
              <div className="absolute inset-[20px] rounded-full border border-neon-pink/10"></div>
            </div>
            
            {/* Éléments flottants */}
            <motion.div 
              className="absolute -top-10 -right-10 p-4 glassmorphism rounded-lg border border-neon-blue/20 shadow-lg shadow-neon-blue/10 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <FaRocket className="text-neon-blue text-xl" />
              <div>
                <div className="text-sm font-semibold">Disponible pour</div>
                <div className="text-xs text-neon-blue">Nouveaux projets</div>
              </div>
            </motion.div>
            
            {/* Code décoratif */}
            <motion.div 
              className="absolute -bottom-10 -left-10 p-3 glassmorphism rounded-lg border border-neon-green/20 shadow-lg shadow-neon-green/10 max-w-[200px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              <pre className="text-xs font-mono">
                <span className="text-neon-purple">const</span> <span className="text-neon-green">developer</span> = {"{"}
                <br />  <span className="text-neon-blue">skills</span>: [<span className="text-neon-orange">'React'</span>, ...],
                <br />  <span className="text-neon-blue">passion</span>: <span className="text-neon-orange">'Unlimited'</span>
                <br />{"}"}
              </pre>
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
        <div className="w-8 h-12 rounded-full border border-gray-500 flex justify-center pt-2">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-neon-blue"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}