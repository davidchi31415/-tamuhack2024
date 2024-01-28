import './globals.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ModalProvider } from '@/components/modal-provider';
import { ToasterProvider } from '@/components/toaster-provider';
import { Navbar } from '@/components/navbar';
import { getCredits } from '@/lib/credits';
import NextTopLoader from 'nextjs-toploader';

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'pusheen.ai',
  description: 'Interactively learn STEM topics with the help of an AI driven pusheen.'
}


const getUserData = async () => {
  return await getCredits();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { convertCredits } = await getUserData();
  return (
    <html lang="en">
      <body className={rubik.className}>
        <div className="z-[9999]">
          <NextTopLoader color="#3b82f6" height={5}/>
        </div>
        <ModalProvider />
        <ToasterProvider />
        <div className="w-full h-full pt-12 md:pt-0 overflow-x-clip">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  )
}