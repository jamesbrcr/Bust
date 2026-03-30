import { cn } from '@/lib/utils'
import { LabelHTMLAttributes } from 'react'

export default function Label({ className, children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1', className)}
      {...props}
    >
      {children}
    </label>
  )
}
