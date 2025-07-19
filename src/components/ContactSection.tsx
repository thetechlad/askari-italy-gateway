import { Phone, MessageCircle, Download, MapPin, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const ContactSection = () => {
  const { language, t } = useLanguage();
  
  return (
    <section id="contact" className="section-padding gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary-foreground ${language === 'ur' ? 'font-elegant' : ''}`}>
            {t('contact.title')}
          </h2>
          <p className={`text-xl text-primary-foreground/90 ${language === 'ur' ? 'font-elegant' : ''}`}>
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* CTA Buttons */}
          <div className="space-y-6">
            <Button className="btn-accent w-full group">
              <Phone className="h-5 w-5 mr-3" />
              {t('contact.consultation')}
            </Button>
            
            <Button variant="outline" className="btn-premium bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background/20 w-full">
              <MessageCircle className="h-5 w-5 mr-3" />
              {t('contact.whatsapp')}
            </Button>
            
            <Button variant="outline" className="btn-premium bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background/20 w-full">
              <Download className="h-5 w-5 mr-3" />
              {t('contact.checklist')}
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className={`flex items-center gap-4 ${language === 'ur' ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className={`font-semibold text-primary-foreground mb-1 ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {language === 'ur' ? 'دفاتر' : 'Offices'}
                </h4>
                <p className={`text-primary-foreground/80 text-sm ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {language === 'ur' ? 'کراچی، لاہور، اسلام آباد' : 'Karachi, Lahore, Islamabad'}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center gap-4 ${language === 'ur' ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className={`font-semibold text-primary-foreground mb-1 ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {language === 'ur' ? 'ای میل' : 'Email'}
                </h4>
                <p className="text-primary-foreground/80 text-sm">
                  info@askariconsultants.pk
                </p>
              </div>
            </div>
            
            <div className={`flex items-center gap-4 ${language === 'ur' ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className={`font-semibold text-primary-foreground mb-1 ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {language === 'ur' ? 'اوقات کار' : 'Working Hours'}
                </h4>
                <p className={`text-primary-foreground/80 text-sm ${language === 'ur' ? 'font-elegant' : ''}`}>
                  {language === 'ur' ? 'پیر سے جمعہ: 9 بجے سے 6 بجے تک' : 'Mon - Fri: 9 AM - 6 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Stories Preview */}
        <div className="mt-16 text-center">
          <h3 className={`text-2xl font-bold text-primary-foreground mb-8 ${language === 'ur' ? 'font-elegant' : ''}`}>
            {language === 'ur' ? 'کامیابی کی کہانیاں' : 'Success Stories'}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6">
              <p className={`text-primary-foreground/90 mb-4 italic ${language === 'ur' ? 'font-elegant text-sm' : 'text-sm'}`}>
                {language === 'ur' 
                  ? '"کورنگی سے روم تک — عسکری نے یہ ممکن بنایا!"' 
                  : '"From Korangi to Rome — Askari Made It Happen!"'
                }
              </p>
              <p className={`text-accent font-medium ${language === 'ur' ? 'font-elegant text-sm' : 'text-sm'}`}>
                - Ali Tufail, Politecnico di Milano
              </p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6">
              <p className={`text-primary-foreground/90 mb-4 italic ${language === 'ur' ? 'font-elegant text-sm' : 'text-sm'}`}>
                {language === 'ur'
                  ? '"میرا SOP ایک آفت تھا جب تک عسکری نے اسے سنبھالا نہیں لیا۔ Sapienza میں داخلہ مل گیا!"'
                  : '"My SOP was a disaster until Askari took over. Got into Sapienza!"'
                }
              </p>
              <p className={`text-accent font-medium ${language === 'ur' ? 'font-elegant text-sm' : 'text-sm'}`}>
                - Sara Khan, Rome
              </p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6">
              <p className={`text-primary-foreground/90 mb-4 italic ${language === 'ur' ? 'font-elegant text-sm' : 'text-sm'}`}>
                {language === 'ur'
                  ? '"میرے پاس کوئی NTN نہیں تھا، کوئی اندازہ نہیں تھا۔ ان لوگوں نے سب کچھ سنبھال لیا۔"'
                  : '"I had no NTN, no clue. These guys handled it all."'
                }
              </p>
              <p className={`text-accent font-medium ${language === 'ur' ? 'font-elegant text-sm' : 'text-sm'}`}>
                - Faisal Mehmood
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};