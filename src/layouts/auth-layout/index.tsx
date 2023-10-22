import { Exo_2 } from 'next/font/google'
import { cn } from '@/shared/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

const font = Exo_2({ subsets: ['cyrillic'] })

export const AuthLayout = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'max-w-screen flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-main-white',
        font.className,
        className
      )}
    >
      {children}
    </div>
  )
}
