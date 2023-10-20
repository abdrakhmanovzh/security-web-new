import { useQuery } from '@tanstack/react-query'
import { IIncident } from '../entities'
import { axiosInstance } from '@/modules/core/utils'

export const useGetIncidents = () => {
  return useQuery(['incidents'], async () => {
    return axiosInstance.get<IIncident[]>('/humans/incidents')
  })
}
