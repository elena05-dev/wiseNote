'use client';

import { useEffect } from 'react';

export default function TestEnv() {
  useEffect(() => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
  }, []);

  return <div>Check console for API URL</div>;
}
