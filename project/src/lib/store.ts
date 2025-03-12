import { create } from 'zustand';
import { supabase } from './supabaseClient';

interface UserState {
  user: any | null;
  profile: any | null;
  isAdmin: boolean;
  setUser: (user: any) => void;
  setProfile: (profile: any) => void;
  logout: () => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  isAdmin: false,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile, isAdmin: profile?.role === 'admin' }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, isAdmin: false });
  },
}));