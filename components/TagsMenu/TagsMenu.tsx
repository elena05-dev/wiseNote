'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { NoteTag } from '@/types/note';
import css from './TagsMenu.module.css';

const TAGS: NoteTag[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function TagsMenu({
  onLinkClick,
}: {
  onLinkClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={
                  tag === 'All' ? '/notes/filter/All' : `/notes/filter/${tag}`
                }
                className={css.menuLink}
                onClick={onLinkClick}
              >
                <span>{tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
