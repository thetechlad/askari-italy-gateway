import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-italy.jpg';

export const HeroSection = () => {
  const { language, t } = useLanguage();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Italian cityscape" 
          className="w-full h-full object-cover"
        />
        <div className="overlay-luxury"></div>
        <div className="overlay-texture"></div>
      </div>
      
      {/* Dramatic Geometric Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-accent animate-luxury"></div>
        <div className="absolute bottom-0 right-0 w-1 h-full bg-secondary/30 animate-dramatic"></div>
        <div className="absolute top-1/4 right-1/4 w-px h-64 bg-accent/50 rotate-45 animate-luxury"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-px bg-secondary/40 animate-dramatic"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Tom Ford Style Typography */}
          <div className="text-center mb-16">
            {/* Luxury Brand Identifier */}
            <div className={`mb-8 ${language === 'ur' ? 'urdu-elegant' : ''}`}>
              <span className="text-accent text-sm md:text-base font-medium tracking-[0.3em] uppercase">
                {language === 'ur' ? 'عسکری کنسلٹنٹس' : 'ASKARI CONSULTANTS'}
              </span>
              <div className="w-24 h-px bg-accent/60 mx-auto mt-4"></div>
            </div>
            
            {/* Hero Typography - Tom Ford Style */}
            <h1 className={`text-hero mb-8 ${language === 'ur' ? 'urdu-elegant leading-relaxed' : ''}`}>
              <span className="block text-primary-foreground mb-4">
                {language === 'ur' ? 'اٹلی' : 'ITALY'}
              </span>
              <span className="block text-accent text-3xl md:text-5xl lg:text-6xl font-light tracking-wider">
                {language === 'ur' ? 'آپ کا اگلا' : 'YOUR NEXT'}
              </span>
              <span className="block text-primary-foreground">
                {language === 'ur' ? 'باب' : 'CHAPTER'}
              </span>
            </h1>
            
            {/* Sophisticated Subtitle */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className={`text-elegant text-primary-foreground/90 ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                {language === 'ur' 
                  ? 'دنیا کی سب سے خوبصورت تہذیب میں داخل ہونے کا راستہ'
                  : 'Gateway to the world\'s most beautiful civilization'
                }
              </p>
              <div className="w-16 h-px bg-accent mx-auto mt-6"></div>
            </div>
          </div>
          
          {/* Tom Ford Style CTA Section */}
          <div className="flex flex-col items-center space-y-8">
            {/* Primary CTA */}
            <div className={`flex flex-col sm:flex-row gap-6 ${language === 'ur' ? 'sm:flex-row-reverse' : ''}`}>
              <Button variant="luxury" className="group relative z-10">
                <span className="relative z-10 flex items-center">
                  {t('hero.cta.consultation')}
                  <ArrowRight className="ml-3 h-4 w-4 transition-dramatic group-hover:translate-x-2" />
                </span>
              </Button>
              
              <Button variant="outline" className="group border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Play className="mr-3 h-4 w-4" />
                <span className="relative z-10">
                  {language === 'ur' ? 'ہماری کہانی' : 'WATCH STORY'}
                </span>
              </Button>
            </div>
            
            {/* Prestigious Stats - Tom Ford Style */}
            <div className="grid grid-cols-3 gap-12 mt-20 max-w-2xl">
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-light text-accent mb-2 transition-dramatic group-hover:scale-110">
                  100+
                </div>
                <div className={`text-xs text-primary-foreground/70 tracking-widest uppercase ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {language === 'ur' ? 'کامیاب کیسز' : 'SUCCESS CASES'}
                </div>
                <div className="w-8 h-px bg-accent/40 mx-auto mt-2 transition-dramatic group-hover:w-12"></div>
              </div>
              
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-light text-accent mb-2 transition-dramatic group-hover:scale-110">
                  95%
                </div>
                <div className={`text-xs text-primary-foreground/70 tracking-widest uppercase ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {language === 'ur' ? 'ویزا ریٹ' : 'VISA RATE'}
                </div>
                <div className="w-8 h-px bg-accent/40 mx-auto mt-2 transition-dramatic group-hover:w-12"></div>
              </div>
              
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-light text-accent mb-2 transition-dramatic group-hover:scale-110">
                  5★
                </div>
                <div className={`text-xs text-primary-foreground/70 tracking-widest uppercase ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {language === 'ur' ? 'ریٹنگ' : 'RATING'}
                </div>
                <div className="w-8 h-px bg-accent/40 mx-auto mt-2 transition-dramatic group-hover:w-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tom Ford Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <div className="w-px h-16 bg-accent/40 animate-pulse"></div>
          <div className="text-xs text-primary-foreground/60 tracking-widest uppercase mt-4">
            {language === 'ur' ? 'دریافت کریں' : 'DISCOVER'}
          </div>
        </div>
      </div>
    </section>
  );
};