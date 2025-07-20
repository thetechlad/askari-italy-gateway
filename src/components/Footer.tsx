import { useLanguage } from '@/contexts/LanguageContext';
// Using uploaded logo directly

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className={`flex items-center gap-3 mb-2 ${language === 'ur' ? 'justify-end' : ''}`}>
              <img src="/lovable-uploads/8debdb18-961f-4e5f-a180-153f391457b1.png" alt="Askari Consultants" className="h-8 w-auto" />
              <div className={`text-xl font-bold ${language === 'ur' ? 'font-elegant' : ''}`}>
                {language === 'ur' ? 'عسکری کنسلٹنٹس' : 'Askari Consultants'}
              </div>
            </div>
            <p className={`text-primary-foreground/80 mb-4 ${language === 'ur' ? 'font-elegant text-right text-sm' : 'text-sm'}`}>
              {language === 'ur' 
                ? 'آپ کا قابل اعتماد پارٹنر اٹلی کے ویزا، داخلوں اور قانونی دستاویزات کے لیے'
                : 'Your Trusted Partner for Italy Visa, Admissions & Legal Documentation'
              }
            </p>
          </div>
          
          {/* Contact Info */}
          <div className={language === 'ur' ? 'text-right' : ''}>
            <h4 className={`font-semibold mb-4 ${language === 'ur' ? 'font-elegant' : ''}`}>
              {language === 'ur' ? 'رابطہ' : 'Contact'}
            </h4>
            <div className={`space-y-2 text-sm ${language === 'ur' ? 'font-elegant' : ''}`}>
              <p className="flex items-center gap-2">
                📍 {language === 'ur' ? 'کراچی، لاہور، اسلام آباد دفاتر' : 'Karachi, Lahore, Islamabad Offices'}
              </p>
              <p className="flex items-center gap-2">
                📧 info@askariconsultants.pk
              </p>
              <p className="flex items-center gap-2">
                ☎ +92-XXX-XXXXXXX
              </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className={language === 'ur' ? 'text-right' : ''}>
            <h4 className={`font-semibold mb-4 ${language === 'ur' ? 'font-elegant' : ''}`}>
              {language === 'ur' ? 'فوری لنکس' : 'Quick Links'}
            </h4>
            <div className={`space-y-2 text-sm ${language === 'ur' ? 'font-elegant' : ''}`}>
              <a href="#home" className="block hover:text-accent transition-smooth">
                {language === 'ur' ? 'ہوم' : 'Home'}
              </a>
              <a href="#services" className="block hover:text-accent transition-smooth">
                {language === 'ur' ? 'خدمات' : 'Services'}
              </a>
              <a href="#pricing" className="block hover:text-accent transition-smooth">
                {language === 'ur' ? 'قیمتیں' : 'Pricing'}
              </a>
              <a href="#contact" className="block hover:text-accent transition-smooth">
                {language === 'ur' ? 'رابطہ' : 'Contact'}
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={`border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center ${language === 'ur' ? 'md:flex-row-reverse' : ''}`}>
          <p className={`text-sm text-primary-foreground/60 ${language === 'ur' ? 'font-elegant' : ''}`}>
            © 2025 {language === 'ur' ? 'عسکری کنسلٹنٹس' : 'Askari Consultants'} – {language === 'ur' ? 'تمام حقوق محفوظ' : 'All Rights Reserved'}
          </p>
          
          <div className={`flex gap-6 mt-4 md:mt-0 text-sm ${language === 'ur' ? 'font-elegant' : ''}`}>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-smooth">
              {language === 'ur' ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-smooth">
              {language === 'ur' ? 'استعمال کی شرائط' : 'Terms of Use'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};