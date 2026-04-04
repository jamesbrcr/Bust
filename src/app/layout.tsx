import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const madeTommy = localFont({
  src: [
    { path: '../fonts/made_tommy/MADE TOMMY Thin_PERSONAL USE.otf',       weight: '100' },
    { path: '../fonts/made_tommy/MADE TOMMY Light_PERSONAL USE.otf',      weight: '300' },
    { path: '../fonts/made_tommy/MADE TOMMY Regular_PERSONAL USE.otf',    weight: '400' },
    { path: '../fonts/made_tommy/MADE TOMMY Medium_PERSONAL USE.otf',     weight: '500' },
    { path: '../fonts/made_tommy/MADE TOMMY Bold_PERSONAL USE.otf',       weight: '700' },
    { path: '../fonts/made_tommy/MADE TOMMY ExtraBold_PERSONAL USE.otf',  weight: '800' },
    { path: '../fonts/made_tommy/MADE TOMMY Black_PERSONAL USE.otf',      weight: '900' },
  ],
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
    <html lang="en" className={`h-full ${superPopstar.variable}`} suppressHydrationWarning>
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
      <body className={`${madeTommy.className} min-h-full bg-brand-100 dark:bg-dark-base text-[30px] text-gray-900 dark:text-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  )
}
