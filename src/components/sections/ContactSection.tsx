'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card from '@/components/ui/Card';
import { 
  FaEnvelope, FaDiscord, FaUserShield, FaCalendarAlt
} from 'react-icons/fa';
import ContactForm, { NetlifyFormDetection } from '@/components/ui/ContactForm';
import ClientParticles from '../ui/ClientParticles';

export default function ContactSection() {
  // Référence pour l'animation basée sur le scroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Script pour Netlify Forms
  useEffect(() => {
    // Fonction pour s'assurer que Netlify détecte correctement le formulaire
    const setupNetlifyForm = () => {
      if (typeof window !== 'undefined') {
        // Force la détection du formulaire par Netlify
        const form = document.querySelector('form[name="contact"]');
        if (form) {
          console.log('Formulaire de contact détecté, configuration pour Netlify...');
          
          // S'assurer que tous les attributs nécessaires sont présents
          form.setAttribute('data-netlify', 'true');
          form.setAttribute('data-netlify-honeypot', 'bot-field');
          
          // Vérifier que le champ form-name est présent
          let formNameInput = form.querySelector('input[name="form-name"]');
          if (!formNameInput) {
            formNameInput = document.createElement('input');
            formNameInput.setAttribute('type', 'hidden');
            formNameInput.setAttribute('name', 'form-name');
            formNameInput.setAttribute('value', 'contact');
            form.prepend(formNameInput);
          }
        }
      }
    };

    // Exécuter après le rendu complet
    setTimeout(setupNetlifyForm, 1000);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section 
      id="contact"
      className="py-28 px-4 relative overflow-hidden" 
      ref={containerRef}
      aria-labelledby="contact-heading"
    >
      {/* Formulaire caché pour Netlify */}
      <NetlifyFormDetection />
      
      {/* Fond dynamique */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark to-dark/90"
          style={{ opacity }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_70%)]"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Particules flottantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-neon-purple/30 rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 
            id="contact-heading" 
            className="text-4xl md:text-5xl font-bold mb-5 relative inline-block"
          >
            Me <span className="text-neon-purple">Contacter</span>
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </h2>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Vous avez un projet ambitieux ou une opportunité de collaboration ? Je suis à votre écoute.
          </p>
          
          {/* Badges de disponibilité */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Disponible pour de nouveaux projets
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FaCalendarAlt className="mr-2 text-xs" />
              Réponse sous 24h
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Formulaire de contact - plus large */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3"
            style={{ scale }}
          >
            <Card 
              glowColor="purple" 
              className="h-full backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-2xl relative overflow-hidden"
            >
              {/* Effet de scanline subtil */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-scanline opacity-5"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-purple/5 to-transparent opacity-30"></div>
                
                {/* Effet de particules interactives */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 15 }).map((_, i) => {
                    const size = Math.random() * 3 + 1;
                    const x = Math.random() * 100;
                    const y = Math.random() * 100;
                    const duration = Math.random() * 15 + 10;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neon-purple/40 rounded-full"
                        style={{
                          width: size,
                          height: size,
                          left: `${x}%`,
                          top: `${y}%`,
                        }}
                        animate={{
                          x: [0, Math.random() * 100 - 50],
                          y: [0, Math.random() * 100 - 50],
                          opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                          duration,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              
              <div className="relative z-10 p-8">
                <h3 className="text-2xl font-semibold mb-8 flex items-center">
                  <span className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center mr-3 relative">
                    <FaEnvelope className="text-neon-purple" aria-hidden="true" />
                    <span className="absolute inset-0 rounded-full border border-neon-purple/50 animate-ping-slow opacity-75"></span>
                  </span>
                  Envoyez-moi un message
                </h3>
              </div>
              
              {/* Intégration du composant ContactForm */}
              <div className="px-8 pb-8">
                <ContactForm />
              </div>
            </Card>
          </motion.div>
          
          {/* Colonne d'informations de contact */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Bloc Email */}
            <motion.div variants={itemVariants} whileHover="hover" initial="rest" animate="rest">
              <Card 
                glowColor="blue" 
                className="flex items-start gap-5 backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-dark/80 border border-blue-500/30 text-blue-400 shadow-inner">
                  <FaEnvelope size={22} aria-hidden="true" />
                  <motion.div 
                    className="absolute inset-0 bg-blue-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contactez-moi par Email</h3>
                  <p className="text-gray-300">HugoXdev@proton.me</p>
                  <a 
                    href="mailto:HugoXdev@proton.me" 
                    className="text-blue-400 hover:text-blue-300 mt-2 inline-flex items-center gap-1 font-medium group"
                    aria-label="M'envoyer un email à HugoXdev@proton.me"
                  >
                    M'envoyer un email
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transform group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* Bloc Discord */}
            <motion.div variants={itemVariants} whileHover="hover" initial="rest" animate="rest">
              <Card 
                glowColor="pink" 
                className="flex items-start gap-5 backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-xl hover:shadow-indigo-900/20 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-dark/80 border border-pink-500/30 text-pink-400 shadow-inner relative overflow-hidden">
                  <FaDiscord size={22} aria-hidden="true" />
                  <motion.div 
                    className="absolute inset-0 bg-pink-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contactez-moi sur Discord</h3>
                  <p className="text-gray-300">んひムの#7095</p>
                  <p className="text-gray-400 text-sm mt-2">
                    N'hésitez pas à m'ajouter pour discuter de vos projets !
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Engagement de réponse */}
            <motion.div variants={itemVariants} whileHover="hover" initial="rest" animate="rest">
              <Card 
                glowColor="orange" 
                className="text-center p-8 backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-xl hover:shadow-orange-900/20 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 mx-auto flex items-center justify-center mb-4 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-amber-400"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Engagement de Réponse</h3>
                <p className="text-gray-300">
                  Je m'engage à répondre à toutes les demandes professionnelles dans un délai de 24 heures ouvrées. Vous pouvez me contacter par email ou Discord pour toute demande de projet.
                </p>
              </Card>
            </motion.div>

            {/* Sécurité des données */}
            <motion.div variants={itemVariants} whileHover="hover" initial="rest" animate="rest">
              <Card 
                glowColor="blue" 
                className="flex items-start gap-5 backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-dark/80 border border-blue-500/30 text-blue-400 shadow-inner">
                  <FaUserShield size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sécurité des données</h3>
                  <p className="text-gray-300 text-sm">
                    Toutes vos informations sont chiffrées et sécurisées. Je respecte le RGPD et ne partage jamais vos données avec des tiers.
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Remplacer les particules animées par notre composant client-only */}
      <ClientParticles count={15} color="bg-neon-purple/40" seed={123} />
      <ClientParticles count={20} color="bg-neon-purple/30" seed={456} />
    </section>
  );
}