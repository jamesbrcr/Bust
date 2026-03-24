import Link from 'next/link'
import { signOut } from '@/actions/auth'
import Button from '@/components/ui/Button'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors">
            Bust
          </Link>
          <div className="flex items-center gap-3">
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
