import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IViolation } from '../entities'
import { AxiosResponse } from 'axios'

export const useGetViolation = (detectionId: number) => {
  const queryClient = useQueryClient()

  const violationsData = queryClient.getQueryData<AxiosResponse<IViolation[]>>(['violations'])

  if (violationsData?.data.length === 0) {
    queryClient.refetchQueries(['violations']).then(() => {
      return violationsData?.data.filter((violation) => violation.detection.id === detectionId)
    })
  }

  return violationsData?.data.filter((violation) => violation.detection.id === detectionId)
}
