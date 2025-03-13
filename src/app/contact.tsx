import { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact | Portfolio Développeur Web',
  description: 'Contactez-moi pour discuter de vos projets de développement web ou pour toute autre question.',
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  );
}