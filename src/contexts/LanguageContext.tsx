import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.success': 'Success Stories',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Study, Work & Thrive in Italy',
    'hero.subtitle': 'End-to-End Support from Visa Filing to University Admissions & FBR Tax Solutions',
    'hero.cta.consultation': 'Book Free Consultation',
    'hero.cta.services': 'Explore Our Services',
    
    // Why Choose Us
    'why.title': 'Why Choose Askari Consultants?',
    'why.subtitle': 'Your Bridge to Italy Starts Here',
    'why.description': 'With years of experience and a 100% personalized approach, Askari Consultants helps Pakistani students, professionals, and families transition to Italy with confidence.',
    'why.strength1': 'Licensed & Experienced Advisors',
    'why.strength2': 'Specialized in Italian Universities & Visa Systems',
    'why.strength3': 'Support with FBR Tax, NTN & SOPs',
    'why.strength4': 'Italian Language Courses Available',
    'why.strength5': '360° Document Assistance & Coaching',
    'why.location': 'Based in Pakistan — Focused on Italy',
    
    // Services
    'services.title': 'Services We Offer',
    'services.education': 'Education Admissions',
    'services.visa': 'Visa Services',
    'services.legal': 'FBR & Legal Assistance',
    'services.documentation': 'Documentation Help',
    'services.training': 'Interview & Language Training',
    'services.translation': 'Document Translation & Apostille',
    
    // Packages
    'packages.title': 'Our Packages',
    'packages.subtitle': 'Tailored for Students, Professionals, and Families',
    'packages.starter': 'Starter Package',
    'packages.professional': 'Professional Package',
    'packages.elite': 'Elite Package',
    'packages.compare': 'Compare Packages',
    'packages.talk': "Let's Talk",
    
    // Contact
    'contact.title': 'Ready to Start Your Italy Journey?',
    'contact.subtitle': 'Trusted by Hundreds. Committed to You.',
    'contact.consultation': 'Book Free Consultation',
    'contact.whatsapp': 'Chat on WhatsApp',
    'contact.checklist': 'Download Document Checklist',
  },
  ur: {
    // Header
    'nav.home': 'ہوم',
    'nav.about': 'ہمارے بارے میں',
    'nav.services': 'خدمات',
    'nav.pricing': 'قیمتیں',
    'nav.success': 'کامیابی کی کہانیاں',
    'nav.contact': 'رابطہ',
    
    // Hero
    'hero.title': 'اٹلی میں تعلیم حاصل کریں، کام کریں اور کامیاب ہوں',
    'hero.subtitle': 'ویزا فائلنگ سے یونیورسٹی داخلے اور FBR ٹیکس حل تک مکمل سپورٹ',
    'hero.cta.consultation': 'مفت مشاورت بک کریں',
    'hero.cta.services': 'ہماری خدمات دیکھیں',
    
    // Why Choose Us
    'why.title': 'عسکری کنسلٹنٹس کیوں منتخب کریں؟',
    'why.subtitle': 'اٹلی کا آپ کا پل یہاں شروع ہوتا ہے',
    'why.description': 'سالوں کے تجربے اور 100% ذاتی نوعیت کے ساتھ، عسکری کنسلٹنٹس پاکستانی طلباء، پیشہ ور افراد، اور خاندانوں کو اعتماد کے ساتھ اٹلی منتقل ہونے میں مدد کرتا ہے۔',
    'why.strength1': 'لائسنس یافتہ اور تجربہ کار مشیر',
    'why.strength2': 'اطالوی یونیورسٹیوں اور ویزا سسٹم میں مہارت',
    'why.strength3': 'FBR ٹیکس، NTN اور SOPs کے ساتھ سپورٹ',
    'why.strength4': 'اطالوی زبان کے کورسز دستیاب',
    'why.strength5': '360° دستاویزی مدد اور کوچنگ',
    'why.location': 'پاکستان میں مقیم — اٹلی پر مرکوز',
    
    // Services
    'services.title': 'ہماری خدمات',
    'services.education': 'تعلیمی داخلے',
    'services.visa': 'ویزا خدمات',
    'services.legal': 'FBR اور قانونی مدد',
    'services.documentation': 'دستاویزی مدد',
    'services.training': 'انٹرویو اور زبان کی تربیت',
    'services.translation': 'دستاویزی ترجمہ اور تصدیق',
    
    // Packages
    'packages.title': 'ہمارے پیکجز',
    'packages.subtitle': 'طلباء، پیشہ ور افراد، اور خاندانوں کے لیے تیار کردہ',
    'packages.starter': 'اسٹارٹر پیکج',
    'packages.professional': 'پروفیشنل پیکج',
    'packages.elite': 'ایلیٹ پیکج',
    'packages.compare': 'پیکجز کا موازنہ',
    'packages.talk': 'بات کرتے ہیں',
    
    // Contact
    'contact.title': 'اپنا اٹلی کا سفر شروع کرنے کے لیے تیار ہیں؟',
    'contact.subtitle': 'سینکڑوں کا بھروسہ۔ آپ کے لیے پرعزم۔',
    'contact.consultation': 'مفت مشاورت بک کریں',
    'contact.whatsapp': 'واٹس ایپ پر بات کریں',
    'contact.checklist': 'دستاویز کی فہرست ڈاؤن لوڈ کریں',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};