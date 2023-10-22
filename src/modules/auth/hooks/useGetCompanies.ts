import { ICompany } from '@/modules/core/entities'
import { axiosInstance } from '@/modules/core/utils'
import { useQuery } from '@tanstack/react-query'

export const useGetCompanies = () => {
  return useQuery(['companies'], async () => {
    return axiosInstance.get<ICompany[]>('/companies/list')
  })
}
