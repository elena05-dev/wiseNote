'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { fetchCurrentUser } from '@/lib/api/clientApi';

interface NotesLayoutProps {
  children: ReactNode;
}

export default function NotesLayout({ children }: NotesLayoutProps) {
  const router = useRouter();
  const { user, setAuth, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await fetchCurrentUser();
        if (!currentUser) {
          router.push('/sign-in');
        } else {
          setAuth(currentUser);
        }
      } catch {
        clearAuth();
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router, setAuth, clearAuth]);

  if (loading) return null;

  return <>{children}</>;
}
