export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-brand-500" style={{ fontFamily: 'var(--font-brand)', fontSize: '70px', lineHeight: 1 }}>Bust</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Your personal recipe book</p>
        </div>
        <div className="bg-white dark:bg-dark-base rounded-2xl shadow-sm border border-gray-100 dark:border-dark-surface p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
