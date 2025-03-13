'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { name: 'Accueil', href: '/', icon: <FaHome /> },
  { name: 'À propos', href: '/about', icon: <FaUser /> },
  { name: 'Compétences', href: '/skills', icon: <FaCode /> },
  { name: 'Projets', href: '/projects', icon: <FaBriefcase /> },
  { name: 'Contact', href: '/contact', icon: <FaEnvelope /> },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('/');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleRouteChange = () => {
      setActiveItem(window.location.pathname);
    };

    // Set initial active item
    setActiveItem(window.location.pathname);

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [scrolled]);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 glassmorphism' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div 
              className="text-2xl font-bold neon-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-mono">{'<'}</span>
              <span className="text-neon-blue">Dev</span>
              <span className="text-neon-purple">Portfolio</span>
              <span className="font-mono">{'/>'}</span>
            </motion.div>
          </Link>

          {/* Navigation principale */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className={`flex items-center space-x-1 py-2 px-1 relative ${
                    activeItem === item.href ? 'neon-text' : 'hover:text-neon-blue transition-colors'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  
                  {/* Indicateur actif */}
                  {activeItem === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue"
                      layoutId="navbar-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Menu mobile */}
          <div className="md:hidden">
            <MobileMenu navItems={navItems} activeItem={activeItem} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function MobileMenu({ navItems, activeItem }: { navItems: typeof navItems; activeItem: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton du menu */}
      <motion.button
        className="p-2 neon-border rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 h-0.5 bg-neon-blue mb-1.5"></div>
        <div className="w-6 h-0.5 bg-neon-purple mb-1.5"></div>
        <div className="w-6 h-0.5 bg-neon-pink"></div>
      </motion.button>

      {/* Menu déroulant */}
      {isOpen && (
        <motion.div
          className="absolute top-full right-0 mt-2 mr-4 p-4 rounded-lg glassmorphism neon-border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                <motion.div
                  className={`flex items-center space-x-2 py-2 px-3 rounded-md ${
                    activeItem === item.href
                      ? 'bg-dark neon-text'
                      : 'hover:bg-dark/50 transition-colors'
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
} 