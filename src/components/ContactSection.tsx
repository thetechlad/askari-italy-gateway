import { Phone, MessageCircle, Download, MapPin, Mail, Clock, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import consultationImage from '@/assets/consultation-luxury.jpg';

export const ContactSection = () => {
  const { language, t } = useLanguage();
  
  const testimonials = [
    {
      quote: language === 'ur' 
        ? '"کورنگی سے روم تک — عسکری نے یہ ممکن بنایا!"' 
        : '"From Korangi to Rome — Askari Made It Happen!"',
      author: 'Ali Tufail',
      location: 'Politecnico di Milano'
    },
    {
      quote: language === 'ur'
        ? '"میرا SOP ایک آفت تھا جب تک عسکری نے اسے سنبھالا نہیں لیا۔"'
        : '"My SOP was a disaster until Askari took over."',
      author: 'Sara Khan',
      location: 'Sapienza University, Rome'
    },
    {
      quote: language === 'ur'
        ? '"میرے پاس کوئی NTN نہیں تھا، کوئی اندازہ نہیں تھا۔"'
        : '"I had no NTN, no clue. These guys handled it all."',
      author: 'Faisal Mehmood',
      location: 'Student Visa Approved'
    }
  ];
  
  return (
    <section id="contact" className="section-tom-ford gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tom Ford Section Header */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
              {language === 'ur' ? 'رابطہ' : 'CONTACT'}
            </span>
            <div className="w-16 h-px bg-accent/60 mx-auto mt-4"></div>
          </div>
          
          <h2 className={`text-luxury mb-8 text-primary-foreground ${language === 'ur' ? 'urdu-elegant' : ''}`}>
            {language === 'ur' ? 'آپ کا سفر شروع کرتے ہیں' : 'BEGIN YOUR JOURNEY'}
          </h2>
          
          <p className={`text-elegant text-primary-foreground/80 max-w-2xl mx-auto ${language === 'ur' ? 'urdu-elegant' : ''}`}>
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Form & CTAs */}
          <div className="space-y-8">
            {/* Primary CTAs */}
            <div className="space-y-6">
              <Button className="btn-exclusive w-full group">
                <Phone className="h-5 w-5 mr-3" />
                <span className="relative z-10 tracking-wider uppercase">
                  {t('contact.consultation')}
                </span>
              </Button>
              
              <Button className="btn-ghost-luxury w-full">
                <MessageCircle className="h-5 w-5 mr-3" />
                <span className="relative z-10 tracking-wider uppercase">
                  {t('contact.whatsapp')}
                </span>
              </Button>
              
              <Button className="btn-ghost-luxury w-full">
                <Download className="h-5 w-5 mr-3" />
                <span className="relative z-10 tracking-wider uppercase">
                  {t('contact.checklist')}
                </span>
              </Button>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8 mt-12">
              <div className={`card-tom-ford p-6 bg-background/5 backdrop-blur-xl ${language === 'ur' ? 'text-right' : ''}`}>
                <div className={`flex items-start gap-4 justify-center ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className={`font-medium text-primary-foreground mb-2 tracking-wide ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                      {language === 'ur' ? 'دفاتر' : 'OFFICES'}
                    </h4>
                    <p className={`text-primary-foreground/70 text-sm ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                      {language === 'ur' ? 'کراچی، لاہور، اسلام آباد' : 'Karachi, Lahore, Islamabad'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`card-tom-ford p-6 bg-background/5 backdrop-blur-xl ${language === 'ur' ? 'text-right' : ''}`}>
                <div className={`flex items-start gap-4 justify-center ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className={`font-medium text-primary-foreground mb-2 tracking-wide ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                      {language === 'ur' ? 'ای میل' : 'EMAIL'}
                    </h4>
                    <p className="text-primary-foreground/70 text-sm">
                      info@askariconsultants.pk
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`card-tom-ford p-6 bg-background/5 backdrop-blur-xl ${language === 'ur' ? 'text-right' : ''}`}>
                <div className={`flex items-start gap-4 justify-center ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className={`font-medium text-primary-foreground mb-2 tracking-wide ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                      {language === 'ur' ? 'اوقات کار' : 'HOURS'}
                    </h4>
                    <p className={`text-primary-foreground/70 text-sm ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                      {language === 'ur' ? 'پیر سے جمعہ: 9 بجے سے 6 بجے تک' : 'Monday - Friday: 9 AM - 6 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonials & Visual */}
          <div className="space-y-8">
            {/* Visual Element */}
            <div className="relative">
              <div className="card-dramatic p-8 text-center min-h-[300px] flex flex-col justify-center">
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <img 
                    src={consultationImage} 
                    alt="Luxury consultation" 
                    className="w-full h-full object-cover opacity-30"
                  />
                </div>
                
                <div className="relative z-10">
                  <h3 className={`text-2xl font-light text-accent mb-4 tracking-wider ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                    {language === 'ur' ? 'آپ کی کامیابی ہمارا مشن' : 'YOUR SUCCESS IS OUR MISSION'}
                  </h3>
                  <div className="w-24 h-px bg-accent/60 mx-auto"></div>
                </div>
              </div>
            </div>
            
            {/* Success Stories */}
            <div className="space-y-6">
              <h3 className={`text-xl font-light text-primary-foreground/90 tracking-wide text-center ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                {language === 'ur' ? 'کامیابی کی کہانیاں' : 'SUCCESS STORIES'}
              </h3>
              
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card-tom-ford p-6 bg-background/5 backdrop-blur-xl">
                  <div className={`${language === 'ur' ? 'text-right' : ''}`}>
                    <Quote className={`h-6 w-6 text-accent/60 mb-3 ${language === 'ur' ? 'ml-auto' : ''}`} />
                    <p className={`text-primary-foreground/90 mb-4 italic leading-relaxed ${language === 'ur' ? 'urdu-elegant text-sm' : 'text-sm'}`}>
                      {testimonial.quote}
                    </p>
                    <div className={`${language === 'ur' ? 'text-right' : ''}`}>
                      <p className="text-accent font-medium text-sm">{testimonial.author}</p>
                      <p className="text-primary-foreground/60 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};