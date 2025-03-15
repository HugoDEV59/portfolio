'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NeonText from '../ui/NeonText';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';

// Projets avec des images plus réalistes et des descriptions détaillées
const projects = [
  {
    id: 1,
    title: 'Nexus Dashboard',
    description: 'Tableau de bord analytique avec visualisations de données en temps réel, authentification multi-facteurs et rapports personnalisables.',
    longDescription: 'Cette application offre une vue complète des métriques d\'entreprise avec des graphiques interactifs et des alertes intelligentes. L\'interface utilise un design adaptatif pour tous les appareils.',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    image: '/images/projects/project1.jpg',
    demoLink: 'https://nexus-dashboard.example.com',
    githubLink: 'https://github.com/yourusername/nexus-dashboard',
    isPrivate: false,
    color: 'blue',
    featured: true
  },
  {
    id: 2,
    title: 'Quantum E-commerce',
    description: 'Plateforme e-commerce complète avec panier, paiement sécurisé via Stripe et gestion des stocks en temps réel.',
    longDescription: 'Solution e-commerce complète avec un système de recommandation basé sur l\'IA, une gestion des stocks optimisée et une interface d\'administration puissante pour les vendeurs.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    image: '/images/projects/project2.jpg',
    demoLink: 'https://quantum-shop.example.com',
    githubLink: 'https://github.com/yourusername/quantum-ecommerce',
    isPrivate: true,
    color: 'purple',
    featured: true
  },
  {
    id: 3,
    title: 'Nebula Social',
    description: 'Réseau social moderne avec messagerie en temps réel, partage de médias et système de notifications avancé.',
    longDescription: 'Application de réseau social avec des fonctionnalités de chat en temps réel, partage de médias, et un système de notifications personnalisables. Optimisée pour les performances mobiles.',
    tags: ['React Native', 'Firebase', 'GraphQL', 'WebSockets'],
    image: '/images/projects/project3.jpg',
    demoLink: 'https://nebula-social.example.com',
    githubLink: 'https://github.com/yourusername/nebula-social',
    isPrivate: false,
    color: 'pink',
    featured: false
  },
  {
    id: 4,
    title: 'Chronos Booking',
    description: 'Système de réservation avec calendrier interactif, rappels automatiques et intégration de paiement.',
    longDescription: 'Application permettant aux entreprises de gérer leurs réservations avec un calendrier interactif, des rappels automatiques par email/SMS et une intégration de paiement sécurisée.',
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'Twilio'],
    image: '/images/projects/project4.jpg',
    demoLink: 'https://chronos-booking.example.com',
    githubLink: 'https://github.com/yourusername/chronos-booking',
    isPrivate: false,
    color: 'green',
    featured: false
  }
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleProjectClick = (id: number) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={containerRef}>
      <motion.div 
        className="absolute inset-0 bg-cyber-grid opacity-5"
        style={{ y: backgroundY }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <span className="relative">
              Mes <NeonText color="blue">Projets</NeonText>
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-transparent via-neon-pink to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Découvrez une sélection de mes projets les plus récents et innovants, 
            combinant design moderne et technologies de pointe.
          </p>
        </motion.div>

        {/* Overlay "En cours de développement" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ marginTop: "16rem" }}
        >
          <div className="relative w-full max-w-3xl">
            <motion.div 
              className="absolute inset-0 bg-dark/80 backdrop-blur-md rounded-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            
            <div className="relative z-10 p-8 text-center">
              <motion.div 
                className="w-20 h-20 mx-auto border-4 border-t-neon-blue border-r-neon-purple border-b-neon-pink border-l-transparent rounded-full mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.h3 
                className="text-2xl md:text-3xl font-bold mb-4"
                animate={{ 
                  textShadow: [
                    "0 0 7px rgba(59, 130, 246, 0.7), 0 0 10px rgba(59, 130, 246, 0.5)",
                    "0 0 10px rgba(59, 130, 246, 0.9), 0 0 15px rgba(59, 130, 246, 0.7)",
                    "0 0 7px rgba(59, 130, 246, 0.7), 0 0 10px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <NeonText color="blue">Projets en développement</NeonText>
              </motion.h3>
              
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Ces projets sont des exemples de ce que je peux réaliser. 
                Mes projets personnels sont actuellement en cours de développement 
                et seront bientôt disponibles.
              </p>
              
              <div className="flex flex-col items-center space-y-4">
                <Button 
                  variant="outline"
                  className="relative overflow-hidden group border border-neon-blue/30 bg-dark/60 backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center">
                    <FaLock className="mr-2 text-neon-blue/70 text-sm" />
                    Bientôt disponible
                  </span>
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-neon-blue/40"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              
              </div>
            </div>
            
            {/* Particules décoratives */}
            <motion.div 
              className="absolute -top-4 -left-4 w-3 h-3 rounded-full bg-neon-blue"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-4 w-3 h-3 rounded-full bg-neon-pink"
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>

        {/* Conteneur des projets avec effet de flou */}
        <div className="relative">
          {/* Effet de flou appliqué aux projets */}
          <motion.div 
            className="absolute inset-0 backdrop-blur-sm bg-dark/30 z-10 rounded-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(project.id)}
                className="cursor-pointer"
              >
                <Card 
                  glowColor={project.color as any} 
                  className="h-full overflow-hidden backdrop-blur-sm bg-dark/40 border border-gray-800/50 transition-all duration-300"
                  hoverEffect="glow"
                >
                  {project.featured && (
                    <div className="absolute top-0 right-0 w-20 h-20 z-10">
                      <div className="absolute transform rotate-45 bg-neon-blue text-dark text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center">
                        Featured
                      </div>
                    </div>
                  )}
                  
                  <div className="relative h-48 mb-4 overflow-hidden rounded-md group">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className={`transition-all duration-700 ${
                        hoveredProject === project.id ? 'scale-110 brightness-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                    
                    {/* Overlay avec liens */}
                    <div className={`absolute inset-0 bg-dark/70 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue hover:bg-neon-blue/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt />
                      </a>
                      <a 
                        href={project.isPrivate ? "#" : project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          project.isPrivate 
                            ? 'bg-gray-700/20 text-gray-400 cursor-not-allowed' 
                            : 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.isPrivate) e.preventDefault();
                        }}
                      >
                        {project.isPrivate ? <FaLock /> : <FaGithub />}
                      </a>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {project.title}
                    {project.isPrivate && (
                      <FaLock className="ml-2 text-gray-400 text-sm" title="Code source privé" />
                    )}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm">
                    {activeProject === project.id ? project.longDescription : project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-1 rounded-full bg-${project.color}/10 text-${project.color} border border-${project.color}/30`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        handleProjectClick(project.id);
                      }}
                    >
                      {activeProject === project.id ? "Moins de détails" : "Plus de détails"}
                    </Button>
                    
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>Démo</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="ghost"
            className="relative overflow-hidden group opacity-70 cursor-not-allowed border border-gray-700/50 bg-dark/40 backdrop-blur-sm"
            disabled
          >
            <span className="relative z-10 flex items-center text-gray-400">
              <FaLock className="mr-2 text-sm" />
              Voir tous les projets
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-px bg-gray-700/30"></div>
          </Button>
          <p className="text-gray-500 text-sm mt-2 italic">Accès temporairement indisponible</p>
        </motion.div>
      </div>

      {/* Effets de fond dynamiques */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity }}
      >
        <motion.div 
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-neon-pink/10 via-transparent to-transparent blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        <div className="absolute top-[15%] right-[10%] w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-neon-purple animate-pulse-slow"></div>
        <div className="absolute top-[60%] right-[25%] w-1 h-1 rounded-full bg-neon-pink animate-pulse-slow"></div>
      </motion.div>
    </section>
  );
} 