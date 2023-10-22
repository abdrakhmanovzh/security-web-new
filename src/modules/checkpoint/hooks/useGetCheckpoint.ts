import { useQuery } from '@tanstack/react-query'
import { ICheckpoint } from '../entities'
import { axiosInstance } from '@/modules/core/utils'

export const useGetCheckpoint = (id: string) => {
  return useQuery(
    ['checkpoint', id],
    async () => {
      return axiosInstance.get<ICheckpoint>(`/face_incident/checkpoints/${id}`)
    },
    {
      enabled: !!id
    }
  )
}
