import PageHead from '@/components/commons/pageHead';
import { Button } from '@heroui/react';
import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { encrypt } from '../../utils/encrypt';
import Link from 'next/link';
import HomePage from '@/components/views/home';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return(
    <>

    <PageHead title={'Home'} />
    <HomePage />
    </>
  )

};

export default Home;
