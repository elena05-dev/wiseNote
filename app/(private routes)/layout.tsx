//import { cookies } from 'next/headers';
//import { redirect } from 'next/navigation';
//import PrivateLayoutClient from './PrivateLayoutClient';

//export default async function Layout({
// children,
//}: {
//  children: React.ReactNode;
//}) {
//const cookieStore = await cookies();
//const sessionId = cookieStore.get('sessionId')?.value;

//if (!sessionId) {
//   redirect('/sign-in');
// }

// return <PrivateLayoutClient>{children}</PrivateLayoutClient>;
//}
import PrivateLayoutClient from './PrivateLayoutClient';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayoutClient>{children}</PrivateLayoutClient>;
}
