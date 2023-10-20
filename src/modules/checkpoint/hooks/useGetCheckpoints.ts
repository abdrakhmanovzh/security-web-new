import { useQuery } from '@tanstack/react-query'
import { ICheckpoint } from '../entities'
import { axiosInstance } from '@/modules/core/utils'

export const useGetCheckpoints = () => {
  return useQuery(['checkpoints'], async () => {
    return axiosInstance.get<ICheckpoint[]>('/face_incident/checkpoints/')
  })
}
