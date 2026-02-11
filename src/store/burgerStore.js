import { create } from 'zustand';

const useBurgerStore = create((set) => ({
  isMenuOpen: false,
  toggleMenu: () =>
    set((state) => {
      const newState = !state.isMenuOpen;
      document.body.classList.toggle('hidden', newState);
      return { isMenuOpen: newState };
    }),
}));

export default useBurgerStore;
