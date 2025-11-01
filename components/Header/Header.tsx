'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.logoWrapper}>
          <h1 className={css.logoName}>WiseNote</h1>{' '}
          <Image
            src="/icons8-знание-50.png"
            alt="WiseNote logo"
            width={80}
            height={80}
            className={css.logo}
          />
        </div>

        <nav
          aria-label="Main Navigation"
          className={`${css.nav} ${menuOpen ? css.open : ''}`}
        >
          <ul className={css.navigation}>
            <li className={css.navigationItem}>
              <Link href="/notes/filter/All" className={css.navigationLink}>
                Notes
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link href="/" className={css.navigationLink} onClick={closeMenu}>
                Home
              </Link>
            </li>

            <li className={css.navigationItem}>
              <AuthNavigation />
            </li>
          </ul>
        </nav>

        {menuOpen && (
          <nav className={css.mobileNav}>
            <ul className={css.navigation}>
              <li className={css.navigationItem}>
                <TagsMenu onLinkClick={closeMenu} />
              </li>
              <li className={css.navigationItem}>
                <AuthNavigation onLinkClick={closeMenu} />
              </li>
            </ul>
          </nav>
        )}

        <button
          className={css.burger}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
