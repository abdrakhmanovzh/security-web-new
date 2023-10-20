import { axiosInstance } from '@/modules/core/utils'
import { useQuery } from '@tanstack/react-query'
import { IViolation } from '../entities'

export const useGetViolations = () => {
  return useQuery(['violations'], async () => {
    return axiosInstance.get<IViolation[]>('/violations/incidents')
  })
}
