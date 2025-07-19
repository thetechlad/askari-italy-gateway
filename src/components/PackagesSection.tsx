import { Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const PackagesSection = () => {
  const { language, t } = useLanguage();
  
  const packages = [
    {
      name: t('packages.starter'),
      price: '₨145,000',
      description: language === 'ur' ? 'پبلک یونیورسٹیوں میں درخواست دینے والے طلباء کے لیے بہترین' : 'Perfect for students applying to Public Universities',
      icon: Zap,
      gradient: 'from-primary/10 to-primary/5',
      buttonClass: 'btn-hero',
      features: [
        language === 'ur' ? 'داخلہ پروسیسنگ (1 پروگرام)' : 'Admission Processing (1 Program)',
        language === 'ur' ? 'ویزا فائلنگ سپورٹ' : 'Visa Filing Support',
        language === 'ur' ? 'سفارت خانے کی انٹرویو کوچنگ' : 'Embassy Interview Coaching',
        language === 'ur' ? 'SOP رائٹنگ' : 'SOP Writing',
        language === 'ur' ? 'دستاویز کا ترجمہ' : 'Document Translation',
        language === 'ur' ? 'بنیادی مشاورت (30 منٹ)' : 'Basic Consultancy (30 mins)'
      ]
    },
    {
      name: t('packages.professional'),
      price: '₨225,000',
      description: language === 'ur' ? 'ماسٹرز کے لیے درخواست دینے والے طلباء اور پیشہ ور افراد کے لیے مثالی' : 'Ideal for students & professionals applying for Masters',
      icon: Star,
      gradient: 'from-secondary/10 to-secondary/5',
      buttonClass: 'btn-secondary',
      popular: true,
      features: [
        language === 'ur' ? 'داخلہ (3 پروگرام تک)' : 'Admission (Up to 3 Programs)',
        language === 'ur' ? 'ویزا دستاویزات' : 'Visa Documentation',
        language === 'ur' ? 'FBR NTN اور ٹیکس فائلنگ' : 'FBR NTN & Tax Filing',
        language === 'ur' ? 'سفارت خانے کی انٹرویو کوچنگ' : 'Embassy Interview Coaching',
        language === 'ur' ? 'SOP رائٹنگ (ایڈوانس)' : 'SOP Writing (Advanced)',
        language === 'ur' ? 'دستاویز کا ترجمہ' : 'Document Translation',
        language === 'ur' ? 'ون آن ون سیشنز' : 'One-on-One Sessions',
        language === 'ur' ? '2 سال واٹس ایپ سپورٹ' : '2 Years WhatsApp Support'
      ]
    },
    {
      name: t('packages.elite'),
      price: '₨325,000',
      description: language === 'ur' ? 'اٹلی پہنچنے تک مکمل مدد کے لیے بہترین' : 'Best for complete hand-holding until you\'re in Italy',
      icon: Crown,
      gradient: 'from-accent/10 to-accent/5',
      buttonClass: 'btn-accent',
      features: [
        language === 'ur' ? 'پرو پیکج کی تمام خدمات +' : 'All Services in Pro Package +',
        language === 'ur' ? 'اطالوی زبان کا کورس' : 'Italian Language Course',
        language === 'ur' ? 'لامحدود یونیورسٹی رہنمائی' : 'Unlimited University Guidance',
        language === 'ur' ? 'ترجیحی سفارت خانے کی کوچنگ' : 'Priority Embassy Coaching',
        language === 'ur' ? 'ویزا کے بعد زمینی سپورٹ (صرف مشاورت)' : 'On-Ground Support after Visa (Consultancy Only)',
        language === 'ur' ? 'ترجیحی سپورٹ رسائی' : 'Priority Support Access'
      ]
    }
  ];
  
  return (
    <section id="pricing" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient ${language === 'ur' ? 'font-elegant' : ''}`}>
            {t('packages.title')}
          </h2>
          <p className={`text-xl text-muted-foreground ${language === 'ur' ? 'font-elegant' : ''}`}>
            {t('packages.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div key={index} className={`card-premium p-8 relative ${pkg.popular ? 'ring-2 ring-secondary shadow-gold' : ''} ${language === 'ur' ? 'text-right' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-medium">
                    {language === 'ur' ? 'مقبول ترین' : 'Most Popular'}
                  </span>
                </div>
              )}
              
              <div className={`bg-gradient-to-br ${pkg.gradient} w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${language === 'ur' ? 'ml-auto' : ''}`}>
                <pkg.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 ${language === 'ur' ? 'font-elegant' : ''}`}>
                {pkg.name}
              </h3>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">{pkg.price}</span>
              </div>
              
              <p className={`text-muted-foreground mb-6 ${language === 'ur' ? 'font-elegant text-sm' : 'text-sm'}`}>
                {pkg.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={`flex items-start gap-3 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                    <Check className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className={`text-sm ${language === 'ur' ? 'font-elegant' : ''}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className={`${pkg.buttonClass} w-full`}>
                {language === 'ur' ? 'منتخب کریں' : 'Choose Plan'}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className={`text-muted-foreground mb-6 ${language === 'ur' ? 'font-elegant' : ''}`}>
            🟢 {language === 'ur' ? 'خاندانوں یا PR متلاشیوں کے لیے حسب ضرورت پیکجز بھی دستیاب ہیں' : 'Custom packages also available for Families or PR seekers'}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
            <Button variant="outline" className="btn-premium">
              🔍 {t('packages.compare')}
            </Button>
            <Button className="btn-hero">
              📞 {t('packages.talk')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};