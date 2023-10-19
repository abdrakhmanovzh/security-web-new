import { Exo_2 } from 'next/font/google'
import { cn } from '@/shared/utils'
import { Navbar } from '@/modules/navbar/widgets'

interface Props {
  children: React.ReactNode
  className?: string
}

const font = Exo_2({ subsets: ['cyrillic'] })

export const MainLayout = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'flex min-h-[100svh] w-screen flex-col items-center justify-center bg-main-white',
        font.className,
        className
      )}
    >
      <Navbar />
      {children}
    </div>
  )
}
