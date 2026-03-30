import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const welcomeDarling = localFont({
  src: '../fonts/Welcome Darling.otf',
})

const superPopstar = localFont({
  src: '../fonts/Super Popstar.ttf',
  variable: '--font-brand',
})

export const metadata: Metadata = {
  title: 'Bust — My Recipe Book',
  description: 'A personal recipe organizer to track recipes you have made.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${superPopstar.variable}`}>
      <body className={`${welcomeDarling.className} min-h-full bg-brand-100 text-[30px] text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  )
}
