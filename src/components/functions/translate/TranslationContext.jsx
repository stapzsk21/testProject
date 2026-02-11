import { createContext, useContext, useState, useCallback, useEffect } from 'react';

import useLangStore from '../../../store/langStore';
import { loadTranslations } from './translationsLoader';

const TranslationContext = createContext();

export function TranslationProvider({ children, initialLanguage }) {
  const setLang = useLangStore((state) => state.setLang);

  // Получаем сохраненный язык из localStorage или используем initialLanguage
  const savedLanguage = localStorage.getItem('selectedLanguage') || initialLanguage;

  const [translationState, setTranslationState] = useState({
    language: savedLanguage,
    translations: {},
  });

  // Установка атрибута lang и класса для html тега
  const updateHtmlLangAttribute = useCallback((language) => {
    if (document && document.documentElement) {
      document.documentElement.className = `lang-${language}`;
      document.documentElement.dir = ['ar', 'fa'].includes(language) ? 'rtl' : 'ltr';
    }
  }, []);

  // Загрузка переводов при первом рендере
  useEffect(() => {
    const loadInitialTranslations = async () => {
      try {
        const data = await loadTranslations();
        setTranslationState((prev) => ({
          ...prev,
          translations: data[savedLanguage] || {},
        }));
        // Устанавливаем начальный язык в store
        setLang(savedLanguage);
        // Устанавливаем атрибут lang и класс для html при инициализации
        updateHtmlLangAttribute(savedLanguage);
      } catch (error) {
        console.error('Error loading initial translations:', error);
      }
    };

    loadInitialTranslations();
  }, [savedLanguage, setLang]);

  const setLanguage = useCallback(
    async (newLanguage) => {
      try {
        const data = await loadTranslations();
        setTranslationState({
          language: newLanguage,
          translations: data[newLanguage] || {},
        });
        // Сохраняем выбранный язык в localStorage
        localStorage.setItem('selectedLanguage', newLanguage);
        // Обновляем язык в store при его изменении
        setLang(newLanguage);
        // Обновляем атрибут lang и класс для html при изменении языка
        updateHtmlLangAttribute(newLanguage);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    },
    [setLang]
  );

  return (
    <TranslationContext.Provider
      value={{
        translations: translationState.translations,
        language: translationState.language,
        setLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
