/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactiver la vérification ESLint pendant la compilation
    ignoreDuringBuilds: true,
  },
  output: 'export', // Pour générer un site statique déployable sur Netlify
  images: {
    unoptimized: true, // Nécessaire pour le déploiement statique
  },
};

module.exports = nextConfig; 