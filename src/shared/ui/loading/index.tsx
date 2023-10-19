import { cn } from '@/shared/utils'

interface Props {
  className?: string
}

export const Loading = ({ className }: Props) => {
  return <span className={cn('loading loading-spinner loading-lg', className)}></span>
}
