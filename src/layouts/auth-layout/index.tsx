import { Exo_2 } from 'next/font/google'
import { cn } from '@/shared/utils'

interface Props {
  children: React.ReactNode
}

const font = Exo_2({ subsets: ['cyrillic'] })

export const AuthLayout = ({ children }: Props) => {
  return (
    <div
      className={cn(
        'flex min-h-[100svh] w-screen flex-col items-center justify-center gap-8 bg-main-white',
        font.className
      )}
    >
      {children}
    </div>
  )
}
