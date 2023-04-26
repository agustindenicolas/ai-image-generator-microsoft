import Images from '@/components/Images';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='mx-0'>
      <Images />
    </main>
  );
}
