import { create } from 'zustand';

const useGameStore = create((set) => ({
  isGameOpen: false,

  openGame: () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    set({ isGameOpen: true });
  },

  closeGame: () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
    set({ isGameOpen: false });
  },
}));

export default useGameStore;

