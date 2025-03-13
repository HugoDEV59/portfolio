'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Card from '@/components/ui/Card';
import { 
  FaReact, FaNodeJs, FaDatabase, FaFigma, 
  FaGitAlt, FaDocker, FaAws, FaTools,
  FaBrain, FaRocket, FaChartLine
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb,
  SiPostgresql, SiGraphql, SiRedux, SiJest
} from 'react-icons/si';
import NeonText from '../ui/NeonText';

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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.3]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);

  const tabs = ['frontend', 'backend', 'design', 'tools'];

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

  // Nouvelles couleurs pour chaque catégorie
  const tabColors = {
    frontend: {
      bg: 'bg-neon-blue',
      border: 'border-neon-blue',
      text: 'text-neon-blue',
      shadow: 'shadow-neon-blue',
      hover: 'hover:bg-neon-blue/20 hover:border-neon-blue hover:text-neon-blue'
    },
    backend: {
      bg: 'bg-neon-purple',
      border: 'border-neon-purple',
      text: 'text-neon-purple',
      shadow: 'shadow-neon-purple',
      hover: 'hover:bg-neon-purple/20 hover:border-neon-purple hover:text-neon-purple'
    },
    design: {
      bg: 'bg-neon-pink',
      border: 'border-neon-pink',
      text: 'text-neon-pink',
      shadow: 'shadow-neon-pink',
      hover: 'hover:bg-neon-pink/20 hover:border-neon-pink hover:text-neon-pink'
    },
    tools: {
      bg: 'bg-neon-green',
      border: 'border-neon-green',
      text: 'text-neon-green',
      shadow: 'shadow-neon-green',
      hover: 'hover:bg-neon-green/20 hover:border-neon-green hover:text-neon-green'
    }
  };

  // Fonction pour obtenir la couleur active
  const getActiveColor = (type: 'bg' | 'border' | 'text' | 'shadow') => {
    return tabColors[activeTab as keyof typeof tabColors][type];
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
  
  // Données pour les statistiques
  const stats = [
    { label: "Projets", value: "50+", icon: <FaRocket />, color: "neon-blue" },
    { label: "Années d'expérience", value: "5+", icon: <FaChartLine />, color: "neon-purple" },
    { label: "Technologies maîtrisées", value: "20+", icon: <FaBrain />, color: "neon-pink" }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mes <span className="inline-block"><NeonText color={activeTab === 'frontend' ? 'blue' : activeTab === 'backend' ? 'purple' : activeTab === 'design' ? 'pink' : 'green'}>Compétences</NeonText></span>
          </h2>
          <div className={`w-20 h-1 ${getActiveColor('bg')} mx-auto rounded-full`}></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Un ensemble de technologies et d'outils que j'utilise pour créer des expériences web exceptionnelles.
          </p>
        </motion.div>

        {/* Onglets de compétences */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-3 rounded-md font-medium transition-all duration-300
                ${activeTab === tab 
                  ? `${tabColors[tab as keyof typeof tabColors].bg} text-dark font-bold shadow-lg ${tabColors[tab as keyof typeof tabColors].shadow}`
                  : `bg-dark/50 border border-gray-700 text-gray-300 ${tabColors[tab as keyof typeof tabColors].hover}`
                }
                transform hover:scale-105 hover:shadow-lg
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
            <motion.div 
              key={index} 
              variants={itemVariants}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <Card 
                glowColor={skill.color as any} 
                className={`
                  h-full border border-gray-800/50 backdrop-blur-sm
                  transform hover:scale-105 transition-all duration-300
                  shadow-lg hover:shadow-xl
                  ${hoveredSkill === skill.name ? `border-${skill.color}` : ''}
                `}
                hoverEffect="glow"
              >
                <div className="flex flex-col items-center text-center p-4">
                  <div className={`${getSkillIconClass(skill.color)} mb-4 text-${skill.color}`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{skill.name}</h3>
                  
                  {/* Barre de progression améliorée */}
                  <div className="w-full bg-dark/70 h-4 rounded-full overflow-hidden mb-2 border border-gray-700">
                    <motion.div
                      className={`h-full ${getProgressBarClass(skill.color)} relative`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      {/* Effet de brillance */}
                      <motion.div 
                        className="absolute inset-0 bg-white/20"
                        animate={{ 
                          x: ['-100%', '100%'],
                          opacity: [0, 0.5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  <span className={`text-sm font-medium text-${skill.color}`}>{skill.level}%</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Effet de fond dynamique qui change avec l'onglet actif */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      >
        <motion.div 
          className={`absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-radial from-${activeTab === 'frontend' ? 'neon-blue' : activeTab === 'backend' ? 'neon-purple' : activeTab === 'design' ? 'neon-pink' : 'neon-green'}/10 via-transparent to-transparent blur-xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ scale: backgroundScale }}
        ></motion.div>
        
        {/* Grille cyber */}
        <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
        
        {/* Points lumineux */}
        <div className="absolute top-[20%] right-[10%] w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] left-[20%] w-2 h-2 rounded-full bg-neon-purple animate-pulse-slow"></div>
        <div className="absolute top-[60%] right-[30%] w-1 h-1 rounded-full bg-neon-pink animate-pulse-slow"></div>
      </motion.div>
    </section>
  );
} 