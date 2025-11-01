import Image from 'next/image';
import Link from 'next/link';
import css from '@/components/Profile/ProfilePage.module.css';
import { getCurrentUserServer } from '@/lib/api/serverApi';
import type { Metadata } from 'next';
import type { User } from '@/types/user';

export const metadata: Metadata = {
  title: 'User Profile - MyApp',
  description:
    'View and manage your personal profile, settings, and preferences on MyApp.',

  openGraph: {
    title: 'User Profile - MyApp',
    description:
      'View and manage your personal profile, settings, and preferences on MyApp.',
    url: 'https://09-auth-azure-eight.vercel.app/',
    siteName: 'MyApp',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile page preview',
      },
    ],
  },
};
export default async function ProfilePage() {
  const user: User | null = await getCurrentUserServer();

  if (!user) {
    return <p>User not found or not authenticated</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/user.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
