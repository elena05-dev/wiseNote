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
    let isMounted = true; // защита от обновления после размонтирования
    async function checkAuth() {
      try {
        const currentUser = await fetchCurrentUser();
        if (isMounted) {
          if (!currentUser) {
            clearAuth();
            router.replace('/sign-in'); // лучше replace, чтобы не оставлять историю
          } else {
            setAuth(currentUser);
          }
        }
      } catch {
        if (isMounted) {
          clearAuth();
          router.replace('/sign-in');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router, setAuth, clearAuth]);

  if (loading) return <div>Loading...</div>; // можно индикатор загрузки

  return <>{children}</>;
}
