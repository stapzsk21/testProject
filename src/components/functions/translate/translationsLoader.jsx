import Papa from 'papaparse';

import arCSV from '../../../assets/csv/ar.csv?raw';
import deCSV from '../../../assets/csv/de.csv?raw';
// Обновляем пути к файлам в /assets/csv
import enCSV from '../../../assets/csv/en.csv?raw';
import esCSV from '../../../assets/csv/es.csv?raw';
import faCSV from '../../../assets/csv/fa.csv?raw';
import frCSV from '../../../assets/csv/fr.csv?raw';
import hiCSV from '../../../assets/csv/hi.csv?raw';
import jaCSV from '../../../assets/csv/ja.csv?raw';
import plCSV from '../../../assets/csv/pl.csv?raw';
import ptCSV from '../../../assets/csv/pt.csv?raw';
import ruCSV from '../../../assets/csv/ru.csv?raw';
import trCSV from '../../../assets/csv/tr.csv?raw';
import zhCSV from '../../../assets/csv/zh.csv?raw';

export const loadTranslations = async () => {
  const translations = {};
  const csvFiles = {
    en: enCSV,
    ru: ruCSV,
    es: esCSV,
    de: deCSV,
    fr: frCSV,
    pl: plCSV,
    zh: zhCSV,
    tr: trCSV,
    hi: hiCSV,
    ar: arCSV,
    ja: jaCSV,
    pt: ptCSV,
    fa: faCSV,
  };

  try {
    for (const [language, csvContent] of Object.entries(csvFiles)) {
      const parsedData = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true, // пропускаем пустые строки
      }).data;

      translations[language] = {};
      parsedData.forEach((row) => {
        if (row.constant && row.translate) {
          translations[language][row.constant] = row.translate;
        }
      });
    }
  } catch (error) {
    console.error('Error loading translations:', error);
  }

  return translations;
};
