'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { NoteTag } from '@/types/note';
import css from './FloatingTagsMenu.module.css';

const TAGS: NoteTag[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function FloatingTagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={css.container} ref={menuRef}>
      <button className={css.floatingBtn} onClick={toggleMenu}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag}>
              <Link
                href={
                  tag === 'All' ? '/notes/filter/All' : `/notes/filter/${tag}`
                }
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
