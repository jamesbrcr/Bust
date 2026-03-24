import { cn } from '@/lib/utils'
import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export default function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          'w-full rounded-lg border border-gray-300 dark:border-dark-surface bg-white dark:bg-dark-surface px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-gray-50 dark:disabled:bg-dark-base resize-y min-h-[80px]',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
