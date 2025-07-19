import { Shield, Award, Globe2, Users, Crown, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import luxuryTexture from '@/assets/luxury-texture.jpg';

export const WhyChooseUs = () => {
  const { language, t } = useLanguage();
  
  const strengths = [
    { key: 'why.strength1', icon: Shield },
    { key: 'why.strength2', icon: Globe2 },
    { key: 'why.strength3', icon: Award },
    { key: 'why.strength4', icon: Users },
    { key: 'why.strength5', icon: Crown }
  ];
  
  return (
    <section id="about" className="section-tom-ford section-dramatic">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tom Ford Section Header */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
              {language === 'ur' ? 'ہماری برتری' : 'OUR EXCELLENCE'}
            </span>
            <div className="w-16 h-px bg-accent/60 mx-auto mt-4"></div>
          </div>
          
          <h2 className={`text-luxury mb-8 ${language === 'ur' ? 'urdu-elegant' : ''}`}>
            {language === 'ur' ? 'کیوں عسکری کنسلٹنٹس؟' : 'WHY ASKARI'}
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className={`text-elegant text-muted-foreground ${language === 'ur' ? 'urdu-elegant' : ''}`}>
              {t('why.description')}
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Dramatic Visual Element */}
          <div className="relative order-2 lg:order-1">
            <div className="card-dramatic p-12 text-center min-h-[500px] flex flex-col justify-center">
              {/* Background Image */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <img 
                  src={luxuryTexture} 
                  alt="Luxury texture" 
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl mb-8 animate-luxury">🇮🇹</div>
                <h3 className={`text-2xl font-light text-accent mb-6 tracking-wider ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                  {language === 'ur' ? 'آپ کا اٹلی کا خواب' : 'YOUR ITALY DREAM'}
                </h3>
                <p className={`text-primary-foreground/90 ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                  {language === 'ur' 
                    ? 'ہم آپ کے خوابوں کو حقیقت بنانے میں مدد کرتے ہیں'
                    : 'Transforming aspirations into achievements'
                  }
                </p>
                
                {/* Location Badge */}
                <div className={`flex items-center justify-center gap-3 mt-8 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className={`text-accent text-sm tracking-widest uppercase ${language === 'ur' ? 'font-elegant' : ''}`}>
                    {t('why.location')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tom Ford Style Strengths */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className={`mb-12 ${language === 'ur' ? 'text-right' : ''}`}>
              <h3 className={`text-2xl font-light mb-6 tracking-wide ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                {language === 'ur' ? 'ہماری بنیادی طاقت' : 'CORE STRENGTHS'}
              </h3>
              <div className={`w-24 h-px bg-primary ${language === 'ur' ? 'ml-auto' : ''}`}></div>
            </div>
            
            {strengths.map((strength, index) => (
              <div key={index} className={`group card-tom-ford p-6 ${language === 'ur' ? 'text-right' : ''}`}>
                <div className={`flex items-start gap-6 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-dramatic">
                      <strength.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`text-lg font-medium mb-2 group-hover:text-primary transition-smooth ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                      {t(strength.key)}
                    </h4>
                    <div className={`w-8 h-px bg-accent/40 transition-dramatic group-hover:w-16 ${language === 'ur' ? 'ml-auto' : ''}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};