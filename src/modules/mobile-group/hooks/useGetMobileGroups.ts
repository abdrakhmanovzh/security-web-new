import { useQuery } from '@tanstack/react-query'
import { IMobileGroup } from '../entities'
import { axiosInstance } from '@/modules/core/utils'

export const useGetMobileGroups = () => {
  return useQuery(['mobile-groups'], async () => {
    return await axiosInstance.get<IMobileGroup[]>('/face_incident/trips/')
  })
}
