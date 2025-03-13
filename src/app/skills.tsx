import { Metadata } from 'next';
import SkillsSection from '@/components/sections/SkillsSection';

export const metadata: Metadata = {
  title: 'Compétences | Portfolio Développeur Web',
  description: 'Découvrez mes compétences techniques en développement web, design et gestion de projet.',
};

export default function SkillsPage() {
  return (
    <div className="pt-16">
      <SkillsSection />
      
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 neon-text text-center">Mes certifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glassmorphism rounded-lg p-6 border border-neon-blue/30 hover:border-neon-blue transition-colors">
              <h3 className="text-xl font-semibold mb-2">Certification React Developer</h3>
              <p className="text-sm text-gray-400 mb-4">Meta • 2022</p>
              <p className="text-gray-300 text-sm">
                Certification avancée en développement d'applications React, incluant les hooks, le state management et les performances.
              </p>
            </div>
            
            <div className="glassmorphism rounded-lg p-6 border border-neon-purple/30 hover:border-neon-purple transition-colors">
              <h3 className="text-xl font-semibold mb-2">AWS Certified Developer</h3>
              <p className="text-sm text-gray-400 mb-4">Amazon Web Services • 2021</p>
              <p className="text-gray-300 text-sm">
                Certification pour le développement et le déploiement d'applications sur l'infrastructure AWS.
              </p>
            </div>
            
            <div className="glassmorphism rounded-lg p-6 border border-neon-pink/30 hover:border-neon-pink transition-colors">
              <h3 className="text-xl font-semibold mb-2">UI/UX Design Fundamentals</h3>
              <p className="text-sm text-gray-400 mb-4">Google • 2020</p>
              <p className="text-gray-300 text-sm">
                Formation sur les principes fondamentaux du design d'interface utilisateur et de l'expérience utilisateur.
              </p>
            </div>
            
            <div className="glassmorphism rounded-lg p-6 border border-neon-green/30 hover:border-neon-green transition-colors">
              <h3 className="text-xl font-semibold mb-2">Full Stack JavaScript</h3>
              <p className="text-sm text-gray-400 mb-4">freeCodeCamp • 2019</p>
              <p className="text-gray-300 text-sm">
                Certification complète en développement full stack avec JavaScript, Node.js et MongoDB.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}