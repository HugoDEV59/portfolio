'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub, FaLinkedin, FaTwitter, FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../ui/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/skills', label: 'Compétences' },
    { href: '/projects', label: 'Projets' },
    { href: '/contact', label: 'Contact' },
  ];

  // Vérifier si un lien est actif
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-dark/80 backdrop-blur-md shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Logo />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={`relative py-2 text-sm font-medium transition-colors ${
                      isActive(link.href) 
                        ? 'text-neon-blue' 
                        : 'text-gray-300 hover:text-neon-blue'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue"
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Réseaux sociaux desktop */}
            <div className="flex space-x-3 border-l border-gray-700 pl-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-neon-purple transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-neon-pink transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </motion.a>
            </div>
          </nav>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-gray-300 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                >
                  <FaTimes size={24} className="text-neon-blue" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-dark/95 backdrop-blur-lg z-40 flex flex-col md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center flex-grow pt-20">
              <nav className="flex flex-col items-center space-y-8 mb-12">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-medium ${
                        isActive(link.href) 
                          ? 'text-neon-blue' 
                          : 'text-gray-300'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Réseaux sociaux mobile */}
              <motion.div
                className="flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-700 text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-700 text-gray-400 hover:text-neon-purple hover:border-neon-purple transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-700 text-gray-400 hover:text-neon-pink hover:border-neon-pink transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                </a>
              </motion.div>
            </div>

            {/* Effet de grille en arrière-plan */}
            <div className="absolute inset-0 pointer-events-none z-[-1] opacity-20">
              <div className="cyber-grid"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 