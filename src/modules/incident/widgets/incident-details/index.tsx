import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button, ErrorMessage, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'
import { useGetIncidents } from '@/modules/incident/hooks'
import { useEffect, useRef, useState } from 'react'
import { IIncident } from '../../entities'
import { axiosInstance } from '@/modules/core/utils'

export const IncidentDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const [incident, setIncident] = useState<IIncident | null>(null)
  const [image, setImage] = useState<string | null>(null)

  const {
    data: incidentsData,
    isLoading: isIncidentsLoading,
    isError: isIncidentsError
  } = useGetIncidents()

  useEffect(() => {
    if (incidentsData && incidentsData.data && incidentsData.data.length > 0) {
      setIncident(incidentsData.data.filter((item) => item.detection.id === Number(id))[0])
    }
  }, [id, incidentsData])

  useEffect(() => {
    async function getImage() {
      if (incident) {
        const response = await axiosInstance.get(
          `/frame/bbox?incident_id=${incident.process_incident.id}`
        )

        setImage('data:image/jpeg;base64,' + response.data?.image)
      }
    }
    getImage()
  }, [incident])

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
      return (
        <div className='flex flex-col gap-8 w-full'>
          <div className='flex justify-between'>
            <div className="h-96 w-[35%]">
              <div className="relative h-full w-full rounded-xl bg-gray-300">
                {image && <Image src={image} alt="" fill />}
              </div>
            </div>
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
                'Статус нарушения'
              ]}
              data={[
                id,
                incident?.region.name,
                incident?.place.name,
                incident?.zone.name,
                `Камера ${incident?.camera.purpose}`,
                dayjs(incident?.detection.created_at)
                  .locale('ru')
                  .format('DD MMMM YYYY'),
                dayjs(incident?.detection.created_at).format('HH:mm'),
                'Человек',
                incident?.detection.is_approved ? 'Подтверждено' : 'На рассмотрении'
              ]}
            />
          </div>
          <div className='flex gap-10 justify-end items-center'>
            <h2 className='text-xl font-semibold underline underline-offset-4'>Подтвердить нарушение?</h2>
            <Button text="ПОДТВЕРДИТЬ" className="w-fit px-3 bg-green-500" />
            <Button text='ОТКЛОНИТЬ' className='w-fit px-3 bg-red-500' />
          </div>
        </div>
      )
    }
  }
}
