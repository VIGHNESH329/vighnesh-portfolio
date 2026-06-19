import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Identity = 'cyber' | 'sde';

interface IdentityState {
  activeIdentity: Identity;
  nextIdentity: Identity | null;
  isTransitioning: boolean;
  setIdentity: (identity: Identity) => void;
  toggleIdentity: () => void;
}

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set, get) => ({
      activeIdentity: 'cyber',
      nextIdentity: null,
      isTransitioning: false,
      setIdentity: (identity) => {
        if (get().isTransitioning || get().activeIdentity === identity) return;
        
        // Begin Transition
        set({ isTransitioning: true, nextIdentity: identity });
        
        // Swap colors and active state halfway through
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-identity', identity);
          }
          set({ activeIdentity: identity });
        }, 1500); 
        
        // End Transition
        setTimeout(() => {
          set({ isTransitioning: false, nextIdentity: null });
        }, 3000); 
      },
      toggleIdentity: () => {
        if (get().isTransitioning) return;
        const targetIdentity = get().activeIdentity === 'cyber' ? 'sde' : 'cyber';
        get().setIdentity(targetIdentity);
      },
    }),
    {
      name: 'identity-storage',
      partialize: (state) => ({ activeIdentity: state.activeIdentity }),
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-identity', state.activeIdentity);
        }
      },
    }
  )
);
