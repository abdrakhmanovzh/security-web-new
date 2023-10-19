import { cn } from '@/shared/utils'

interface Props {
  head: string[]
  data: string[]
  className?: string
}

export const HorizontalTable = ({ data, head, className }: Props) => {
  return (
    <div className={cn('flex h-96 w-[60%] rounded-xl border-2 shadow-md', className)}>
      <div className="h-full w-[30%] border-r-2">
        {/* head */}
        <ul className="flex h-full w-full flex-col justify-between font-medium">
          {head.map((heading, index) => (
            <li
              key={index}
              className="border-b-2 py-2 pl-4 font-bold first:pt-3 last:border-b-0 last:pb-3"
            >
              {heading}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-full flex-1">
        {/* body */}
        <ul className="flex h-full w-full flex-col justify-between font-medium">
          {data.map((item, index) => (
            <li key={index} className="border-b-2 py-2 pl-4 first:pt-3 last:border-b-0 last:pb-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
