const FULL_PATH = 'M12.9121 1.59053C12.7508 1.2312 12.3936 1 11.9997 1C11.6059 1 11.2487 1.2312 11.0874 1.59053L8.27041 7.86702L1.43062 8.60661C1.03903 8.64895 0.708778 8.91721 0.587066 9.2918C0.465355 9.66639 0.574861 10.0775 0.866772 10.342L5.96556 14.9606L4.55534 21.6942C4.4746 22.0797 4.62768 22.4767 4.94632 22.7082C5.26497 22.9397 5.68983 22.9626 6.03151 22.7667L11.9997 19.3447L17.968 22.7667C18.3097 22.9626 18.7345 22.9397 19.0532 22.7082C19.3718 22.4767 19.5249 22.0797 19.4441 21.6942L18.0339 14.9606L23.1327 10.342C23.4246 10.0775 23.5341 9.66639 23.4124 9.2918C23.2907 8.91721 22.9605 8.64895 22.5689 8.60661L15.7291 7.86702L12.9121 1.59053Z'
const HALF_PATH = 'M11.9997 1C11.6059 1 11.2487 1.2312 11.0874 1.59053L8.27041 7.86702L1.43062 8.60661C1.03903 8.64895 0.708778 8.91721 0.587066 9.2918C0.465355 9.66639 0.574861 10.0775 0.866772 10.342L5.96556 14.9606L4.55534 21.6942C4.4746 22.0797 4.62768 22.4767 4.94632 22.7082C5.26497 22.9397 5.68983 22.9626 6.03151 22.7667L11.9997 19.3447V1Z'

interface StarRatingProps {
  value: number | null
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 22, md: 26, lg: 32 }

function getStarType(position: number, displayValue: number): 'full' | 'half' | 'empty' {
  if (displayValue >= position) return 'full'
  if (displayValue >= position - 0.5) return 'half'
  return 'empty'
}

export default function StarRating({ value, size = 'md' }: StarRatingProps) {
  if (value === null || value === undefined) return null

  const displayValue = value / 2
  const px = sizes[size]

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((position) => {
        const type = getStarType(position, displayValue)
        return (
          <span key={position} className="relative inline-block shrink-0" style={{ width: px, height: px }}>
            <svg viewBox="0 0 24 24" width={px} height={px} className="text-gray-300 dark:text-gray-600">
              <path d={FULL_PATH} fill="currentColor" />
            </svg>
            {type !== 'empty' && (
              <svg viewBox="0 0 24 24" width={px} height={px} className="absolute inset-0 text-brand-400">
                <path d={type === 'full' ? FULL_PATH : HALF_PATH} fill="currentColor" />
              </svg>
            )}
          </span>
        )
      })}
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-0.5">{value}/10</span>
    </div>
  )
}
