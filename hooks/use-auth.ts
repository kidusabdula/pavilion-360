'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAdmin: false,
  });
  
  const router = useRouter();
  const supabase = createClient();
  
  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setState({
        user,
        loading: false,
        isAdmin: user?.user_metadata?.role === 'admin',
      });
    };
    getUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null;
        setState({
          user,
          loading: false,
          isAdmin: user?.user_metadata?.role === 'admin',
        });
        
        // Refresh the page on sign in/out to update server components
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          router.refresh();
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router]);
  
  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    },
    [supabase.auth]
  );
  
  const signInWithGoogle = useCallback(
    async (returnTo?: string) => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?returnTo=${returnTo || '/cms'}`,
        },
      });
      return { error };
    },
    [supabase.auth]
  );
  
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push('/cms/login');
    router.refresh();
  }, [supabase.auth, router]);
  
  return {
    ...state,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  };
}