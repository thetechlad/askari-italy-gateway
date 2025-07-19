import { Check, Star, Crown, Zap, Sparkles } from 'lucide-react';
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
      tier: 'ESSENTIAL',
      buttonClass: 'btn-luxury',
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
      tier: 'PREMIUM',
      buttonClass: 'btn-italia',
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
      tier: 'EXCLUSIVE',
      buttonClass: 'btn-exclusive',
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
    <section id="pricing" className="section-tom-ford gradient-dramatic">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tom Ford Section Header */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
              {language === 'ur' ? 'پیکجز' : 'PACKAGES'}
            </span>
            <div className="w-16 h-px bg-accent/60 mx-auto mt-4"></div>
          </div>
          
          <h2 className={`text-luxury mb-8 text-primary-foreground ${language === 'ur' ? 'urdu-elegant' : ''}`}>
            {language === 'ur' ? 'ہمارے پیکجز' : 'CURATED EXPERIENCES'}
          </h2>
          
          <p className={`text-elegant text-primary-foreground/80 max-w-2xl mx-auto ${language === 'ur' ? 'urdu-elegant' : ''}`}>
            {t('packages.subtitle')}
          </p>
        </div>
        
        {/* Tom Ford Package Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <div key={index} className={`relative group ${language === 'ur' ? 'text-right' : ''}`}>
              
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-accent text-accent-foreground px-6 py-2 rounded-full text-xs font-medium tracking-widest uppercase shadow-gold">
                    <Sparkles className="inline h-3 w-3 mr-1" />
                    {language === 'ur' ? 'مقبول ترین' : 'MOST POPULAR'}
                  </div>
                </div>
              )}
              
              {/* Package Card */}
              <div className={`card-tom-ford h-full p-8 ${pkg.popular ? 'ring-2 ring-accent shadow-gold' : ''}`}>
                
                {/* Package Header */}
                <div className={`mb-8 ${language === 'ur' ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-3 mb-4 ${language === 'ur' ? 'flex-row-reverse justify-end' : ''}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <pkg.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      {pkg.tier}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-light mb-2 tracking-wide ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                    {pkg.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-light text-primary">{pkg.price}</span>
                  </div>
                  
                  <p className={`text-sm text-muted-foreground leading-relaxed ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                    {pkg.description}
                  </p>
                  
                  <div className={`w-12 h-px bg-accent/40 mt-6 ${language === 'ur' ? 'ml-auto' : ''}`}></div>
                </div>
                
                {/* Features */}
                <div className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className={`flex items-start gap-3 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                      <Check className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                      <span className={`text-sm leading-relaxed ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Button className={`${pkg.buttonClass} w-full group`}>
                  <span className="relative z-10 tracking-wider uppercase text-sm">
                    {language === 'ur' ? 'منتخب کریں' : 'SELECT PACKAGE'}
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className={`text-primary-foreground/80 mb-8 ${language === 'ur' ? 'urdu-elegant' : ''}`}>
            🟢 {language === 'ur' ? 'خاندانوں یا PR متلاشیوں کے لیے حسب ضرورت پیکجز بھی دستیاب ہیں' : 'Bespoke packages available for families and PR seekers'}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center ${language === 'ur' ? 'sm:flex-row-reverse' : ''}`}>
            <Button className="btn-ghost-luxury">
              {t('packages.compare')}
            </Button>
            <Button className="btn-exclusive">
              {t('packages.talk')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};