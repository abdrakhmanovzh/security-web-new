import { useQuery } from '@tanstack/react-query'
import { IMobileGroup } from '../entities'
import { axiosInstance } from '@/modules/core/utils'

export const useGetMobileGroup = (tripId: string) => {
  return useQuery(
    ['mobile-group', tripId],
    async () => {
      const { data } = await axiosInstance.get<IMobileGroup[]>(`/face_incident/trips/${tripId}`)

      return data
    },
    {
      enabled: !!tripId
    }
  )
}
