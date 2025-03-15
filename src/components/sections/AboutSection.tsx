'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FaCode, FaServer, FaTools, FaPalette, FaLightbulb, FaRocket } from 'react-icons/fa';
import NeonText from '../ui/NeonText';
import Card from '../ui/Card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const skills = [
    { 
      id: 'frontend', 
      name: 'Frontend', 
      icon: <FaCode className="text-neon-blue" size={24} />,
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    { 
      id: 'backend', 
      name: 'Backend', 
      icon: <FaServer className="text-neon-purple" size={24} />,
      items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL']
    },
    { 
      id: 'tools', 
      name: 'Outils', 
      icon: <FaTools className="text-neon-green" size={24} />,
      items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest']
    },
    { 
      id: 'design', 
      name: 'Design', 
      icon: <FaPalette className="text-neon-pink" size={24} />,
      items: ['Figma', 'Adobe XD', 'Photoshop', 'Responsive Design', 'UI/UX']
    }
  ];

  const philosophies = [
    {
      id: 'user-first',
      title: 'Priorité à l\'Utilisateur',
      description: 'Je conçois des interfaces intuitives qui répondent aux besoins réels des utilisateurs, en plaçant leur expérience au cœur de chaque projet.',
      icon: <FaLightbulb className="text-neon-orange" size={24} />
    },
    {
      id: 'performance',
      title: 'Performance Maximale',
      description: 'J\'optimise chaque ligne de code pour garantir des applications non seulement rapides, mais aussi réactives et fluides, offrant ainsi une expérience utilisateur exceptionnelle.',
      icon: <FaRocket className="text-neon-yellow" size={24} />
    }
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (!timelineRef.current) return;
    
    const items = timelineRef.current.querySelectorAll('.timeline-item');
    
    gsap.fromTo(items, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.3,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          scrub: 1,
          // markers: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              À propos de <NeonText color="purple" className="mx-1">moi</NeonText>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3">
                  <FaCode className="text-neon-blue" />
                </span>
                Mon parcours
              </h3>
              
              <div className="space-y-6 text-gray-300">
                <p>
                  Je m'appelle <NeonText color="blue" className="mx-1">Hugo</NeonText>, j'ai <NeonText color="purple" className="mx-1">21 ans</NeonText> et je vis à <NeonText color="pink" className="mx-1">Dunkerque</NeonText> dans le Nord de la France. Passionné par le développement web depuis plus de 5 ans, je me spécialise dans la création d'applications 
                  <NeonText color="green" className="mx-1">modernes</NeonText> et 
                  <NeonText color="orange" className="mx-1">performantes</NeonText>.
                </p>
                
                <p>
                  Mon approche est un mélange d'expertise technique et d'une sensibilité particulière pour le design et l'expérience utilisateur. 
                  Je m'efforce de concevoir des interfaces qui ne sont pas seulement belles, mais qui racontent aussi une histoire et facilitent la vie des utilisateurs.
                </p>
                
                <p>
                  Je suis en constante évolution, toujours curieux d'apprendre les dernières technologies et meilleures pratiques. Mon objectif est d'offrir 
                  des solutions innovantes qui répondent vraiment aux besoins de ceux qui me font confiance.
                </p>
              </div>
              
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center mr-3">
                  <FaLightbulb className="text-neon-purple" />
                </span>
                Ma philosophie
              </h3>
              
              <div className="space-y-6">
                {philosophies.map(philosophy => (
                  <Card 
                    key={philosophy.id}
                    glowColor={philosophy.id === 'user-first' ? 'orange' : 'green'}
                    className="backdrop-blur-sm bg-dark/40 border border-gray-800/50"
                    hoverEffect="glow"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 glassmorphism">
                        {philosophy.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">{philosophy.title}</h4>
                        <p className="text-gray-300">{philosophy.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              variants={itemVariants}
              className="mt-8 mb-8"> {/* Ajout d'un espacement en bas */}
              <blockquote className="p-4 border-l-4 border-neon-blue bg-dark/30 rounded-r-lg">
                <p className="italic text-gray-300">
                  "Je crois fermement que le code bien écrit transcende la simple fonctionnalité ; c'est une forme d'art qui fusionne la logique et la créativité. Mon ambition est de concevoir des expériences web qui non seulement répondent aux exigences techniques, mais qui enchantent également les utilisateurs par leur esthétique et leur intuitivité."
                </p>
              </blockquote>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="mb-20"
            ref={timelineRef}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              <NeonText color="pink" flickerIntensity="low" className="text-3xl">Parcours Professionnel</NeonText>
              <motion.span 
                className="block mx-auto mt-2 h-0.5 w-24 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "6rem", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h3>
            
            <div className="relative mt-16">
              
              {/* Ligne de temps verticale */}
              
              <motion.div 
                className="absolute left-[15px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink rounded-full"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              
              <div className="space-y-12 relative z-10 pointer-events-auto">
                {/* Développeur Web en Alternance */}
                <motion.div 
                  className="timeline-item relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="md:text-right md:pr-8">
                    <div className="inline-block px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-sm text-neon-blue mb-2">2023 - Présent</div>
                    <h4 className="text-xl font-semibold">Développeur Web en Alternance</h4>
                    <p className="text-gray-300 flex items-center md:justify-end mt-1">
                      <span className="bg-neon-blue/10 px-2 py-1 rounded text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Université de Technologie Avancée
                      </span>
                    </p>
                  </div>
                  
                  <div className="relative md:pl-8">
                    <div className="absolute left-[-32px] w-8 h-8 rounded-full bg-dark border-2 border-neon-blue flex items-center justify-center">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-neon-blue"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            "0 0 0px rgba(59, 130, 246, 0.5)",
                            "0 0 8px rgba(59, 130, 246, 0.8)",
                            "0 0 0px rgba(59, 130, 246, 0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    <Card className="backdrop-blur-md bg-dark/60 border border-gray-800/50 hover:border-neon-blue/30 transition-all duration-300">
                      <div className="text-gray-300">
                        <span className="text-neon-blue font-medium block mb-2">Application de Prêt de PC</span>
                        <p>
                          Développement d'une application complète pour faciliter l'accès aux ressources informatiques des étudiants, avec système de réservation et suivi en temps réel.
                        </p>
                        <span className="text-neon-blue font-medium block mt-4 mb-2">Gestion de Projet Collaborative</span>
                        <p>
                          Conception d'une application de gestion de projet robuste, permettant de suivre l'avancement des tâches et de collaborer efficacement au sein des équipes.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-800/50">
                          {['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'].map(tech => (
                            <span key={tech} className="px-2 py-1 text-xs rounded-full bg-neon-blue/5 text-gray-400 border border-neon-blue/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
                
                {/* Développeur - Startup */}
                <motion.div 
                  className="timeline-item relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-8">
                    <div className="md:text-right md:pr-8">
                      <div className="inline-block px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-full text-sm text-neon-purple mb-2">2022 - 2023</div>
                      <h4 className="text-xl font-semibold mb-2">Développeur - Scripts FiveM & Bots Discord</h4>
                      <p className="text-gray-300 flex items-center md:justify-end">
                        <span className="bg-neon-purple/10 px-2 py-1 rounded text-xs mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Tech Innovators
                        </span>
                      </p>
                    </div>
                    
                    <div className="relative md:pl-8">
                      <div className="absolute left-[-32px] w-8 h-8 rounded-full bg-dark border-2 border-neon-purple flex items-center justify-center">
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-neon-purple"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0px rgba(168, 85, 247, 0.5)",
                              "0 0 8px rgba(168, 85, 247, 0.8)",
                              "0 0 0px rgba(168, 85, 247, 0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="backdrop-blur-md bg-dark/60 border border-gray-800/50 hover:border-neon-purple/30 transition-all duration-300">
                          <div className="space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="bg-neon-purple/10 p-3 rounded-lg shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <h5 className="font-medium text-neon-purple">Scripts FiveM Personnalisés</h5>
                                <p className="text-gray-300 text-sm">
                                  Développement et vente de scripts personnalisés pour FiveM, avec des fonctionnalités avancées pour améliorer l'expérience de jeu et optimiser les performances.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                              <div className="bg-neon-purple/10 p-3 rounded-lg shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                              </div>
                              <div>
                                <h5 className="font-medium text-neon-purple">Bots Discord pour Vinted</h5>
                                <p className="text-gray-300 text-sm">
                                  Création de bots Discord automatisés pour la plateforme Vinted, permettant de suivre les nouvelles annonces et d'interagir avec les utilisateurs.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-800/50">
                              {['Lua', 'JavaScript', 'Discord.js', 'API Integration', 'SQL'].map(tech => (
                                <span key={tech} className="px-2 py-1 text-xs rounded-full bg-neon-purple/5 text-gray-400 border border-neon-purple/20">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Projet Personnel */}
                <motion.div 
                  className="timeline-item relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-8">
                    <div className="md:text-right md:pr-8">
                      <div className="inline-block px-3 py-1 bg-neon-pink/10 border border-neon-pink/30 rounded-full text-sm text-neon-pink mb-2">2021 - 2022</div>
                      <h4 className="text-xl font-semibold mb-2">Projet Personnel - Serveur FiveM</h4>
                      <p className="text-gray-300 flex items-center md:justify-end">
                        <span className="bg-neon-pink/10 px-2 py-1 rounded text-xs mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Développeur Indépendant
                        </span>
                      </p>
                    </div>
                    
                    <div className="relative md:pl-8">
                      <div className="absolute left-[-32px] w-8 h-8 rounded-full bg-dark border-2 border-neon-pink flex items-center justify-center">
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-neon-pink"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0px rgba(236, 72, 153, 0.5)",
                              "0 0 8px rgba(236, 72, 153, 0.8)",
                              "0 0 0px rgba(236, 72, 153, 0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(236, 72, 153, 0.2)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="backdrop-blur-md bg-dark/60 border border-gray-800/50 hover:border-neon-pink/30 transition-all duration-300">
                          <div className="space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="bg-neon-pink/10 p-3 rounded-lg shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                </svg>
                              </div>
                              <div>
                                <h5 className="font-medium text-neon-pink">Serveur FiveM Personnalisé</h5>
                                <p className="text-gray-300 text-sm">
                                  Création d'un serveur FiveM avec des scripts personnalisés pour améliorer l'expérience de jeu, incluant des systèmes de missions, de gestion de l'économie et d'interactions entre joueurs.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                              <div className="bg-neon-pink/10 p-3 rounded-lg shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                              </div>
                              <div>
                                <h5 className="font-medium text-neon-pink">Optimisation des Performances</h5>
                                <p className="text-gray-300 text-sm">
                                  Optimisation des performances du serveur pour garantir une expérience fluide même avec un grand nombre de joueurs connectés simultanément.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-800/50">
                              {['Lua', 'JavaScript', 'MySQL', 'HTML/CSS', 'Server Management'].map(tech => (
                                <span key={tech} className="px-2 py-1 text-xs rounded-full bg-neon-pink/5 text-gray-400 border border-neon-pink/20">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="mt-12">
            <motion.h3 
              className="text-xl md:text-2xl font-bold mb-10 inline-block relative text-center w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <NeonText color="green" flickerIntensity="low" className="text-3xl">Diplômes </NeonText> & 
              <NeonText color="orange" flickerIntensity="low" className="text-3xl"> Certifications</NeonText>
              <motion.span 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "6rem", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.h3>
            
            {/* Ligne de temps verticale pour les diplômes */}
            <div className="relative mt-16 mb-10">
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-pink via-neon-purple to-neon-blue rounded-full"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, staggerChildren: 0.3 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                {/* BTS */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="relative mb-20"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-dark border-2 border-neon-pink flex items-center justify-center">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-neon-pink"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:text-right md:pr-8">
                      <div className="inline-block px-3 py-1 bg-neon-pink/10 border border-neon-pink/30 rounded-full text-sm text-neon-pink mb-2">2021 - 2023</div>
                      <h4 className="text-xl font-semibold mb-1">BTS Systèmes Numériques</h4>
                      <p className="text-gray-400 text-sm">Option Informatique et Réseaux (Bac+2)</p>
                    </div>
                    
                    <div className="md:pl-8">
                      <motion.div
                        whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)" }}
                        transition={{ duration: 0.3 }}
                        className="bg-dark/60 backdrop-blur-md border border-gray-800/50 rounded-xl p-5 hover:border-neon-pink/50 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-neon-pink/10 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="px-2 py-0.5 text-xs rounded-full bg-neon-pink/10 text-neon-pink border border-neon-pink/30 flex items-center">
                                <motion.div 
                                  className="w-1.5 h-1.5 rounded-full bg-neon-pink mr-1"
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                                Diplôme obtenu
                              </span>
                            </div>
                            <p className="mt-3 text-sm text-gray-300">
                              Formation technique en informatique et réseaux, avec spécialisation en développement d'applications et administration de systèmes.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Bachelor */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative mb-20"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-dark border-2 border-neon-green flex items-center justify-center">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-neon-green"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:text-right md:pr-8 md:order-1 order-2">
                      <motion.div
                        whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0, 255, 102, 0.3)" }}
                        transition={{ duration: 0.3 }}
                        className="bg-dark/60 backdrop-blur-md border border-gray-800/50 rounded-xl p-5 hover:border-neon-green/50 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-neon-green/10 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="px-2 py-0.5 text-xs rounded-full bg-neon-green/10 text-neon-green border border-neon-green/30 flex items-center">
                                <motion.div 
                                  className="w-1.5 h-1.5 rounded-full bg-neon-green mr-1"
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                                Diplôme obtenu
                              </span>
                            </div>
                            <p className="mt-3 text-sm text-gray-300">
                              Formation en gestion de projets numériques, méthodologies agiles, et développement d'applications web et mobiles.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="md:pl-8 md:order-2 order-1">
                      <div className="inline-block px-3 py-1 bg-neon-green/10 border border-neon-green/30 rounded-full text-sm text-neon-green mb-2">2023 - 2024</div>
                      <h4 className="text-xl font-semibold mb-1">Bachelor Chef de Projet</h4>
                      <p className="text-gray-400 text-sm">Titre professionnel de niveau 6 (Bac+3/4)</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Certification en cours */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-dark border-2 border-neon-orange flex items-center justify-center z-10">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-neon-orange"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        boxShadow: [
                          "0 0 0px rgba(255, 102, 0, 0.5)",
                          "0 0 10px rgba(255, 102, 0, 0.8)",
                          "0 0 0px rgba(255, 102, 0, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(255, 102, 0, 0.2)" }}
                    transition={{ duration: 0.3 }}
                    className="max-w-3xl mx-auto bg-dark/60 backdrop-blur-md border border-gray-800/50 rounded-xl p-6 hover:border-neon-orange/50 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Effet de lueur en arrière-plan */}
                    <motion.div 
                      className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange/0 via-neon-orange/20 to-neon-orange/0 blur-sm"
                      animate={{ 
                        x: ['-100%', '100%'],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="text-center mb-4">
                      <div className="inline-block px-4 py-1 bg-neon-orange/10 border border-neon-orange/30 rounded-full text-sm text-neon-orange mb-2">2024 - aujourd'hui</div>
                      <h4 className="text-2xl font-semibold mb-1">Concepteur Développeur d'Applications</h4>
                      <p className="text-gray-400 text-sm">Titre professionnel de niveau 6 (Bac+3/4)</p>
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      <span className="px-3 py-1 text-sm rounded-full bg-neon-orange/10 text-neon-orange border border-neon-orange/30 flex items-center">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-neon-orange mr-2"
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            boxShadow: [
                              "0 0 0px rgba(255, 102, 0, 0.5)",
                              "0 0 8px rgba(255, 102, 0, 0.8)",
                              "0 0 0px rgba(255, 102, 0, 0.5)"
                            ]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        En cours d'obtention
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-6 mt-6">
                      <div className="bg-neon-orange/10 p-4 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neon-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <p className="text-gray-300 max-w-xl">
                        Formation avancée en développement d'applications, architecture logicielle, et gestion de projets techniques. 
                        Spécialisation en conception et développement d'applications web et mobiles modernes.
                      </p>
                    </div>
                    
                    {/* Compétences acquises */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['React', 'Node.js', 'API REST', 'Architecture MVC', 'DevOps', 'UX/UI', 'Agile', 'Tests'].map((skill) => (
                        <div key={skill} className="px-3 py-1 text-xs rounded-full bg-dark/80 border border-neon-orange/20 text-gray-300 text-center">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Particules décoratives pour la section diplômes */}
          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-neon-blue animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] left-[5%] w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse-slow"></div>
          <div className="absolute bottom-[20%] right-[15%] w-1 h-1 rounded-full bg-neon-pink animate-pulse-slow"></div>
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-gradient-radial from-neon-green/10 via-transparent to-transparent blur-xl"></div>
        
        <div className="absolute top-[25%] left-[10%] w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-slow"></div>
        <div className="absolute bottom-[30%] right-[20%] w-2 h-2 rounded-full bg-neon-purple animate-pulse-slow"></div>
        <div className="absolute top-[70%] left-[30%] w-1 h-1 rounded-full bg-neon-green animate-pulse-slow"></div>
        
        <div className="absolute top-0 left-0 w-full h-full bg-cyber-grid opacity-10"></div>
      </div>
    </section>
  );
} 