import './globals.css'
import { Roboto } from 'next/font/google'
import Image from 'next/image'

import logoImg from '../assets/logo.svg'

const roboto = Roboto({
  subsets: ['latin'], variable: '--font-roboto',
  weight: ['400', '700']
})

export const metadata = {
  title: 'Ignite Shop',
  description: 'Ignite Shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable}`}>
        <div className='flex flex-col items-start justify-center min-h-full'>
          <header className='flex items-center justify-center py-10 w-full m-w-[1180px] my-0 mx-auto'>
            <Image src={logoImg} alt='logo Ignite shop' />
          </header>

          {children}
        </div>
      </body>
    </html>
  )
}
