import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const madeTommy = localFont({
  src: [
    { path: '../fonts/made_tommy/MadeTommy-Thin.otf',      weight: '100' },
    { path: '../fonts/made_tommy/MadeTommy-Light.otf',     weight: '300' },
    { path: '../fonts/made_tommy/MadeTommy-Regular.otf',   weight: '400' },
    { path: '../fonts/made_tommy/MadeTommy-Medium.otf',    weight: '500' },
    { path: '../fonts/made_tommy/MadeTommy-Bold.otf',      weight: '700' },
    { path: '../fonts/made_tommy/MadeTommy-ExtraBold.otf', weight: '800' },
    { path: '../fonts/made_tommy/MadeTommy-Black.otf',     weight: '900' },
  ],
  adjustFontFallback: false,
})

const superPopstar = localFont({
  src: '../fonts/SuperPopstar.ttf',
  variable: '--font-brand',
  adjustFontFallback: false,
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
