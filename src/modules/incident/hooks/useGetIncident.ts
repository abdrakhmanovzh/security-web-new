import { useQuery } from '@tanstack/react-query'
import { IIncident } from '../entities'

export const useGetIncident = (id: string) => {
  return useQuery(['incident', id], async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const object: IIncident = {
          id: '1',
          region_id: 'Москва',
          zone_id: 'Центр',
          gate_id: 'КПП-1',
          camera_id: 'Камера-1',
          date: '01.01.2022',
          time: '12:00',
          type: 'Превышение скорости',
          status: 'Распознано',
          image: ''
        }

        resolve(object)
      }, 1000)
    })
  })
}
