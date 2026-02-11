import { create } from 'zustand';

import { APP_CONSTANTS } from '../constants/site.config';

const useLangStore = create((set) => ({
  currentLang: APP_CONSTANTS.languages.default,
  setLang: (lang) => set({ currentLang: lang }),
}));

export default useLangStore;
