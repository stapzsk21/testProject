import { create } from 'zustand';

import { APP_CONSTANTS } from '../constants/site.config';

const useCountryStore = create((set, get) => ({
  countryCode: localStorage.getItem('countryCode') || '',
  isLoading: false,
  error: null,

  fetchCountryCode: async () => {
    // Проверяем есть ли код страны в localStorage
    const storedCountryCode = localStorage.getItem('countryCode');
    if (storedCountryCode) {
      set({ countryCode: storedCountryCode });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      localStorage.setItem('countryCode', data.country_code);
      set({
        countryCode: data.country_code,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: 'Failed to fetch country code',
        isLoading: false,
      });
      console.error('Error fetching country code:', error);
    }
  },

  setCountryCode: (code) => {
    localStorage.setItem('countryCode', code);
    set({ countryCode: code });
  },

  isCountryRestricted: () => {
    const countryCode = get().countryCode;

    if (APP_CONSTANTS.javascript?.ip_restrictions?.ip_restrictions_flag === true) {
      const restrictedCountries = APP_CONSTANTS.javascript?.ip_restrictions?.ip_countries || [];

      if (countryCode && restrictedCountries.includes(countryCode)) {
        return true;
      }
    }
    return false;
  },
}));

export default useCountryStore;
