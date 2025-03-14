'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, 
  FaHeart, FaArrowUp, FaCode, FaLaptopCode, 
  FaServer, FaMobileAlt, FaMapMarkerAlt, FaPhoneAlt
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import ClientParticles from '../ui/ClientParticles';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  
  // Animation de parallaxe pour le footer
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 1]);

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
    <footer 
      ref={footerRef}
      className="relative z-10 pt-20 pb-8 mt-16 border-t border-gray-800/50 overflow-hidden"
    >
      <ClientParticles count={10} color="bg-neon-blue/30" seed={321} />

      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ligne supérieure animée */}
        <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"
            style={{ width: '200%' }}
            animate={{ 
              x: ['-50%', '0%'],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Cercles lumineux */}
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-radial from-neon-blue/5 via-transparent to-transparent blur-3xl"
          style={{ y: backgroundY, opacity }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-gradient-radial from-neon-purple/5 via-transparent to-transparent blur-3xl"
          style={{ y: backgroundY, opacity }}
        />
        
        {/* Grille cyber en arrière-plan */}
        <motion.div 
          className="absolute inset-0 cyber-grid opacity-5"
          style={{ y: backgroundY }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Grille principale */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Logo et description */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <Link href="/" className="text-2xl font-bold mb-4 inline-block group">
              <span className="font-mono text-gray-400 group-hover:text-gray-300 transition-colors">{'<'}</span>
              <span className="text-neon-blue group-hover:text-neon-blue/80 transition-colors">Hugo</span>
              <span className="text-neon-purple group-hover:text-neon-purple/80 transition-colors">Xdev</span>
              <span className="font-mono text-gray-400 group-hover:text-gray-300 transition-colors">{'/>'}</span>
              <motion.div 
                className="h-0.5 w-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink group-hover:w-full transition-all duration-300"
              />
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
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-all relative group"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <FaGithub size={18} />
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(var(--neon-blue), 0)', '0 0 8px rgba(var(--neon-blue), 0.5)', '0 0 0px rgba(var(--neon-blue), 0)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-400 hover:text-neon-purple hover:border-neon-purple transition-all relative group"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(var(--neon-purple), 0)', '0 0 8px rgba(var(--neon-purple), 0.5)', '0 0 0px rgba(var(--neon-purple), 0)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-400 hover:text-neon-pink hover:border-neon-pink transition-all relative group"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(var(--neon-pink), 0)', '0 0 8px rgba(var(--neon-pink), 0.5)', '0 0 0px rgba(var(--neon-pink), 0)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-light relative inline-block">
              Navigation
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-neon-blue to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/about', label: 'À propos' },
                { href: '/skills', label: 'Compétences' },
                { href: '/projects', label: 'Projets' },
                { href: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-neon-blue transition-colors flex items-center group"
                  >
                    <motion.span 
                      className="w-0 h-0.5 bg-neon-blue mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-light relative inline-block">
              Services
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-neon-purple to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-2">
              {[
                { icon: <FaLaptopCode size={14} />, label: 'Développement Frontend' },
                { icon: <FaServer size={14} />, label: 'Développement Backend' },
                { icon: <FaMobileAlt size={14} />, label: 'Applications Responsive' },
                { icon: <FaCode size={14} />, label: 'Intégration API' }
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group cursor-default">
                    <span className="text-neon-purple/70 mr-2">{service.icon}</span>
                    {service.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-light relative inline-block">
              Contact
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-neon-pink to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:HugoXdev@proton.me" 
                  className="text-gray-400 hover:text-neon-pink transition-colors flex items-center group"
                >
                  <span className="text-neon-pink/70 mr-2"><FaEnvelope size={14} /></span>
                  HugoXdev@proton.me
                  <motion.div 
                    className="h-0.5 w-0 bg-neon-pink/30 ml-0 group-hover:w-2 group-hover:ml-2 transition-all duration-300"
                  />
                </a>
              </li>
              <li>
                <span className="text-gray-400 flex items-center">
                  <span className="text-neon-pink/70 mr-2"><FaPhoneAlt size={14} /></span>
                  んひムの#7095
                </span>
              </li>
              <li>
                <span className="text-gray-400 flex items-center">
                  <span className="text-neon-pink/70 mr-2"><FaMapMarkerAlt size={14} /></span>
                  Dunkerque, France
                </span>
              </li>
            </ul>
            
            {/* Newsletter (optionnel) */}
            <div className="mt-4 pt-4 border-t border-gray-800/50">
              <form className="flex flex-col space-y-2">
                <label htmlFor="newsletter" className="text-sm text-gray-400">Newsletter</label>
                <div className="flex">
                  <input 
                    type="email" 
                    id="newsletter" 
                    placeholder="Votre email" 
                    className="bg-dark/50 border border-gray-700 rounded-l-md px-3 py-2 text-sm flex-grow focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink/30 transition-colors"
                  />
                  <button 
                    type="submit" 
                    className="bg-neon-pink/20 hover:bg-neon-pink/30 border border-neon-pink/50 text-neon-pink rounded-r-md px-3 py-2 text-sm transition-colors"
                  >
                    <HiSparkles size={16} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Séparateur */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent my-8"></div>
        
        {/* Copyright et crédits */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mb-4 md:mb-0 flex items-center">
            <span>&copy; {currentYear} HugoXdev. Tous droits réservés.</span>
          </div>
          
          <div className="flex items-center">
            <span className="flex items-center">
              Créé avec <FaHeart className="text-neon-pink mx-1" size={12} /> et Next.js
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* Bouton "Retour en haut" */}
      <motion.button
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-dark/80 border border-neon-blue/30 text-neon-blue flex items-center justify-center z-50 shadow-lg backdrop-blur-sm"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
          y: isVisible ? 0 : 20
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 15px rgba(var(--neon-blue), 0.5)'
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        aria-label="Retour en haut"
      >
        <FaArrowUp />
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{ 
            boxShadow: ['0 0 0px rgba(var(--neon-blue), 0)', '0 0 10px rgba(var(--neon-blue), 0.3)', '0 0 0px rgba(var(--neon-blue), 0)'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </footer>
  );
}