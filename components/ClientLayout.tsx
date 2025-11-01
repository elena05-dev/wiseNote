'use client';

import React from 'react';
import ToastContainer from './ToastContainer/ToastContainer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
