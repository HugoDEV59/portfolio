'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const projects = [
  {
    id: 1,
    title: 'Application de gestion de tâches',
    description: 'Une application web moderne pour gérer vos tâches quotidiennes avec des fonctionnalités avancées.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: 'https://via.placeholder.com/600x400',
    link: '#',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Portfolio interactif',
    description: 'Un portfolio de développeur web avec des animations et des interactions avancées.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://via.placeholder.com/600x400',
    link: '#',
    color: 'purple'
  },
  {
    id: 3,
    title: 'Site e-commerce',
    description: 'Une plateforme e-commerce complète avec panier, paiement et gestion des commandes.',
    tags: ['React', 'Stripe', 'Firebase'],
    image: 'https://via.placeholder.com/600x400',
    link: '#',
    color: 'pink'
  },
  {
    id: 4,
    title: 'Application de réservation',
    description: 'Une application permettant aux utilisateurs de réserver des services en ligne.',
    tags: ['Vue.js', 'Express', 'PostgreSQL'],
    image: 'https://via.placeholder.com/600x400',
    link: '#',
    color: 'green'
  }
];

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="projects">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mes <span className="neon-text-pink">Projets</span>
          </h2>
          <div className="w-20 h-1 bg-neon-pink mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Découvrez quelques-uns de mes projets récents. Chaque projet est unique et reflète mon expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card glowColor={project.color as any} className="h-full overflow-hidden">
                <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={`transition-transform duration-500 ${
                      hoveredProject === project.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-dark border border-gray-700 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    Voir le projet
                  </Button>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="primary">
            Voir tous les projets
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-neon-pink/10 via-transparent to-transparent blur-xl"></div>
        
        <div className="absolute top-[15%] right-[10%] w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-neon-purple animate-pulse-slow"></div>
        <div className="absolute top-[60%] right-[25%] w-1 h-1 rounded-full bg-neon-pink animate-pulse-slow"></div>
      </div>
    </section>
  );
} 