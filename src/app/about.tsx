import { Metadata } from 'next';
import AboutSection from '@/components/sections/AboutSection';

export const metadata: Metadata = {
  title: 'À propos | Portfolio Développeur Web',
  description: 'En savoir plus sur mon parcours, mes compétences et mes expériences en tant que développeur web.',
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection />
      
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 neon-text text-center">Mon parcours</h2>
          
          <div className="space-y-12">
            <div className="relative pl-8 border-l-2 border-neon-blue">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-blue"></div>
              <h3 className="text-xl font-semibold mb-2">Développeur Frontend Senior</h3>
              <p className="text-sm text-gray-400 mb-2">2021 - Présent | Entreprise XYZ</p>
              <p className="text-gray-300">
                Développement d'applications web modernes avec React et Next.js. Mise en place d'animations avancées et optimisation des performances.
              </p>
            </div>
            
            <div className="relative pl-8 border-l-2 border-neon-purple">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-purple"></div>
              <h3 className="text-xl font-semibold mb-2">Développeur Full Stack</h3>
              <p className="text-sm text-gray-400 mb-2">2019 - 2021 | Entreprise ABC</p>
              <p className="text-gray-300">
                Développement d'applications web complètes avec React, Node.js et MongoDB. Collaboration avec les designers pour créer des interfaces utilisateur intuitives.
              </p>
            </div>
            
            <div className="relative pl-8 border-l-2 border-neon-pink">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-pink"></div>
              <h3 className="text-xl font-semibold mb-2">Développeur Web Junior</h3>
              <p className="text-sm text-gray-400 mb-2">2017 - 2019 | Startup DEF</p>
              <p className="text-gray-300">
                Développement de sites web avec HTML, CSS et JavaScript. Apprentissage des frameworks modernes et des bonnes pratiques de développement.
              </p>
            </div>
            
            <div className="relative pl-8 border-l-2 border-neon-green">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-green"></div>
              <h3 className="text-xl font-semibold mb-2">Formation en Développement Web</h3>
              <p className="text-sm text-gray-400 mb-2">2015 - 2017 | École d'Ingénierie</p>
              <p className="text-gray-300">
                Formation en développement web et mobile. Apprentissage des langages de programmation, des bases de données et des méthodologies de projet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}