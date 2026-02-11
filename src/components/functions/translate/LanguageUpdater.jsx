import { useEffect } from 'react';

import { useTranslation } from './TranslationContext';
import { setCurrentLanguage } from './getCurrentLanguage';

/**
 * Компонент, который обновляет текущий язык при изменении языка приложения
 */
export function LanguageUpdater() {
  const { language } = useTranslation();

  useEffect(() => {
    // Обновляем текущий язык при монтировании и при изменении языка
    setCurrentLanguage(language);
  }, [language]);

  // Компонент ничего не рендерит
  return null;
}
