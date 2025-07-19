import { ArrowRight, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroSection = () => {
  const { language, t } = useLanguage();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Flag Emoji */}
          <div className="mb-6">
            <span className="text-6xl">🇮🇹</span>
          </div>
          
          {/* Main Headline */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${language === 'ur' ? 'font-elegant leading-relaxed' : 'leading-tight'}`}>
            <span className="text-primary-foreground">
              {t('hero.title')}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto ${language === 'ur' ? 'font-elegant leading-relaxed' : 'leading-relaxed'}`}>
            {t('hero.subtitle')}
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
            <Button className="btn-hero group">
              <Phone className="h-5 w-5 mr-2" />
              {t('hero.cta.consultation')}
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" className="btn-premium bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background/20">
              <FileText className="h-5 w-5 mr-2" />
              {t('hero.cta.services')}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">100+</div>
              <div className={`text-sm text-primary-foreground/80 ${language === 'ur' ? 'font-elegant' : ''}`}>
                {language === 'ur' ? 'طلباء کو بھیجا گیا' : 'Students Placed'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">95%</div>
              <div className={`text-sm text-primary-foreground/80 ${language === 'ur' ? 'font-elegant' : ''}`}>
                {language === 'ur' ? 'ویزا کامیابی کی شرح' : 'Visa Success Rate'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-2">5★</div>
              <div className={`text-sm text-primary-foreground/80 ${language === 'ur' ? 'font-elegant' : ''}`}>
                {language === 'ur' ? 'کلائنٹ کی درجہ بندی' : 'Client Rating'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};