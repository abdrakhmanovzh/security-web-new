import Image from 'next/image'
import { ErrorIcon } from '@/assets/images/icons'

interface Props {
  message: string
}

export const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-red-200 px-3 py-2 text-sm">
      <Image src={ErrorIcon} alt="x" width={16} />
      {message}
    </div>
  )
}
