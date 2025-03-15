'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, 
  FaHeart, FaArrowUp, FaCode, FaLaptopCode, 
  FaServer, FaMobileAlt, FaMapMarkerAlt, FaPhoneAlt, FaLock,
  FaReact, FaNodeJs, FaDatabase, FaJs, FaHtml5, FaCss3Alt,
  FaGamepad, FaLaughSquint, FaRegSurprise, FaRegGrinSquintTears
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import ClientParticles from '../ui/ClientParticles';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [easterEggStage, setEasterEggStage] = useState(0);
  const [konami, setKonami] = useState<string[]>([]);
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

  // Compteur de visites
  useEffect(() => {
    // Vérifier si c'est une nouvelle visite
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
      // Stocker la date de visite
      localStorage.setItem('lastVisit', today);
      
      // Incrémenter le compteur dans localStorage
      const currentCount = parseInt(localStorage.getItem('visitCount') || '0');
      localStorage.setItem('visitCount', (currentCount + 1).toString());
      
      // Envoyer l'information au serveur (simulation)
      console.log('Nouvelle visite enregistrée');
    }
    
    // Récupérer le compteur
    const count = parseInt(localStorage.getItem('visitCount') || '0');
    setVisitCount(count);
  }, []);

  // Easter Egg - Konami Code
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ajouter la touche pressée à l'historique
      const updatedKonami = [...konami, e.key];
      
      // Ne garder que les dernières touches (max longueur du code)
      if (updatedKonami.length > konamiCode.length) {
        updatedKonami.shift();
      }
      
      setKonami(updatedKonami);
      
      // Vérifier si le code est correct
      const isKonamiCode = updatedKonami.join(',') === konamiCode.join(',');
      
      if (isKonamiCode) {
        setEasterEggActive(true);
        setEasterEggStage(1);
        
        // Désactiver après 10 secondes
        setTimeout(() => {
          setEasterEggActive(false);
          setEasterEggStage(0);
        }, 10000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

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

  // Données pour la timeline des technologies
  const techTimeline = [
    { year: 2019, icon: <FaHtml5 />, name: 'HTML/CSS', color: 'neon-orange' },
    { year: 2020, icon: <FaJs />, name: 'JavaScript', color: 'neon-yellow' },
    { year: 2021, icon: <FaReact />, name: 'React', color: 'neon-blue' },
    { year: 2022, icon: <FaNodeJs />, name: 'Node.js', color: 'neon-green' },
    { year: 2023, icon: <FaDatabase />, name: 'MongoDB', color: 'neon-purple' }
  ];

  // Fonction pour formater le nombre de visites
  const formatVisitCount = (count: number): string[] => {
    return count.toString().padStart(4, '0').split('');
  };

  // Fonction pour activer l'easter egg au clic
  const activateEasterEgg = () => {
    if (!easterEggActive) {
      setEasterEggActive(true);
      setEasterEggStage(prev => (prev + 1) % 4);
    } else {
      setEasterEggStage(prev => (prev + 1) % 4);
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
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
              Site Web/Portfolio de Hugo, développeur web spécialisé dans la création d'expériences web modernes, 
              interactives et performantes.
            </p>
            
            <div className="flex space-x-3 mt-2">
              {/* GitHub - Désactivé temporairement */}
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-500 relative group cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                aria-label="GitHub (temporairement indisponible)"
              >
                <div className="absolute inset-0 backdrop-blur-sm bg-dark/70 rounded-full z-10"></div>
                <FaGithub size={18} className="relative z-20 opacity-50" />
                <FaLock size={10} className="absolute bottom-0 right-0 text-gray-400 z-30 bg-dark/80 rounded-full p-0.5" />
                <div className="absolute inset-0 bg-dark/50 rounded-full"></div>
                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 bg-dark/90 text-gray-300 text-xs py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 border border-gray-700/50 backdrop-blur-sm">
                  Réseau social en cours de mise à jour, bientôt disponible
                </div>
              </motion.div>
              
              {/* LinkedIn - Désactivé temporairement */}
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-500 relative group cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                aria-label="LinkedIn (temporairement indisponible)"
              >
                <div className="absolute inset-0 backdrop-blur-sm bg-dark/70 rounded-full z-10"></div>
                <FaLinkedin size={18} className="relative z-20 opacity-50" />
                <FaLock size={10} className="absolute bottom-0 right-0 text-gray-400 z-30 bg-dark/80 rounded-full p-0.5" />
                <div className="absolute inset-0 bg-dark/50 rounded-full"></div>
                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 bg-dark/90 text-gray-300 text-xs py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 border border-gray-700/50 backdrop-blur-sm">
                  Réseau social en cours de mise à jour, bientôt disponible
                </div>
              </motion.div>
              
              {/* Twitter - Désactivé temporairement */}
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center bg-dark/50 border border-gray-700 text-gray-500 relative group cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                aria-label="Twitter (temporairement indisponible)"
              >
                <div className="absolute inset-0 backdrop-blur-sm bg-dark/70 rounded-full z-10"></div>
                <FaTwitter size={18} className="relative z-20 opacity-50" />
                <FaLock size={10} className="absolute bottom-0 right-0 text-gray-400 z-30 bg-dark/80 rounded-full p-0.5" />
                <div className="absolute inset-0 bg-dark/50 rounded-full"></div>
                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 bg-dark/90 text-gray-300 text-xs py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 border border-gray-700/50 backdrop-blur-sm">
                  Réseau social en cours de mise à jour, bientôt disponible
                </div>
              </motion.div>
            </div>
            
            {/* Disponibilité - Déplacé ici */}
            <motion.div 
              className="mt-6 pt-4 border-t border-gray-800/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-3">
                <div className="relative mr-3">
                  <div className="w-3 h-3 bg-neon-green rounded-full"></div>
                  <motion.div 
                    className="absolute inset-0 bg-neon-green rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-neon-green text-sm font-medium">Disponible pour nouveaux projets</span>
              </div>
              <div className="glassmorphism p-3 rounded-lg border border-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Charge de travail actuelle</span>
                  <span className="text-xs text-neon-blue">35%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "35%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Services */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-light relative inline-block">
              Services
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-green"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group cursor-default">
                  <span className="text-neon-purple/70 mr-2"><FaLaptopCode size={14} /></span>
                  Développement Frontend
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-neon-pink transition-colors flex items-center group cursor-default">
                  <span className="text-neon-pink/70 mr-2"><FaServer size={14} /></span>
                  Développement Backend
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-neon-green transition-colors flex items-center group cursor-default">
                  <span className="text-neon-green/70 mr-2"><FaMobileAlt size={14} /></span>
                  Applications Responsive
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-neon-orange transition-colors flex items-center group cursor-default">
                  <span className="text-neon-orange/70 mr-2"><FaCode size={14} /></span>
                  Intégration API
                </span>
              </li>
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
            {/* Easter Egg Trigger */}
            <motion.div 
              className="ml-2 cursor-pointer opacity-30 hover:opacity-60 transition-opacity"
              onClick={activateEasterEgg}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGamepad size={12} className="text-gray-500" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Easter Egg Content */}
        {easterEggActive && (
          <motion.div 
            className="mt-6 p-4 rounded-lg border border-gray-800/50 glassmorphism text-center relative overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            {easterEggStage === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-neon-blue font-mono text-sm mb-2">Félicitations ! Vous avez trouvé l'easter egg !</div>
                <div className="text-gray-400 text-xs">Cliquez à nouveau sur l'icône pour continuer...</div>
              </motion.div>
            )}
            
            {easterEggStage === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-2"
              >
                <div className="text-neon-purple font-mono text-sm mb-3">Saviez-vous que...</div>
                <div className="text-gray-300 text-sm mb-3">
                  Pendant que vous lisez ceci, environ 6 000 tweets ont été publiés, 
                  800 photos Instagram partagées, et un développeur quelque part a 
                  probablement oublié un point-virgule.
                </div>
                <div className="flex justify-center">
                  <FaLaughSquint className="text-neon-yellow" size={24} />
                </div>
              </motion.div>
            )}
            
            {easterEggStage === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-2"
              >
                <div className="text-neon-green font-mono text-sm mb-3">Message secret :</div>
                <div className="text-gray-300 text-sm mb-3 font-mono">
                  01001100 01100101 00100000 01100011 01101111 01100100 01100101 00100000 
                  01100011 00100111 01100101 01110011 01110100 00100000 01101100 01100001 00100000 
                  01110110 01101001 01100101
                </div>
                <div className="text-neon-pink text-xs mt-2">(Indice : c'est du binaire pour "Le code c'est la vie")</div>
                <div className="flex justify-center mt-2">
                  <FaRegSurprise className="text-neon-green" size={24} />
                </div>
              </motion.div>
            )}
            
            {easterEggStage === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-2"
              >
                <div className="text-neon-orange font-mono text-sm mb-3">Blague de développeur :</div>
                <div className="text-gray-300 text-sm mb-3">
                  Pourquoi les développeurs préfèrent-ils le noir ? <br/>
                  <span className="text-neon-blue mt-2 inline-block">Parce qu'ils n'aiment pas les classes !</span>
                </div>
                <div className="flex justify-center">
                  <FaRegGrinSquintTears className="text-neon-orange" size={24} />
                </div>
                <div className="text-gray-500 text-xs mt-3">
                  PS: Essayez le code Konami pour une autre surprise ! <br/>
                  (↑↑↓↓←→←→BA)
                </div>
              </motion.div>
            )}
            
            {/* Particules pour l'easter egg */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full bg-neon-${
                    ['blue', 'purple', 'pink', 'green', 'yellow', 'orange'][i % 6]
                  }`}
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    opacity: 0
                  }}
                  animate={{ 
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    opacity: [0, 1, 0],
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
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