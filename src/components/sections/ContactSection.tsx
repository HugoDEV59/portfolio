'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setFormState({ name: '', email: '', subject: '', message: '' });
      setSubmitSuccess(false);
    }, 3000);
  };

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
    <section className="py-20 px-4 relative overflow-hidden" id="contact">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Me <span className="neon-text-purple">Contacter</span>
          </h2>
          <div className="w-20 h-1 bg-neon-purple mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Formulaire de contact */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card glowColor="purple" className="h-full">
              <h3 className="text-2xl font-semibold mb-6">Envoyez-moi un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-dark/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all"
                    placeholder="Votre nom"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-dark/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all"
                    placeholder="votre@email.com"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-dark/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all"
                    placeholder="Sujet de votre message"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-dark/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all resize-none"
                    placeholder="Votre message..."
                  ></textarea>
                </motion.div>
                
                <motion.div variants={itemVariants} className="pt-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    glowColor="purple" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : submitSuccess ? 'Message envoyé !' : 'Envoyer le message'}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
          
          {/* Informations de contact */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants}>
              <Card glowColor="blue" className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-dark/50 border border-neon-blue/30 text-neon-blue">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Email</h3>
                  <p className="text-gray-300">contact@votredomaine.com</p>
                  <a href="mailto:contact@votredomaine.com" className="text-neon-blue hover:underline mt-1 inline-block">
                    M'envoyer un email
                  </a>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card glowColor="pink" className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-dark/50 border border-neon-pink/30 text-neon-pink">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Téléphone</h3>
                  <p className="text-gray-300">+33 6 12 34 56 78</p>
                  <a href="tel:+33612345678" className="text-neon-pink hover:underline mt-1 inline-block">
                    M'appeler
                  </a>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card glowColor="green" className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-dark/50 border border-neon-green/30 text-neon-green">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Localisation</h3>
                  <p className="text-gray-300">Paris, France</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Disponible pour des projets à distance ou en présentiel
                  </p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-auto">
              <Card glowColor="purple" className="text-center p-8">
                <h3 className="text-xl font-semibold mb-3">Délai de réponse</h3>
                <p className="text-gray-300">
                  Je m'engage à répondre à toutes les demandes dans un délai de 24 à 48 heures.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Éléments visuels décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-radial from-neon-purple/10 via-transparent to-transparent blur-xl"></div>
        
        <div className="absolute top-[15%] left-[10%] w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-slow"></div>
        <div className="absolute bottom-[25%] right-[15%] w-2 h-2 rounded-full bg-neon-purple animate-pulse-slow"></div>
        <div className="absolute top-[60%] left-[20%] w-1 h-1 rounded-full bg-neon-pink animate-pulse-slow"></div>
      </div>
    </section>
  );
} 