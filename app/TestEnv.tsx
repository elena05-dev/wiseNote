'use client';

export default function TestEnv() {
  console.log('API URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

  return (
    <div>
      <p>API URL: {process.env.NEXT_PUBLIC_API_BASE_URL}</p>
    </div>
  );
}
