import Link from 'next/link'
import { signOut } from '@/actions/auth'
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#FFD3A5] border-b border-[#FFD3A5] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center relative">
          <Link href="/dashboard" className="absolute left-1/2 -translate-x-1/2 text-brand-500 hover:text-gray-900 transition-colors leading-none" style={{ fontFamily: 'var(--font-brand)', fontSize: '70px' }}>
            Bust
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <Link href="/saved" className="text-base text-gray-600 hover:text-gray-900 transition-colors px-2 py-1">
              Saved
            </Link>
            <Link href="/about" className="text-base text-gray-600 hover:text-gray-900 transition-colors px-2 py-1">
              About
            </Link>
            <form action={signOut} className="flex items-center">
              <button type="submit" className="text-base text-gray-600 hover:text-gray-900 transition-colors px-2 py-3">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
