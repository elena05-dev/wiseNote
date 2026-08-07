import PrivateLayoutClient from './PrivateLayoutClient';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayoutClient>{children}</PrivateLayoutClient>;
}
