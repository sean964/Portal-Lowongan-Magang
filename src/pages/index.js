import PageHead from '@/components/commons/pageHead';
import { Button } from '@heroui/react';
import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { encrypt } from '../../utils/encrypt';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const { data: session, status } = useSession();
  const test = 'test'
  if (status === 'loading') {
    return <>loading...</>;
  }
  if (status === 'unauthenticated') {
    return <>belum login</>;
  }
  console.log(session)
  console.log(test)

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead title="Home" />
      <h1>Welcome, {session.user.email}</h1>
      <h1>hello world</h1>
      <Link href={`/${session?.user.role}`}>
      <Button color="primary">Button</Button>
      </Link>
    </main>
  );
};

export default Home;
