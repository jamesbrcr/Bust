import SignupForm from '@/components/auth/SignupForm'

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ redirectTo?: string }> }) {
  const { redirectTo } = await searchParams
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Create account</h2>
      <SignupForm redirectTo={redirectTo} />
    </>
  )
}
