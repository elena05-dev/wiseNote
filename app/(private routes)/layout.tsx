import PrivateLayout from '@/components/PrivateLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
