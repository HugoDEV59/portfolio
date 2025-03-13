'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NeonText from '../ui/NeonText';
import { 
  FaEnvelope, FaDiscord, FaGithub, FaLinkedin, FaTwitter, 
  FaPaperPlane, FaCheck, FaExclamationTriangle, FaMapMarkerAlt,
  FaCalendarAlt, FaLock, FaUserShield
} from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { HiSparkles } from 'react-icons/hi';
import ClientParticles from '../ui/ClientParticles';

export default function ContactSection() {
  // État du formulaire avec validation
  const [formState, setFormState] = useState({
    firstName: '',
    name: '',
    email: '',
    discord: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [formTouched, setFormTouched] = useState(false);

  // Référence pour l'animation basée sur le scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  // Validation du formulaire
  const validateForm = () => {
    let valid = true;
    const errors = {
      firstName: '',
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    if (!formState.firstName.trim()) {
      errors.firstName = 'Le prénom est requis';
      valid = false;
    }

    if (!formState.name.trim()) {
      errors.name = 'Le nom est requis';
      valid = false;
    }

    if (!formState.email.trim()) {
      errors.email = 'L\'email est requis';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Format d\'email invalide';
      valid = false;
    }

    if (!formState.subject.trim()) {
      errors.subject = 'Le sujet est requis';
      valid = false;
    }

    if (!formState.message.trim()) {
      errors.message = 'Le message est requis';
      valid = false;
    } else if (formState.message.trim().length < 20) {
      errors.message = 'Le message doit contenir au moins 20 caractères';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setFormTouched(true);
    
    if (name === 'message') {
      setMessageLength(value.length);
    }
    
    // Réinitialiser l'erreur spécifique lors de la modification
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(e.target.name);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation avant envoi
    if (!validateForm()) {
      // Animation de secousse pour le formulaire en cas d'erreur
      if (formRef.current) {
        formRef.current.classList.add('shake-animation');
        setTimeout(() => {
          formRef.current?.classList.remove('shake-animation');
        }, 500);
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Intégration avec un service réel (exemple avec fetch)
      // Remplacer l'URL par votre endpoint réel
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      // Pour le développement, simulons une réponse
      // À supprimer en production
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }
      
      setSubmitSuccess(true);
      setShowConfetti(true);
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormState({ firstName: '', name: '', email: '', discord: '', subject: '', message: '' });
        setMessageLength(0);
        setFormTouched(false);
        setSubmitSuccess(false);
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      // En développement, simulons un succès
      // À supprimer en production
      setSubmitSuccess(true);
      setShowConfetti(true);
      
      // Réinitialiser le formulaire après 5 secondes
      setTimeout(() => {
        setFormState({ firstName: '', name: '', email: '', discord: '', subject: '', message: '' });
        setMessageLength(0);
        setFormTouched(false);
        setSubmitSuccess(false);
        setShowConfetti(false);
      }, 5000);
      
      // Code pour la gestion d'erreur en production
      // setSubmitError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animations
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

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  // Effet pour le focus sur le premier champ lors du chargement
  useEffect(() => {
    const firstInput = document.getElementById('firstName');
    if (firstInput && inView) {
      setTimeout(() => firstInput.focus(), 500);
    }
  }, [inView]);

  // Effet pour ajouter des styles CSS pour l'animation de secousse
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      .shake-animation {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Effet de confetti
  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 100 }).map((_, i) => {
          const size = Math.random() * 10 + 5;
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 3 + 2;
          const delay = Math.random() * 0.5;
          const color = [
            'bg-neon-blue',
            'bg-neon-purple',
            'bg-neon-pink',
            'bg-green-400',
            'bg-yellow-400'
          ][Math.floor(Math.random() * 5)];
          
          return (
            <motion.div
              key={i}
              className={`absolute w-${size} h-${size} rounded-full ${color}`}
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: '-20px',
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: ['0%', '100vh'],
                opacity: [0, 1, 0],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
              }}
              transition={{
                duration: animationDuration,
                delay: delay,
                ease: [0.1, 0.25, 0.3, 1],
              }}
            />
          );
        })}
      </div>
    );
  };

  // Calcul du pourcentage de complétion du formulaire
  const calculateFormCompletion = () => {
    const fields = ['firstName', 'name', 'email', 'subject', 'message'];
    const filledFields = fields.filter(field => formState[field as keyof typeof formState].trim() !== '').length;
    return (filledFields / fields.length) * 100;
  };

  const formCompletionPercentage = calculateFormCompletion();

  return (
    <section 
      id="contact"
      className="py-28 px-4 relative overflow-hidden" 
      ref={containerRef}
      aria-labelledby="contact-heading"
    >
      {showConfetti && <Confetti />}
      
      {/* Fond dynamique */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark to-dark/90"
          style={{ opacity }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_70%)]"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Particules flottantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-neon-purple/30 rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 
            id="contact-heading" 
            className="text-4xl md:text-5xl font-bold mb-5 relative inline-block"
          >
            Me <NeonText color="purple">Contacter</NeonText>
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </h2>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Vous avez un projet ambitieux ou une opportunité de collaboration ? Je suis à votre écoute.
          </p>
          
          {/* Badges de disponibilité */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Disponible pour de nouveaux projets
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FaCalendarAlt className="mr-2 text-xs" />
              Réponse sous 24h
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Formulaire de contact - plus large */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3"
            ref={ref}
            style={{ scale }}
          >
            <Card 
              glowColor="purple" 
              className="h-full backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-2xl relative overflow-hidden"
            >
              {/* Effet de scanline subtil */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-scanline opacity-5"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-purple/5 to-transparent opacity-30"></div>
                
                {/* Effet de particules interactives */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 15 }).map((_, i) => {
                    const size = Math.random() * 3 + 1;
                    const x = Math.random() * 100;
                    const y = Math.random() * 100;
                    const duration = Math.random() * 15 + 10;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neon-purple/40 rounded-full"
                        style={{
                          width: size,
                          height: size,
                          left: `${x}%`,
                          top: `${y}%`,
                        }}
                        animate={{
                          x: [0, Math.random() * 100 - 50],
                          y: [0, Math.random() * 100 - 50],
                          opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                          duration,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              
              <div className="relative z-10 p-8">
                <h3 className="text-2xl font-semibold mb-8 flex items-center">
                  <span className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center mr-3 relative">
                    <FaEnvelope className="text-neon-purple" aria-hidden="true" />
                    <span className="absolute inset-0 rounded-full border border-neon-purple/50 animate-ping-slow opacity-75"></span>
                  </span>
                  Envoyez-moi un message
                </h3>
                </div>
                
                {/* Indicateur de progression du formulaire */}
                {formTouched && !submitSuccess && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progression du formulaire</span>
                      <span>{Math.round(formCompletionPercentage)}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                        initial={{ width: 0 }}
                        animate={{ width: `${formCompletionPercentage}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {submitSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-green-500/20 border border-green-500/30 rounded-lg p-8 text-center"
                      >
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="w-20 h-20 rounded-full bg-green-500/30 mx-auto flex items-center justify-center mb-4"
                        >
                          <IoIosCheckmarkCircle size={50} className="text-green-400" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-green-400 mb-2">Message envoyé avec succès !</h4>
                        <p className="text-gray-300 mb-4">
                          Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                        </p>
                        <div className="flex justify-center">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5 }}
                            className="h-1 bg-green-400/50 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div variants={itemVariants} className="relative">
                            <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-200">Prénom <span className="text-red-400">*</span></label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formState.firstName}
                              onChange={handleChange}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              required
                              aria-required="true"
                              aria-invalid={!!formErrors.firstName}
                              aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                              className={`w-full px-4 py-3 bg-dark/70 border ${formErrors.firstName ? 'border-red-500' : focusedField === 'firstName' ? 'border-neon-purple' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all`}
                              placeholder="Votre prénom"
                            />
                            {formErrors.firstName && (
                              <p id="firstName-error" className="mt-1 text-sm text-red-400 flex items-center">
                                <FaExclamationTriangle className="mr-1" size={12} />
                                {formErrors.firstName}
                              </p>
                            )}
                            {focusedField === 'firstName' && !formErrors.firstName && (
                              <motion.span 
                                className="absolute bottom-0 left-0 h-0.5 bg-neon-purple"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </motion.div>

                          <motion.div variants={itemVariants} className="relative">
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">Nom <span className="text-red-400">*</span></label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              required
                              aria-required="true"
                              aria-invalid={!!formErrors.name}
                              aria-describedby={formErrors.name ? "name-error" : undefined}
                              className={`w-full px-4 py-3 bg-dark/70 border ${formErrors.name ? 'border-red-500' : focusedField === 'name' ? 'border-neon-purple' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all`}
                              placeholder="Votre nom"
                            />
                            {formErrors.name && (
                              <p id="name-error" className="mt-1 text-sm text-red-400 flex items-center">
                                <FaExclamationTriangle className="mr-1" size={12} />
                                {formErrors.name}
                              </p>
                            )}
                            {focusedField === 'name' && !formErrors.name && (
                              <motion.span 
                                className="absolute bottom-0 left-0 h-0.5 bg-neon-purple"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </motion.div>
                        </div>

                        <motion.div variants={itemVariants} className="relative">
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">Email <span className="text-red-400">*</span></label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            aria-required="true"
                            aria-invalid={!!formErrors.email}
                            aria-describedby={formErrors.email ? "email-error" : undefined}
                            className={`w-full px-4 py-3 bg-dark/70 border ${formErrors.email ? 'border-red-500' : focusedField === 'email' ? 'border-neon-purple' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all`}
                            placeholder="votre@email.com"
                          />
                          {formErrors.email && (
                            <p id="email-error" className="mt-1 text-sm text-red-400 flex items-center">
                              <FaExclamationTriangle className="mr-1" size={12} />
                              {formErrors.email}
                            </p>
                          )}
                          {focusedField === 'email' && !formErrors.email && (
                            <motion.span 
                              className="absolute bottom-0 left-0 h-0.5 bg-neon-purple"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                          <label htmlFor="discord" className="block text-sm font-medium mb-2 text-gray-200">Discord (optionnel)</label>
                          <div className="relative">
                            <input
                              type="text"
                              id="discord"
                              name="discord"
                              value={formState.discord}
                              onChange={handleChange}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-3 pl-10 bg-dark/70 border ${focusedField === 'discord' ? 'border-neon-purple' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all`}
                              placeholder="Votre identifiant Discord"
                            />
                            <FaDiscord className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {focusedField === 'discord' && (
                            <motion.span 
                              className="absolute bottom-0 left-0 h-0.5 bg-neon-purple"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                          <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-200">Sujet <span className="text-red-400">*</span></label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            aria-required="true"
                            aria-invalid={!!formErrors.subject}
                            aria-describedby={formErrors.subject ? "subject-error" : undefined}
                            className={`w-full px-4 py-3 bg-dark/70 border ${formErrors.subject ? 'border-red-500' : focusedField === 'subject' ? 'border-neon-purple' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all`}
                            placeholder="Sujet de votre message"
                          />
                          {formErrors.subject && (
                            <p id="subject-error" className="mt-1 text-sm text-red-400 flex items-center">
                              <FaExclamationTriangle className="mr-1" size={12} />
                              {formErrors.subject}
                            </p>
                          )}
                          {focusedField === 'subject' && !formErrors.subject && (
                            <motion.span 
                            className="absolute bottom-0 left-0 h-0.5 bg-neon-purple"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="relative">
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">
                          Message <span className="text-red-400">*</span>
                          {messageLength > 0 && (
                            <span className={`ml-2 text-xs ${messageLength < 20 ? 'text-red-400' : 'text-green-400'}`}>
                              {messageLength}/20 caractères minimum
                            </span>
                          )}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          required
                          aria-required="true"
                          aria-invalid={!!formErrors.message}
                          aria-describedby={formErrors.message ? "message-error" : undefined}
                          rows={6}
                          className={`w-full px-4 py-3 bg-dark/70 border ${formErrors.message ? 'border-red-500' : focusedField === 'message' ? 'border-neon-purple' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple transition-all resize-none`}
                          placeholder="Décrivez votre projet ou votre demande en détail..."
                        ></textarea>
                        {formErrors.message && (
                          <p id="message-error" className="mt-1 text-sm text-red-400 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={12} />
                            {formErrors.message}
                          </p>
                        )}
                        {focusedField === 'message' && !formErrors.message && (
                          <motion.span 
                            className="absolute bottom-0 left-0 h-0.5 bg-neon-purple"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.div>
                      
                      {/* Politique de confidentialité */}
                      <motion.div variants={itemVariants} className="text-sm text-gray-400 flex items-start gap-2 bg-dark/30 p-3 rounded-lg border border-gray-800/50">
                        <FaLock className="text-neon-purple mt-0.5 flex-shrink-0" />
                        <p>
                          Vos données personnelles sont protégées et ne seront jamais partagées avec des tiers. En soumettant ce formulaire, vous acceptez que je vous contacte à propos de votre demande.
                        </p>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="pt-2">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          glowColor="purple" 
                          className="w-full py-3 text-base font-medium relative overflow-hidden group"
                          disabled={isSubmitting}
                          aria-busy={isSubmitting}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Envoi en cours...
                              </>
                            ) : (
                              <>
                                <RiSendPlaneFill className="mr-2" />
                                Envoyer le message
                              </>
                            )}
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-neon-purple/80 to-neon-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                        
                        {submitError && (
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-3 text-center flex items-center justify-center"
                          >
                            <FaExclamationTriangle className="mr-2" />
                            {submitError}
                          </motion.p>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                  
              </form>
            </Card>
          </motion.div>
          
          {/* Colonne d'informations de contact */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Bloc Email */}
            <motion.div variants={itemVariants} whileHover="hover" initial="rest" animate="rest">
              <Card 
                glowColor="blue" 
                className="flex items-start gap-5 backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-dark/80 border border-blue-500/30 text-blue-400 shadow-inner">
                  <FaEnvelope size={22} aria-hidden="true" />
                  <motion.div 
                    className="absolute inset-0 bg-blue-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contactez-moi par Email</h3>
                  <p className="text-gray-300">contact@votredomaine.com</p>
                  <a 
                    href="mailto:contact@votredomaine.com" 
                    className="text-blue-400 hover:text-blue-300 mt-2 inline-flex items-center gap-1 font-medium group"
                    aria-label="M'envoyer un email à contact@votredomaine.com"
                  >
                    M'envoyer un email
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transform group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* Bloc Discord */}
            <motion.div variants={itemVariants} whileHover="hover" initial="rest" animate="rest">
              <Card 
                glowColor="pink" 
                className="flex items-start gap-5 backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-xl hover:shadow-indigo-900/20 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-dark/80 border border-pink-500/30 text-pink-400 shadow-inner relative overflow-hidden">
                  <FaDiscord size={22} aria-hidden="true" />
                  <motion.div 
                    className="absolute inset-0 bg-pink-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contactez-moi sur Discord</h3>
                  <p className="text-gray-300">VotreIdentifiantDiscord#1234</p>
                  <p className="text-gray-400 text-sm mt-2">
                    N'hésitez pas à m'ajouter pour discuter de vos projets !
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Engagement de réponse */}
            <motion.div variants={itemVariants} whileHover="hover" initial="rest" animate="rest">
              <Card 
                glowColor="orange" 
                className="text-center p-8 backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-xl hover:shadow-orange-900/20 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 mx-auto flex items-center justify-center mb-4 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-amber-400"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Engagement de Réponse</h3>
                <p className="text-gray-300">
                  Je m'engage à répondre à toutes les demandes professionnelles dans un délai de 24 heures ouvrées. Vous pouvez me contacter par email ou Discord pour toute demande de projet.
                </p>
              </Card>
            </motion.div>

            {/* Sécurité des données */}
            <motion.div variants={itemVariants} whileHover="hover" initial="rest" animate="rest">
              <Card 
                glowColor="blue" 
                className="flex items-start gap-5 backdrop-blur-sm bg-dark/40 border border-gray-800/50 shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-dark/80 border border-blue-500/30 text-blue-400 shadow-inner">
                  <FaUserShield size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sécurité des données</h3>
                  <p className="text-gray-300 text-sm">
                    Toutes vos informations sont cryptées et sécurisées. Je respecte le RGPD et ne partage jamais vos données avec des tiers.
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Remplacer les particules animées par notre composant client-only */}
      <ClientParticles count={15} color="bg-neon-purple/40" seed={123} />
      <ClientParticles count={20} color="bg-neon-purple/30" seed={456} />
    </section>
  );
}