'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, 
  FaHeart, FaArrowUp, FaCode, FaLaptopCode, 
  FaServer, FaMobileAlt 
} from 'react-icons/fa';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  // Contrôle de la visibilité du bouton "retour en haut"
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation pour les éléments du footer
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="relative z-10 pt-16 pb-8 mt-16 border-t border-gray-800 overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-radial from-neon-blue/5 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-gradient-radial from-neon-purple/5 via-transparent to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Grille principale */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Logo et description */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <Link href="/" className="text-2xl font-bold mb-4 inline-block">
              <span className="font-mono text-gray-400">{'<'}</span>
              <span className="text-neon-blue">Dev</span>
              <span className="text-neon-purple">Portfolio</span>
              <span className="font-mono text-gray-400">{'/>'}</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Portfolio de développeur web spécialisé dans la création d'expériences web modernes, 
              interactives et performantes.
            </p>
            <div className="flex space-x-3 mt-2">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-400 hover:text-neon-purple hover:border-neon-purple transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin size={18} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-400 hover:text-neon-pink hover:border-neon-pink transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter size={18} />
              </motion.a>
              <motion.a
                href="mailto:contact@votredomaine.com"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-400 hover:text-neon-green hover:border-neon-green transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEnvelope size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-light">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-neon-blue transition-all flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-neon-blue group-hover:w-3 transition-all duration-300"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-neon-blue transition-all flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-neon-blue group-hover:w-3 transition-all duration-300"></span>
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-gray-400 hover:text-neon-blue transition-all flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-neon-blue group-hover:w-3 transition-all duration-300"></span>
                  Compétences
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-neon-blue transition-all flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-neon-blue group-hover:w-3 transition-all duration-300"></span>
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-neon-blue transition-all flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-neon-blue group-hover:w-3 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-light">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 flex items-center gap-2">
                <FaCode className="text-neon-blue" size={14} />
                <span>Développement Frontend</span>
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <FaServer className="text-neon-purple" size={14} />
                <span>Développement Backend</span>
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <FaLaptopCode className="text-neon-pink" size={14} />
                <span>Architecture Web</span>
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <FaMobileAlt className="text-neon-green" size={14} />
                <span>Responsive Design</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-light">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@votredomaine.com" className="text-gray-400 hover:text-neon-blue transition-all">
                  contact@votredomaine.com
                </a>
              </li>
              <li>
                <a href="tel:+33612345678" className="text-gray-400 hover:text-neon-blue transition-all">
                  +33 6 12 34 56 78
                </a>
              </li>
              <li className="text-gray-400">
                Paris, France
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/contact" className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-all group">
                <span>Prendre rendez-vous</span>
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Séparateur */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>

        {/* Copyright et mentions légales */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="mb-4 md:mb-0">
            <p>
              © {currentYear} DevPortfolio. Tous droits réservés. Créé avec{' '}
              <FaHeart className="inline text-neon-pink mx-1" /> et Next.js
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/mentions-legales" className="hover:text-neon-blue transition-all">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-neon-blue transition-all">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-dark/80 border border-neon-blue/50 text-neon-blue flex items-center justify-center shadow-lg backdrop-blur-sm z-50 transition-all ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ y: -5, boxShadow: '0 0 15px rgba(0, 243, 255, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Retour en haut"
      >
        <FaArrowUp size={20} />
      </motion.button>
    </footer>
  );
} 