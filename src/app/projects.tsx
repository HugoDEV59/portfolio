import { Metadata } from 'next';
import ProjectsSection from '@/components/sections/ProjectsSection';
import Image from 'next/image';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Projets | Portfolio Développeur Web',
  description: 'Découvrez mes projets de développement web, incluant des applications React, des sites e-commerce et des designs interactifs.',
};

const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'web', name: 'Web' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'design', name: 'Design' }
];

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ProjectsSection />
      
      <section className="py-20 px-4 bg-darker">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 neon-text text-center">Études de cas</h2>
          
          <div className="grid grid-cols-1 gap-12">
            <Card glowColor="blue" className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto rounded-md overflow-hidden">
                  <Image
                    src="https://via.placeholder.com/600x800"
                    alt="Étude de cas 1"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 neon-text-blue">Refonte du site web d'une entreprise</h3>
                  <p className="text-gray-300 mb-4">
                    J'ai travaillé sur la refonte complète du site web d'une entreprise de technologie, 
                    en mettant l'accent sur l'expérience utilisateur et les performances.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium mb-2">Le défi</h4>
                      <p className="text-gray-400 text-sm">
                        L'ancien site était lent, non responsive et difficile à naviguer. L'entreprise 
                        souhaitait une refonte complète pour améliorer l'expérience utilisateur et augmenter 
                        les conversions.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">La solution</h4>
                      <p className="text-gray-400 text-sm">
                        J'ai développé un nouveau site avec Next.js et Tailwind CSS, en mettant l'accent 
                        sur la vitesse de chargement, la responsivité et une navigation intuitive.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Les résultats</h4>
                      <p className="text-gray-400 text-sm">
                        Le nouveau site a permis d'augmenter le taux de conversion de 35% et de réduire 
                        le taux de rebond de 25%. Les temps de chargement ont été réduits de 70%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}