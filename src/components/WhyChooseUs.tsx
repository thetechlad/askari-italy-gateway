import { CheckCircle, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const WhyChooseUs = () => {
  const { language, t } = useLanguage();
  
  const strengths = [
    'why.strength1',
    'why.strength2', 
    'why.strength3',
    'why.strength4',
    'why.strength5'
  ];
  
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient ${language === 'ur' ? 'font-elegant' : ''}`}>
            {t('why.title')}
          </h2>
          <h3 className={`text-xl md:text-2xl font-semibold text-primary mb-6 ${language === 'ur' ? 'font-elegant' : ''}`}>
            {t('why.subtitle')}
          </h3>
          <p className={`text-lg text-muted-foreground leading-relaxed ${language === 'ur' ? 'font-elegant' : ''}`}>
            {t('why.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Strengths List */}
          <div className="space-y-6">
            <h4 className={`text-xl font-semibold text-foreground mb-6 ${language === 'ur' ? 'font-elegant text-right' : ''}`}>
              ✅ {language === 'ur' ? 'ہماری بنیادی طاقت:' : 'Our Core Strengths:'}
            </h4>
            
            {strengths.map((strength, index) => (
              <div key={index} className={`flex items-start gap-4 ${language === 'ur' ? 'flex-row-reverse text-right' : ''}`}>
                <CheckCircle className="h-6 w-6 text-secondary mt-0.5 flex-shrink-0" />
                <span className={`text-foreground ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {t(strength)}
                </span>
              </div>
            ))}
            
            <div className={`flex items-center gap-3 mt-8 p-4 bg-accent/10 rounded-lg ${language === 'ur' ? 'flex-row-reverse text-right' : ''}`}>
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
              <span className={`text-primary font-medium ${language === 'ur' ? 'font-elegant' : ''}`}>
                {t('why.location')}
              </span>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            <div className="card-premium p-8 text-center">
              <div className="text-6xl mb-6">🎓</div>
              <h4 className={`text-xl font-semibold text-foreground mb-4 ${language === 'ur' ? 'font-elegant' : ''}`}>
                {language === 'ur' ? 'آپ کا اٹلی کا خواب' : 'Your Italy Dream'}
              </h4>
              <p className={`text-muted-foreground ${language === 'ur' ? 'font-elegant' : ''}`}>
                {language === 'ur' 
                  ? 'ہم آپ کے خوابوں کو حقیقت بنانے میں مدد کرتے ہیں'
                  : 'We help transform your dreams into reality'
                }
              </p>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary/20 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};