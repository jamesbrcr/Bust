'use client'

import { useEffect } from 'react'
import Button from './Button'

interface ModalProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  confirmVariant?: 'primary' | 'danger'
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function Modal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  confirmVariant = 'primary',
  loading,
  onConfirm,
  onCancel,
}: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white dark:bg-dark-base rounded-xl shadow-xl border border-transparent dark:border-dark-surface max-w-sm w-full p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{description}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
