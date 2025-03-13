'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { FaCode, FaLaptopCode, FaServer, FaMobileAlt } from 'react-icons/fa';

export default function AboutSection() {
  const skills = [
    { 
      icon: <FaCode className="text-neon-blue" size={24} />, 
      title: 'Développement Frontend', 
      description: 'Création d\'interfaces utilisateur modernes et réactives avec React, Next.js et Tailwind CSS.' 
    },
    { 
      icon: <FaServer className="text-neon-purple" size={24} />, 
      title: 'Développement Backend', 
      description: 'Conception d\'APIs robustes et évolutives avec Node.js, Express et bases de données SQL/NoSQL.' 
    },
    { 
      icon: <FaLaptopCode className="text-neon-pink" size={24} />, 
      title: 'Architecture Web', 
      description: 'Mise en place d\'architectures modernes (JAMstack, Serverless) pour des applications performantes.' 
    },
    { 
      icon: <FaMobileAlt className="text-neon-green" size={24} />, 
      title: 'Responsive Design', 
      description: 'Création d\'interfaces adaptatives offrant une expérience optimale sur tous les appareils.' 
    }
  ];

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
    <section className="py-20 px-4 relative overflow-hidden" id="about">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            À <span className="neon-text-green">Propos</span> de Moi
          </h2>
          <div className="w-20 h-1 bg-neon-green mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Développeur passionné avec une expertise dans la création d'expériences web modernes et immersives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Photo et présentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 z-10 mix-blend-overlay"></div>
              <Image
                src="https://via.placeholder.com/600x800"
                alt="Portrait du développeur"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
              <div className="absolute inset-0 border-2 border-neon-green/30 rounded-lg z-20 transform translate-x-4 translate-y-4"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card glowColor="green" className="h-full">
              <h3 className="text-2xl font-bold mb-4 neon-text-green">Mon Parcours</h3>
              
              <p className="mb-4 text-gray-300">
                Passionné par le développement web depuis plus de 5 ans, je me spécialise dans la création d'applications web modernes et performantes. Mon approche combine créativité technique et sensibilité aux besoins utilisateurs.
              </p>
              
              <p className="mb-4 text-gray-300">
                Après avoir obtenu mon diplôme en informatique, j'ai travaillé sur divers projets allant des sites vitrines aux applications complexes. Cette expérience m'a permis de développer une expertise approfondie dans les technologies frontend et backend.
              </p>
              
              <p className="text-gray-300">
                Je suis constamment à l'affût des dernières tendances et technologies pour offrir des solutions innovantes et adaptées aux besoins spécifiques de chaque projet.
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-dark/50 border border-neon-blue/30 rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-dark/50 border border-neon-purple/30 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-dark/50 border border-neon-pink/30 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-dark/50 border border-neon-green/30 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-dark/50 border border-neon-blue/30 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-dark/50 border border-neon-purple/30 rounded-full text-sm">Tailwind CSS</span>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Compétences */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-dark/50 border border-gray-700">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                    <p className="text-gray-300">{skill.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Citation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl italic text-gray-300 max-w-3xl mx-auto">
            <span className="text-4xl text-neon-green">"</span>
            Je crois que le code bien écrit est à la fois un art et une science. Mon objectif est de créer des expériences web qui allient performance technique et design intuitif.
            <span className="text-4xl text-neon-green">"</span>
          </blockquote>
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cercle lumineux */}
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-gradient-radial from-neon-green/10 via-transparent to-transparent blur-xl"></div>
        
        {/* Points lumineux statiques */}
        <div className="absolute top-[25%] left-[10%] w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-slow"></div>
        <div className="absolute bottom-[30%] right-[20%] w-2 h-2 rounded-full bg-neon-purple animate-pulse-slow"></div>
        <div className="absolute top-[70%] left-[30%] w-1 h-1 rounded-full bg-neon-green animate-pulse-slow"></div>
      </div>
    </section>
  );
} 