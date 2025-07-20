import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.svg';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };
  
  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.pricing', href: '#pricing' },
    { key: 'nav.success', href: '#success' },
    { key: 'nav.contact', href: '#contact' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className={`flex items-center space-x-3 ${language === 'ur' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <img src={logo} alt="Askari Consultants" className="h-8 md:h-10 w-auto" />
            <div className={`${language === 'ur' ? 'text-right' : ''}`}>
              <div className={`text-xl md:text-2xl font-light tracking-widest uppercase text-primary-foreground ${language === 'ur' ? 'urdu-elegant' : ''}`}>
                {language === 'ur' ? 'عسکری' : 'ASKARI'}
              </div>
              <div className="text-xs text-accent tracking-[0.2em] uppercase font-medium">
                {language === 'ur' ? 'کنسلٹنٹس' : 'CONSULTANTS'}
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`text-sm font-medium text-primary-foreground/80 hover:text-accent transition-smooth ${language === 'ur' ? 'font-elegant' : ''}`}
              >
                {t(item.key)}
              </a>
            ))}
          </nav>
          
          {/* Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-primary-foreground/80 hover:text-accent"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === 'en' ? 'اردو' : 'EN'}
            </Button>
            <Button className="btn-luxury text-xs tracking-widest">
              {t('hero.cta.consultation')}
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-primary-foreground/80"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-primary/98 backdrop-blur-sm border-t border-accent/20">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium text-primary-foreground/80 hover:text-accent transition-smooth ${language === 'ur' ? 'font-elegant text-right' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="pt-4 border-t border-accent/20 mt-4">
                <Button className="btn-luxury w-full text-xs tracking-widest">
                  {t('hero.cta.consultation')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};