import LoginForm from '@/components/auth/LoginForm'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ redirectTo?: string }> }) {
  const { redirectTo } = await searchParams
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Sign in</h2>
      <LoginForm redirectTo={redirectTo} />
    </>
  )
}
