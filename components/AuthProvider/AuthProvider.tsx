'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { fetchCurrentUser } from '@/lib/api/clientApi';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setAuth, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      try {
        const user = await fetchCurrentUser();

        if (user) {
          setAuth(user);
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    }

    verifyAuth();
  }, [setAuth, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
