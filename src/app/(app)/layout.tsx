import Link from 'next/link'
import { signOut } from '@/actions/auth'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-dark-base border-b border-gray-100 dark:border-dark-surface sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
            Bust
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors px-2 py-1">
              About
            </Link>
            <Link href="/recipes/new">
              <Button size="sm">+ Add Recipe</Button>
            </Link>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm">Sign out</Button>
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
