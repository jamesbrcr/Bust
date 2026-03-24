import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bust — My Recipe Book',
  description: 'A personal recipe organizer to track recipes you have made.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var stored = localStorage.getItem('theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (stored === 'dark' || (!stored && prefersDark)) {
              document.documentElement.classList.add('dark');
            }
          } catch(e) {}
        ` }} />
      </head>
      <body className={`${geist.className} min-h-full bg-brand-100 dark:bg-dark-base text-gray-900 dark:text-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  )
}
