import { cn } from '@/shared/utils'

interface Props {
  text: string
  className?: string
}

export const Header = ({ text, className }: Props) => {
  return <h1 className={cn('text-3xl font-medium text-black', className)}>{text}</h1>
}
