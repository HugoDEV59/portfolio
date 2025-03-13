'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { 
  FaReact, FaNodeJs, FaDatabase, FaFigma, 
  FaGitAlt, FaDocker, FaAws, FaTools 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb,
  SiPostgresql, SiGraphql, SiRedux, SiJest
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  color: string;
}

interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  design: Skill[];
  tools: Skill[];
  [key: string]: Skill[]; // Index signature pour permettre l'accès dynamique
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('frontend');

  const skillCategories = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'design', label: 'Design' },
    { id: 'tools', label: 'Outils' }
  ];

  const skills: SkillsData = {
    frontend: [
      { name: 'React', icon: <FaReact size={40} />, level: 90, color: 'neon-blue' },
      { name: 'Next.js', icon: <SiNextdotjs size={40} />, level: 85, color: 'neon-blue' },
      { name: 'TypeScript', icon: <SiTypescript size={40} />, level: 80, color: 'neon-blue' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} />, level: 95, color: 'neon-blue' },
      { name: 'Redux', icon: <SiRedux size={40} />, level: 75, color: 'neon-blue' },
      { name: 'Jest', icon: <SiJest size={40} />, level: 70, color: 'neon-blue' },
    ],
    backend: [
      { name: 'Node.js', icon: <FaNodeJs size={40} />, level: 85, color: 'neon-purple' },
      { name: 'Express', icon: <FaNodeJs size={40} />, level: 80, color: 'neon-purple' },
      { name: 'MongoDB', icon: <SiMongodb size={40} />, level: 75, color: 'neon-purple' },
      { name: 'PostgreSQL', icon: <SiPostgresql size={40} />, level: 70, color: 'neon-purple' },
      { name: 'GraphQL', icon: <SiGraphql size={40} />, level: 65, color: 'neon-purple' },
      { name: 'REST API', icon: <FaDatabase size={40} />, level: 90, color: 'neon-purple' },
    ],
    design: [
      { name: 'Figma', icon: <FaFigma size={40} />, level: 80, color: 'neon-pink' },
      { name: 'UI/UX', icon: <FaFigma size={40} />, level: 75, color: 'neon-pink' },
      { name: 'Responsive', icon: <FaFigma size={40} />, level: 95, color: 'neon-pink' },
      { name: 'Animations', icon: <FaFigma size={40} />, level: 85, color: 'neon-pink' },
    ],
    tools: [
      { name: 'Git', icon: <FaGitAlt size={40} />, level: 90, color: 'neon-green' },
      { name: 'Docker', icon: <FaDocker size={40} />, level: 70, color: 'neon-green' },
      { name: 'AWS', icon: <FaAws size={40} />, level: 65, color: 'neon-green' },
      { name: 'CI/CD', icon: <FaTools size={40} />, level: 75, color: 'neon-green' },
    ]
  };

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

  // Correction des classes dynamiques qui ne fonctionnent pas avec Tailwind
  const getTabButtonClass = (isActive: boolean, categoryId: string) => {
    if (!isActive) return 'bg-dark border border-gray-700 hover:border-gray-500';
    
    switch(categoryId) {
      case 'frontend': return 'bg-neon-blue text-dark font-medium';
      case 'backend': return 'bg-neon-purple text-dark font-medium';
      case 'design': return 'bg-neon-pink text-dark font-medium';
      case 'tools': return 'bg-neon-green text-dark font-medium';
      default: return 'bg-neon-blue text-dark font-medium';
    }
  };

  const getSkillIconClass = (color: string) => {
    return color; // Le color est déjà "neon-blue", "neon-purple", etc.
  };

  const getProgressBarClass = (color: string) => {
    switch(color) {
      case 'neon-blue': return 'bg-neon-blue';
      case 'neon-purple': return 'bg-neon-purple';
      case 'neon-pink': return 'bg-neon-pink';
      case 'neon-green': return 'bg-neon-green';
      default: return 'bg-neon-blue';
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="skills">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mes <span className="neon-text-blue">Compétences</span>
          </h2>
          <div className="w-20 h-1 bg-neon-blue mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Un ensemble de technologies et d'outils que j'utilise pour créer des expériences web exceptionnelles.
          </p>
        </motion.div>

        {/* Onglets de catégories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={getTabButtonClass(activeTab === category.id, category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grille de compétences */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills[activeTab].map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card glowColor={skill.color as any} className="h-full">
                <div className="flex flex-col items-center text-center p-2">
                  <div className={`${getSkillIconClass(skill.color)} mb-4`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{skill.name}</h3>
                  
                  {/* Barre de progression */}
                  <div className="w-full bg-dark/50 h-3 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className={`h-full ${getProgressBarClass(skill.color)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </div>
                  
                  <span className="text-sm text-gray-300">{skill.level}%</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Section des certifications */}
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
            <Card glowColor="purple" className="relative overflow-hidden">
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
            
            <Card glowColor="blue" className="relative overflow-hidden">
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
            
            <Card glowColor="green" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute transform rotate-45 bg-neon-green text-dark text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center">
                  2021
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">TypeScript Professional</h4>
              <p className="text-gray-300">TypeScript Academy</p>
              <p className="mt-2 text-sm text-gray-400">
                Certification sur l'utilisation avancée de TypeScript dans des projets d'entreprise.
              </p>
            </Card>
            
            <Card glowColor="pink" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute transform rotate-45 bg-neon-pink text-dark text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center">
                  2020
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">UI/UX Design Fundamentals</h4>
              <p className="text-gray-300">Design+Code</p>
              <p className="mt-2 text-sm text-gray-400">
                Formation sur les principes fondamentaux du design d'interface et de l'expérience utilisateur.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Éléments visuels décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-radial from-neon-blue/10 via-transparent to-transparent blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] rounded-full bg-gradient-radial from-neon-purple/10 via-transparent to-transparent blur-lg"></div>
        
        <div className="absolute top-[20%] right-[10%] w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] left-[20%] w-2 h-2 rounded-full bg-neon-purple animate-pulse-slow"></div>
        <div className="absolute top-[60%] right-[30%] w-1 h-1 rounded-full bg-neon-pink animate-pulse-slow"></div>
      </div>
    </section>
  );
} 