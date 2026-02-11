import { useState, useRef, useEffect } from 'react';

// Картинки
import langIcon from '../../../assets/images/lang-icon.svg';
import navArrow from '../../../assets/images/nav-arrow.svg?raw';
import { APP_CONSTANTS } from '../../../constants/site.config';
import { useTranslation } from '../../functions/translate/TranslationContext';

function LanguageSwitcher() {
  const { setLanguage, language } = useTranslation();
  const { languages } = APP_CONSTANTS;
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);
  const savedLanguage = localStorage.getItem('selectedLanguage');
  const languageNames = {
    en: 'English',
    ru: 'Русский',
    es: 'Español',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano',
    pl: 'Polski',
    zh: '中文',
    tr: 'Türkçe',
    hi: 'हिन्दी',
    pt: 'Português',
    ar: 'العربية',
    ja: '日本語',
    fa: 'فارسی',
  };
  const isDesktop = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1025px)').matches;
  
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleMouseEnter = () => {
    if (isDesktop()) {
      setIsOpen(true);
    }
  };
  const handleMouseLeave = () => {
    if (isDesktop()) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`language-switcher ${isOpen ? 'show' : ''} nav-list__line`}
      ref={switcherRef}
      onClick={toggleDropdown}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      {/* Текущий язык */}
      <div className="language-switcher__current flex" >
        <img src={langIcon} className="language-switcher__icon" />
        <span className="language-switcher__label">
          {languageNames[savedLanguage] || languageNames[language] || language.toUpperCase()}
        </span>
        <div dangerouslySetInnerHTML={{ __html: navArrow }} className="nav-arrow" />
      </div>

      {/* Выпадающий список */}
      <div className="language-switcher__dropdown">
        <div className="language-switcher__list">
          {Object.entries(languages.list).map(
            ([code, enabled]) =>
              enabled && (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setIsOpen(false);
                  }}
                  className={
                    language === code
                      ? 'language-switcher__button nav-text active'
                      : 'language-switcher__button nav-text'
                  }
                >
                  {languageNames[code] || code.toUpperCase()}
                </button>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
