import { useQuery } from '@tanstack/react-query'
import { IMobileGroup } from '../entities'
import { axiosInstance } from '@/modules/core/utils'

export const useGetMobileGroup = (personId: string) => {
  return useQuery(['mobile-group', personId], async () => {
    const { data } = await axiosInstance.get<IMobileGroup>(`/face_incident/trips/`)

    const { data: personData } = await axiosInstance.get(`/persons/get/${personId}`)

    return {
      ...data,
      person: personData
    }
  })
}
