'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';
import Link from 'next/link';
import { logoutUser, fetchCurrentUser } from '@/lib/api/clientApi';

type AuthNavigationProps = {
  onLinkClick?: () => void;
};

export default function AuthNavigation({ onLinkClick }: AuthNavigationProps) {
  const router = useRouter();
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await fetchCurrentUser();
        if (userData) {
          setAuth(userData);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      }
    };

    checkAuth();
  }, [setAuth, clearAuth]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuth();
      router.push('/sign-in');
      if (onLinkClick) onLinkClick();
    }
  };

  return (
    <div className={css.authContainer}>
      {isAuthenticated ? (
        <>
          <Link
            href="/profile"
            className={css.navigationLink}
            onClick={onLinkClick}
          >
            Profile
          </Link>
          <div className={css.userBlock}>
            <p className={css.name}>{user?.name}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className={css.authBlock}>
          <Link
            href="/sign-in"
            className={css.navigationLink}
            onClick={onLinkClick}
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className={css.navigationLink}
            onClick={onLinkClick}
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
