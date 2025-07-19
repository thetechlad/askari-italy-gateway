import { GraduationCap, FileText, Building, BookOpen, MessageCircle, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ServicesSection = () => {
  const { language, t } = useLanguage();
  
  const services = [
    {
      icon: GraduationCap,
      titleKey: 'services.education',
      items: [
        language === 'ur' ? 'پبلک اور پرائیویٹ اطالوی یونیورسٹیوں میں بیچلرز اور ماسٹرز پروگرام' : 'Bachelors & Masters Programs in Public & Private Italian Universities',
        language === 'ur' ? 'کورس اور شہر کے انتخاب میں رہنمائی' : 'Guidance on Course & City Selection',
        language === 'ur' ? 'درخواست اور دستاویزات میں سپورٹ' : 'Support in Application & Documentation'
      ],
      color: 'text-secondary'
    },
    {
      icon: FileText,
      titleKey: 'services.visa',
      items: [
        language === 'ur' ? 'مکمل ویزا فائلنگ سپورٹ' : 'Complete Visa Filing Support',
        language === 'ur' ? 'سفارت خانے کی ضروریات کی تکمیل' : 'Embassy Requirements Fulfillment',
        language === 'ur' ? 'اپائنٹمنٹ شیڈولنگ اور انٹرویو کوچنگ' : 'Scheduling Appointments & Interview Coaching'
      ],
      color: 'text-primary'
    },
    {
      icon: Building,
      titleKey: 'services.legal',
      items: [
        language === 'ur' ? 'FBR NTN رجسٹریشن — ₨40,000' : 'FBR NTN Registration — ₨40,000',
        language === 'ur' ? 'ٹیکس ریٹرن فائلنگ' : 'Tax Return Filing',
        language === 'ur' ? 'انکم سرٹیفکیٹ سپورٹ' : 'Income Certificate Support'
      ],
      color: 'text-accent'
    },
    {
      icon: BookOpen,
      titleKey: 'services.documentation',
      items: [
        language === 'ur' ? 'پروفیشنل SOP رائٹنگ — ₨30,000' : 'Professional SOP Writing — ₨30,000',
        language === 'ur' ? 'مالی اور خاندانی دستاویزات کی فارمیٹنگ' : 'Financial & Family Docs Formatting',
        language === 'ur' ? 'دستاویز کا ترجمہ — ₨22,000' : 'Document Translation — ₨22,000'
      ],
      color: 'text-secondary'
    },
    {
      icon: MessageCircle,
      titleKey: 'services.training',
      items: [
        language === 'ur' ? 'سفارت خانے کی انٹرویو کوچنگ — ₨18,000' : 'Embassy Interview Coaching — ₨18,000',
        language === 'ur' ? 'اطالوی زبان کا کورس (بنیادی سے ایڈوانس) — ₨50,000' : 'Italian Language Course (Basic to Advanced) — ₨50,000'
      ],
      color: 'text-primary'
    },
    {
      icon: Globe,
      titleKey: 'services.translation',
      items: [
        language === 'ur' ? 'اطالوی اور انگریزی زبان کے ترجمے' : 'Italian & English Language Translations',
        language === 'ur' ? 'لیگلائزیشن اور سفارت خانے کی تصدیق کا عمل' : 'Legalization & Embassy Verification Process'
      ],
      color: 'text-accent'
    }
  ];
  
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient ${language === 'ur' ? 'font-elegant' : ''}`}>
            {t('services.title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card-premium p-6 group hover:scale-105 transition-smooth">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 mb-6 ${service.color}`}>
                <service.icon className="h-6 w-6" />
              </div>
              
              <h3 className={`text-xl font-semibold mb-4 ${language === 'ur' ? 'font-elegant text-right' : ''}`}>
                {t(service.titleKey)}
              </h3>
              
              <ul className={`space-y-3 ${language === 'ur' ? 'text-right' : ''}`}>
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={`text-muted-foreground flex items-start gap-3 ${language === 'ur' ? 'flex-row-reverse font-elegant text-sm' : 'text-sm'}`}>
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};