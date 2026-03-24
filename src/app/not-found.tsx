import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">🍴</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Page not found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">This recipe or page doesn&apos;t exist.</p>
      <Link href="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  )
}
