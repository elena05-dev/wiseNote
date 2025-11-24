'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    async function checkUser() {
      try {
        const user = await fetchCurrentUser();
        if (!user) {
          clearAuth?.();
          router.replace('/sign-in');
        } else {
          setAuth?.(user);
        }
      } catch {
        clearAuth?.();
        router.replace('/sign-in');
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, [router, setAuth, clearAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
