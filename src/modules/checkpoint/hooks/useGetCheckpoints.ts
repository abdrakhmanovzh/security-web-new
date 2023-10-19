import { useQuery } from '@tanstack/react-query'
import { ICheckpoint } from '../entities'

export const useGetCheckpoints = () => {
  return useQuery(['checkpooints'], async () => {
    return new Promise<ICheckpoint[]>((resolve, reject) => {
      setTimeout(() => {
        const objects: ICheckpoint[] = [
          {
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
          },
          {
            id: '2',
            region_id: 'Санкт-Петербург',
            zone_id: 'Север',
            gate_id: 'КПП-2',
            camera_id: 'Камера-2',
            date: '02.01.2022',
            time: '13:00',
            type: 'Проезд на красный',
            status: 'Не распознано',
            image: ''
          },
          {
            id: '3',
            region_id: 'Оренбург',
            zone_id: 'Центр',
            gate_id: 'КПП-10',
            camera_id: 'Камера-10',
            date: '23.01.2022',
            time: '00:00',
            type: 'Превышение скорости',
            status: 'Распознано',
            image: ''
          }
        ]
        resolve(objects)
      }, 1000)
    })
  })
}
