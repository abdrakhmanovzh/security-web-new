import { IRegion } from '@/modules/core/entities'
import { axiosInstance } from '@/modules/core/utils'
import { useQuery } from '@tanstack/react-query'

export const useGetRegions = () => {
  return useQuery(['regions'], async () => {
    return axiosInstance.get<IRegion[]>('/regions/list')
  })
}
