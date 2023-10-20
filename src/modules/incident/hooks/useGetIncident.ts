import { useQueryClient } from '@tanstack/react-query'
import { IIncident } from '../entities'
import { AxiosResponse } from 'axios'

export const useGetIncident = (detectionId: number) => {
  const queryClient = useQueryClient()

  const incidentsData = queryClient.getQueryData<AxiosResponse<IIncident[]>>(['incidents'])

  if (incidentsData?.data.length === 0) {
    queryClient.refetchQueries(['incidents']).then(() => {
      return null
    })
  }

  return incidentsData?.data.filter((incident) => incident.detection.id === detectionId)
}
