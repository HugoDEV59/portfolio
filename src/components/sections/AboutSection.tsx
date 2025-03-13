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
      title: 'Utilisateur d\'abord',
      description: 'Je crée des interfaces intuitives qui répondent aux besoins réels des utilisateurs.',
      icon: <FaLightbulb className="text-neon-orange" size={24} />
    },
    {
      id: 'performance',
      title: 'Performance optimale',
      description: 'J\'optimise chaque ligne de code pour garantir des applications rapides et réactives.',
      icon: <FaRocket className="text-neon-green" size={24} />
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
              À propos de <NeonText color="blue">moi</NeonText>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Développeur passionné avec plus de 5 ans d'expérience dans la création d'applications web modernes et performantes.
            </p>
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
                  Passionné par le développement web depuis plus de 5 ans, je me spécialise dans la création d'applications 
                  <NeonText color="purple" className="mx-1">modernes</NeonText> et 
                  <NeonText color="green" className="mx-1">performantes</NeonText>.
                </p>
                
                <p>
                  Mon approche combine une expertise technique solide avec un sens aigu du design et de l'expérience utilisateur. 
                  Je m'efforce de créer des interfaces à la fois esthétiques et fonctionnelles.
                </p>
                
                <p>
                  En constante évolution, je reste à l'affût des dernières technologies et meilleures pratiques pour offrir 
                  des solutions innovantes et adaptées aux besoins de mes clients.
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
                    "Je crois que le code bien écrit est à la fois un art et une science. Mon objectif est de créer des expériences web qui allient performance technique et design intuitif."
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
              Mon <NeonText color="green">parcours</NeonText> professionnel
            </h3>
            
            <div className="relative">
              <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue/30 via-neon-purple/30 to-neon-pink/30 rounded-full">
                <motion.div 
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink rounded-full"
                  style={{ height: lineHeight }}
                />
              </div>
              
              <div className="space-y-12 relative z-10 pointer-events-auto">
  {/* Alternance - Université */}
  <div className="timeline-item relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-8">
    <div className="md:text-right md:pr-8">
      <div className="inline-block px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-sm text-neon-blue mb-2">2023 - Présent</div>
      <h4 className="text-xl font-semibold">Développeur Web en Alternance</h4>
      <p className="text-gray-300">Université de Technologie Avancée</p>
    </div>
    
    <div className="relative md:pl-8">
      <div className="absolute left-[-30px] md:left-[-16px] top-0 w-8 h-8 rounded-full bg-darker border-2 border-neon-blue flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
      </div>
      <Card className="backdrop-blur-sm bg-dark/40 border border-gray-800/50">
        <p className="text-gray-300">
          Développement et maintenance de plateformes de gestion des étudiants et des cours en ligne.  
          Implémentation de nouvelles fonctionnalités pour l'espace numérique de travail, intégration d'APIs pour la gestion des emplois du temps et amélioration des performances des applications web existantes.
        </p>
      </Card>
    </div>
  </div>

  {/* Stage - Startup Tech */}
  <div className="timeline-item relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-8">
    <div className="md:text-right md:pr-8">
      <div className="inline-block px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-full text-sm text-neon-purple mb-2">2022 - 2023</div>
      <h4 className="text-xl font-semibold">Développeur Frontend (Stage)</h4>
      <p className="text-gray-300">NextGen Solutions</p>
    </div>
    
    <div className="relative md:pl-8">
      <div className="absolute left-[-30px] md:left-[-16px] top-0 w-8 h-8 rounded-full bg-darker border-2 border-neon-purple flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
      </div>
      <Card className="backdrop-blur-sm bg-dark/40 border border-gray-800/50">
        <p className="text-gray-300">
          Développement d'interfaces utilisateur réactives et performantes avec React et Tailwind CSS.  
          Création d'un dashboard interactif pour visualiser des données clients en temps réel, avec une optimisation des requêtes pour améliorer la rapidité du chargement.
        </p>
      </Card>
    </div>
  </div>

  {/* Projet personnel */}
  <div className="timeline-item relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-8">
    <div className="md:text-right md:pr-8">
      <div className="inline-block px-3 py-1 bg-neon-pink/10 border border-neon-pink/30 rounded-full text-sm text-neon-pink mb-2">2021 - 2022</div>
      <h4 className="text-xl font-semibold">Projet Personnel - Plateforme de Gestion de Projets</h4>
      <p className="text-gray-300">Freelance</p>
    </div>
    
    <div className="relative md:pl-8">
      <div className="absolute left-[-30px] md:left-[-16px] top-0 w-8 h-8 rounded-full bg-darker border-2 border-neon-pink flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-neon-pink"></div>
      </div>
      <Card className="backdrop-blur-sm bg-dark/40 border border-gray-800/50">
        <p className="text-gray-300">
          Développement d'une application de gestion de projets en ligne avec Node.js et Vue.js.  
          Fonctionnalités inclues : gestion des tâches, suivi du temps, chat en temps réel et notifications par e-mail automatisées.
        </p>
      </Card>
    </div>
  </div>
</div>

                
      </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Certifications & <span className="neon-text-purple">Formations</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card glowColor="purple" className="relative overflow-hidden backdrop-blur-sm bg-dark/40 border border-gray-800/50">
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute transform rotate-45 bg-neon-purple text-dark text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center">
                    2023
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">AWS Certified Developer</h4>
                <p className="text-gray-300">Amazon Web Services</p>
                <p className="mt-2 text-sm text-gray-400">
                  Certification validant les compétences en développement et déploiement d'applications sur AWS.
                </p>
              </Card>
              
              <Card glowColor="blue" className="relative overflow-hidden backdrop-blur-sm bg-dark/40 border border-gray-800/50">
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute transform rotate-45 bg-neon-blue text-dark text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center">
                    2022
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">React Advanced Patterns</h4>
                <p className="text-gray-300">Frontend Masters</p>
                <p className="mt-2 text-sm text-gray-400">
                  Formation avancée sur les patterns de conception React et les optimisations de performance.
                </p>
              </Card>
            </div>
          </motion.div>
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