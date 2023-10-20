import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ErrorMessage, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'
import { useGetIncidents } from '@/modules/incident/hooks'
import { useRef } from 'react'
import { IncidentImage } from './incident-image'

export const IncidentDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: incidentsData,
    isLoading: isIncidentsLoading,
    isError: isIncidentsError
  } = useGetIncidents()

  if (isIncidentsLoading) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isIncidentsError) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (incidentsData?.data.length !== 0) {
      const incident = incidentsData.data.filter((item) => item.detection.id === Number(id))

      return (
        <>
          <IncidentImage />
          <HorizontalTable
            head={[
              'ID',
              'Регион',
              'Зона/Объект',
              'КПП',
              'Камера',
              'Дата',
              'Время',
              'Тип нарушения',
              'Статус распознания'
            ]}
            data={[
              id,
              incident[0].region.name,
              incident[0].place.name,
              incident[0].zone.name,
              `Камера ${incident[0].camera.purpose}`,
              dayjs(incident[0].created_at).locale('ru').format('MMMM YYYY'),
              dayjs(incident[0].created_at).format('HH:mm'),
              'Человек',
              incident[0].detection.is_approved ? 'Подтверждено' : 'Не подтверждено'
            ]}
          />
        </>
      )
    }
  }
}
