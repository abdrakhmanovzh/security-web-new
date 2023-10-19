import Image from 'next/image'
import { cn } from '@/shared/utils'
import { LoadingIcon } from '@/assets/images/loaders'

interface Props {
  text: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  disabled?: boolean
  loading?: boolean
}

export const Button = ({ onClick, type, text, className, disabled, loading }: Props) => {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-primary text-white  disabled:bg-disabled-bg disabled:text-disabled-text flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold',
        className
      )}
    >
      {loading ? <Image src={LoadingIcon} width={24} height={24} alt="загрузка..." /> : text}
    </button>
  )
}
