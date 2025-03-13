'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub, FaLinkedin, FaTwitter, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import Logo from '../ui/Logo';
import ClientParticles from '../ui/ClientParticles';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  // Animation de parallaxe pour le header
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);

  // Détection du défilement pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Empêcher le défilement du body lorsque le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Liens de navigation
  const navItems = [
    { name: 'Accueil', href: '#hero' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  // Vérifier si un lien est actif
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header 
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500`}
      style={{ 
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
    >
      {/* Effet de bordure animée */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-transparent via-neon-blue to-transparent"
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "linear"
          }}
        />
      </div>

      {/* Fond du header avec glassmorphism */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isScrolled 
          ? 'bg-dark/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`} />

      {/* Remplacer les particules animées */}
      <ClientParticles count={5} color="bg-neon-blue/50" seed={789} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo avec animation */}
          <Link href="/" className="relative z-50 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Logo />
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-neon-blue/0 via-neon-blue/10 to-neon-purple/0 rounded-lg opacity-0 group-hover:opacity-100"
                animate={{ 
                  background: [
                    'radial-gradient(circle, rgba(var(--neon-blue), 0.1) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(var(--neon-purple), 0.1) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(var(--neon-blue), 0.1) 0%, transparent 70%)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                      setIsMobileMenuOpen(false); // Ferme le menu mobile après clic
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Réseaux sociaux desktop avec animations */}
            <div className="flex space-x-3">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue transition-colors relative group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <FaGithub size={18} className="relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-dark/50 rounded-full border border-transparent group-hover:border-neon-blue/30"
                  whileHover={{ boxShadow: '0 0 8px rgba(var(--neon-blue), 0.5)' }}
                />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-neon-purple transition-colors relative group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} className="relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-dark/50 rounded-full border border-transparent group-hover:border-neon-purple/30"
                  whileHover={{ boxShadow: '0 0 8px rgba(var(--neon-purple), 0.5)' }}
                />
              </motion.a>
              
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-neon-pink transition-colors relative group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Twitter"
              >
                <FaTwitter size={18} className="relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-dark/50 rounded-full border border-transparent group-hover:border-neon-pink/30"
                  whileHover={{ boxShadow: '0 0 8px rgba(var(--neon-pink), 0.5)' }}
                />
              </motion.a>
            </div>
          </nav>

          {/* Bouton de menu mobile avec animation */}
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <FaTimes size={24} className="text-neon-blue" />
                  <motion.div 
                    className="absolute -inset-3 rounded-full border border-neon-blue/20"
                    animate={{ 
                      boxShadow: ['0 0 0px rgba(var(--neon-blue), 0)', '0 0 8px rgba(var(--neon-blue), 0.5)', '0 0 0px rgba(var(--neon-blue), 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={24} className="text-gray-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Menu mobile amélioré */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-dark/95 backdrop-blur-lg z-40 flex flex-col md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center justify-center flex-grow pt-20">
              <nav className="flex flex-col items-center space-y-8 mb-12">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item), duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      className={`text-2xl font-medium relative group ${
                        isActive(item.href) 
                          ? 'text-neon-blue' 
                          : 'text-gray-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                        setIsMobileMenuOpen(false); // Ferme le menu mobile après clic
                      }}
                    >
                      {item.name}
                      {isActive(item.href) && (
                        <motion.div 
                          className="absolute -inset-x-4 -inset-y-2 rounded-md border border-neon-blue/20 bg-neon-blue/5 -z-10"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <motion.div 
                        className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent w-full"
                        initial={{ scaleX: isActive(item.href) ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Réseaux sociaux mobile */}
              <motion.div
                className="flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-700 text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-colors relative group"
                  whileHover={{ y: -5, boxShadow: '0 0 15px rgba(var(--neon-blue), 0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-neon-blue/0 group-hover:border-neon-blue/30"
                    whileHover={{ boxShadow: '0 0 15px rgba(var(--neon-blue), 0.3)' }}
                  />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-700 text-gray-400 hover:text-neon-purple hover:border-neon-purple transition-colors relative group"
                  whileHover={{ y: -5, boxShadow: '0 0 15px rgba(var(--neon-purple), 0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-neon-purple/0 group-hover:border-neon-purple/30"
                    whileHover={{ boxShadow: '0 0 15px rgba(var(--neon-purple), 0.3)' }}
                  />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-700 text-gray-400 hover:text-neon-pink hover:border-neon-pink transition-colors relative group"
                  whileHover={{ y: -5, boxShadow: '0 0 15px rgba(var(--neon-pink), 0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-neon-pink/0 group-hover:border-neon-pink/30"
                    whileHover={{ boxShadow: '0 0 15px rgba(var(--neon-pink), 0.3)' }}
                  />
                </motion.a>
              </motion.div>
            </div>

            {/* Effet de grille en arrière-plan */}
            <div className="absolute inset-0 pointer-events-none z-[-1] opacity-20">
              <div className="cyber-grid"></div>
              {/* Particules flottantes */}
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-neon-blue/50"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -Math.random() * 100],
                    x: [0, (Math.random() - 0.5) * 50],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 