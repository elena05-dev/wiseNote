'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // если не авторизован, делаем редирект
    if (!isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, router]); // ESLint больше не ругается

  // пока проверяем авторизацию, можно показать пустой контейнер
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
