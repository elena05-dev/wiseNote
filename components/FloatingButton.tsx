'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingButton() {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => router.push('/notes/new')}
      aria-label="Create new note"
      className="
        fixed bottom-6 right-6
        w-14 h-14
        flex items-center justify-center
        rounded-full
        bg-indigo-600 text-white text-3xl
        shadow-lg
        transition-colors
        hover:bg-indigo-700
        focus:outline-none
      "
    >
      <Plus size={28} />
    </motion.button>
  );
}
