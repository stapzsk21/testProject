import { create } from 'zustand';

const useCtaFormStore = create((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
  clearEmail: () => set({ email: '' }),
}));

export default useCtaFormStore;
