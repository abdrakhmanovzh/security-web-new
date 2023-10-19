import { twMerge } from 'tw-merge'
import clsx, { ClassValue } from 'clsx'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
