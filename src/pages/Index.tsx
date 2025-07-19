import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ServicesSection } from '@/components/ServicesSection';
import { PackagesSection } from '@/components/PackagesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <WhyChooseUs />
        <ServicesSection />
        <PackagesSection />
        <ContactSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
