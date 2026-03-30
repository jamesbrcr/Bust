export default function ConfirmEmailPage() {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-dark-surface flex items-center justify-center mx-auto">
        <svg viewBox="0 0 24 24" width={32} height={32} fill="currentColor" className="text-brand-500">
          <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V7.76453L12 13.4303L2 7.76453V6ZM2 9.97579V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V9.97579L12 15.6415L2 9.97579Z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Check your email</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        We sent a confirmation link to your email address. Click the link to activate your account and get started.
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Didn&apos;t receive it? Check your spam folder.
      </p>
    </div>
  )
}
