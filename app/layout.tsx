import React from 'react';
import { Roboto } from 'next/font/google';
import { Great_Vibes } from 'next/font/google';
import { Agbalumo } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import ClientLayout from '@/components/ClientLayout';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
});
const agbalumo = Agbalumo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-agbalumo',
});

export const metadata: Metadata = {
  title: 'WiseNote',
  description:
    'An application for storing, creating, deleting, and searching notes',
  openGraph: {
    title: 'Notes',
    description:
      'An application for storing, creating, deleting, and searching notes',
    url: `https://wise-note-nu.vercel.app/`,
    images: [
      {
        url: 'https://wise-note-nu.vercel.app/wise-note-og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${greatVibes.variable} ${agbalumo.variable}`}
      >
        <svg
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <defs>
            <symbol id="icon-box" viewBox="0 0 20 20">
              <path d="M0 2c0-1.1 0.9-2 2-2h16c1.105 0 2 0.895 2 2v0 2h-20v-2zM1 5h18v13c0 1.105-0.895 2-2 2v0h-14c-1.105 0-2-0.895-2-2v0-13zM7 7v2h6v-2h-6z"></path>
            </symbol>
            <symbol id="icon-pencil" viewBox="0 0 32 32">
              <title>pencil</title>
              <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
            </symbol>
            <symbol id="icon-close" viewBox="0 0 22 28">
              <title>close</title>
              <path d="M20.281 20.656c0 0.391-0.156 0.781-0.438 1.062l-2.125 2.125c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-4.594-4.594-4.594 4.594c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-2.125-2.125c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l4.594-4.594-4.594-4.594c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.594 4.594-4.594c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062s-0.156 0.781-0.438 1.062l-4.594 4.594 4.594 4.594c0.281 0.281 0.438 0.672 0.438 1.062z"></path>
            </symbol>
          </defs>
        </svg>

        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main style={{ flex: '1 0 auto', position: 'relative' }}>
              <ClientLayout>
                {children}
                {modal}
              </ClientLayout>
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
