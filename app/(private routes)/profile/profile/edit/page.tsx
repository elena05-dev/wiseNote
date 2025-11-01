'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUserProfile } from '@/lib/api/clientApi';
import css from '@/components/Profile/EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setAuth } = useAuthStore();

  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      const updatedUser = await updateUserProfile({ name });
      setAuth(updatedUser);
      router.push('/profile');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <form onSubmit={handleSave} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={css.input}
              disabled={loading}
            />
          </div>

          <p>Email: {user?.email || 'unknown@example.com'}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={loading}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
