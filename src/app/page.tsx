import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function RootPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen flex flex-col">

      {/* Nav */}
      <header className="bg-[#FFD3A5] border-b border-[#FFD3A5] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-brand-500 leading-none" style={{ fontFamily: 'var(--font-brand)', fontSize: '52px' }}>
            Bust
          </span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors px-2 py-1">
              Log in
            </Link>
            <Link href="/signup" className="bg-brand-500 hover:bg-brand-600 text-white text-base font-medium px-5 py-2 rounded-full transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h1
              className="text-brand-500 mb-6 leading-none"
              style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(80px, 18vw, 140px)' }}
            >
              Bust
            </h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-3">
              Your personal recipe book.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto">
              Save the recipes you love, add photos, rate them, and find exactly what you want to cook — all in one place.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/signup" className="bg-brand-500 hover:bg-brand-600 text-white text-base font-medium px-8 py-3 rounded-full transition-colors shadow-sm">
                Get started — it&apos;s free
              </Link>
              <Link href="/login" className="text-base text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors px-4 py-3">
                Already have an account?
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 bg-white/60 dark:bg-black/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
              Everything your recipes need
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white dark:bg-dark-base rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-surface">
                <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-dark-surface flex items-center justify-center mb-4">
                  <svg viewBox="0 0 64 64" width={26} height={26} fill="currentColor" className="text-brand-500">
                    <path fillRule="evenodd" d="M61.821 11.045c.703-1.309-.891-.912-.891-.912s-10.627 10.201-12.104 8.951S59.231 8.057 57.825 6.23c-1.301-1.703-11.74 10.455-12.994 8.97c-1.242-1.482 8.939-12.123 8.939-12.123s.387-1.602-.912-.9C36.851 10.785 34.812 18.81 34.812 18.81s-.551 1.563.645 2.771c.117.105-29.204 29.26-33.129 33.196c-1.91 1.908 5.098 8.801 6.996 6.893c3.926-3.936 33.024-33.303 33.129-33.194c1.207 1.205 2.766.652 2.766.652s8.012-2.045 16.602-18.083M32.028 40.507c7.803 7.82 20.958 20.999 20.958 20.999s5.742-1.879 6.551-6.729L38.662 33.861a5104.35 5104.35 0 0 0-6.634 6.646M21.76 33.729a5059.26 5059.26 0 0 0 8.387-8.4L7.459 2.598s-.41-.43-1.313.477C4.353 4.862.884 16.248 15.591 30.977c2.331 2.336 4.359 2.66 6.169 2.752" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Save Recipes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Keep all your favourite recipes in one place with ingredients and step-by-step directions.
                </p>
              </div>

              <div className="bg-white dark:bg-dark-base rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-surface">
                <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-dark-surface flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" className="text-brand-500">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.5961 2.80655C15.4524 2.33787 15.0735 2 14.6891 2H9.06392C8.67947 2 8.30053 2.33787 8.15688 2.80655L7.4215 5H3C1.89543 5 1 5.89543 1 7V20C1 21.1046 1.89543 22 3 22H21C22.1046 22 23 21.1046 23 20V7C23 5.89543 22.1046 5 21 5H16.331L15.5961 2.80655ZM16 13C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Upload Photos</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Attach a photo to every recipe so you always know exactly what you&apos;re making.
                </p>
              </div>

              <div className="bg-white dark:bg-dark-base rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-surface">
                <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-dark-surface flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" className="text-brand-500">
                    <path d="M12.9121 1.59053C12.7508 1.2312 12.3936 1 11.9997 1C11.6059 1 11.2487 1.2312 11.0874 1.59053L8.27041 7.86702L1.43062 8.60661C1.03903 8.64895 0.708778 8.91721 0.587066 9.2918C0.465355 9.66639 0.574861 10.0775 0.866772 10.342L5.96556 14.9606L4.55534 21.6942C4.4746 22.0797 4.62768 22.4767 4.94632 22.7082C5.26497 22.9397 5.68983 22.9626 6.03151 22.7667L11.9997 19.3447L17.968 22.7667C18.3097 22.9626 18.7345 22.9397 19.0532 22.7082C19.3718 22.4767 19.5249 22.0797 19.4441 21.6942L18.0339 14.9606L23.1327 10.342C23.4246 10.0775 23.5341 9.66639 23.4124 9.2918C23.2907 8.91721 22.9605 8.64895 22.5689 8.60661L15.7291 7.86702L12.9121 1.59053Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Star Ratings</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Rate every dish out of 10 so you always know which recipes are worth making again.
                </p>
              </div>

              <div className="bg-white dark:bg-dark-base rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-surface">
                <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-dark-surface flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" className="text-brand-500">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Search &amp; Sort</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Find any recipe instantly by name, or sort by date, rating, or alphabetically.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
              How it works
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-4 items-start justify-center">

              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-brand-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Create an account</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Sign up for free in seconds. No credit card required.
                </p>
              </div>

              <div className="hidden sm:flex items-center pt-7 text-gray-300 dark:text-gray-600 shrink-0">
                <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
                  <path d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.5303 13.0303C20.8232 12.7374 20.8232 12.2626 20.5303 11.9697L14.5303 5.96967C14.2374 5.67678 13.7626 5.67678 13.4697 5.96967C13.1768 6.26256 13.1768 6.73744 13.4697 7.03033L18.1893 11.75H4C3.58579 11.75 3.25 12.0858 3.25 12.5C3.25 12.9142 3.58579 13.25 4 13.25H18.1893L13.4697 17.9697Z" />
                </svg>
              </div>

              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-brand-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Add your recipes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Save recipes with a photo, ingredients, directions, and a rating.
                </p>
              </div>

              <div className="hidden sm:flex items-center pt-7 text-gray-300 dark:text-gray-600 shrink-0">
                <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
                  <path d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.5303 13.0303C20.8232 12.7374 20.8232 12.2626 20.5303 11.9697L14.5303 5.96967C14.2374 5.67678 13.7626 5.67678 13.4697 5.96967C13.1768 6.26256 13.1768 6.73744 13.4697 7.03033L18.1893 11.75H4C3.58579 11.75 3.25 12.0858 3.25 12.5C3.25 12.9142 3.58579 13.25 4 13.25H18.1893L13.4697 17.9697Z" />
                </svg>
              </div>

              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-brand-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Find what to cook</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Search, sort, and browse your collection whenever inspiration strikes.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-white/60 dark:bg-black/10">
          <div className="max-w-xl mx-auto text-center">
            <h2
              className="text-brand-500 mb-4 leading-none"
              style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(48px, 10vw, 80px)' }}
            >
              Ready to cook?
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-8">
              Join Bust and start building your personal recipe collection today.
            </p>
            <Link href="/signup" className="bg-brand-500 hover:bg-brand-600 text-white text-base font-medium px-10 py-3.5 rounded-full transition-colors shadow-sm inline-block">
              Create a free account
            </Link>
          </div>
        </section>

      </main>

      <footer className="py-6 px-6 text-center text-sm text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-dark-surface">
        © {new Date().getFullYear()} Bust. All rights reserved.
      </footer>

    </div>
  )
}
