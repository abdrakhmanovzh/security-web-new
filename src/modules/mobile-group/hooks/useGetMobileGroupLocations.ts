import { axiosInstance } from '@/modules/core/utils'
import { useQuery } from '@tanstack/react-query'
import { IMmobileGroupLocation } from '../entities/mobile-group'

export const useGetMobileGroupLocations = (tripId: string) => {
  return useQuery(
    ['locations', tripId],
    async () => {
      return axiosInstance.get<IMmobileGroupLocation[]>(`/face_incident/locations/${tripId}/`)
    },
    {
      enabled: !!tripId
    }
  )
}
