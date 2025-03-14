import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { 
  FaEnvelope, FaDiscord, FaExclamationTriangle, FaLock
} from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoIosCheckmarkCircle } from 'react-icons/io';

// Formulaire caché pour Netlify (sera rendu une seule fois)
export const NetlifyFormDetection = () => (
  <div>
    <form name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact" />
    <input type="text" name="firstName" />
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="discord" />
    <input type="text" name="subject" />
    <textarea name="message"></textarea>
  </form>
  </div>
  
);

export default function ContactForm() {
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

  const formRef = useRef<HTMLFormElement>(null);

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
      // Création des données du formulaire pour Netlify
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Envoi du formulaire à Netlify
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }
      
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

  // Calcul du pourcentage de complétion du formulaire
  const calculateFormCompletion = () => {
    const fields = ['firstName', 'name', 'email', 'subject', 'message'];
    const filledFields = fields.filter(field => formState[field as keyof typeof formState].trim() !== '').length;
    return (filledFields / fields.length) * 100;
  };

  const formCompletionPercentage = calculateFormCompletion();

  return (
    <>
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
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" name="contact">
        {/* Champ caché nécessaire pour Netlify */}
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
                <motion.div className="relative">
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

                <motion.div className="relative">
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

              <motion.div className="relative">
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

              <motion.div className="relative">
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

              <motion.div className="relative">
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
              
              <motion.div className="relative">
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
              <motion.div className="text-sm text-gray-400 flex items-start gap-2 bg-dark/30 p-3 rounded-lg border border-gray-800/50">
                <FaLock className="text-neon-purple mt-0.5 flex-shrink-0" />
                <p>
                  Vos données personnelles sont protégées et ne seront jamais partagées avec des tiers. En soumettant ce formulaire, vous acceptez que je vous contacte à propos de votre demande.
                </p>
              </motion.div>
              
              <motion.div className="pt-2">
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
    </>
  );
} 