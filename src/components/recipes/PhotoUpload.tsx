'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PhotoUploadProps {
  existingUrl?: string | null
}

export default function PhotoUpload({ existingUrl }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(existingUrl ?? null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    // Inject into hidden file input via DataTransfer
    const dt = new DataTransfer()
    dt.items.add(file)
    if (inputRef.current) inputRef.current.files = dt.files
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors',
          dragging ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300 bg-gray-50',
          preview ? 'aspect-video' : 'h-36'
        )}
      >
        {preview ? (
          <Image src={preview} alt="Recipe photo" fill className="object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Click or drag to upload a photo</span>
          </div>
        )}
        {preview && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPreview(null); if (inputRef.current) inputRef.current.value = '' }}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        name="photo"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
