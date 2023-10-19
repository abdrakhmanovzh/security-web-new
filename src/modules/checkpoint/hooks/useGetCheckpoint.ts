import { useQuery } from '@tanstack/react-query'
import { ICheckpoint } from '../entities'

export const useGetCheckpoint = (id: string) => {
  return useQuery(['checkpoint', id], async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const object: ICheckpoint = {
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
