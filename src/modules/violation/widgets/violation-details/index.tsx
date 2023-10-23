import { useRouter } from 'next/router'
import { useGetViolations } from '../../hooks'
import { Button, ErrorMessage, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IViolation } from '../../entities'
import { axiosInstance } from '@/modules/core/utils'

export const ViolationDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [violation, setViolation] = useState<IViolation | null>(null)
  const [image, setImage] = useState<string | null>(null)

  const {
    data: violationsData,
    isLoading: isViolationsLoading,
    isError: isViolationsError
  } = useGetViolations()

  useEffect(() => {
    if (violationsData && violationsData.data && violationsData.data.length > 0) {
      setViolation(violationsData.data.filter((item) => item.detection.id === Number(id))[0])
    }
  }, [id, violationsData])

  useEffect(() => {
    async function getImage() {
      if (violation) {
        const response = await axiosInstance.get(
          `/frame/bbox?incident_id=${violation.process_incident.id}`
        )

        setImage('data:image/jpeg;base64,' + response.data?.image)
      }
    }
    getImage()
  }, [violation])

  if (isViolationsLoading) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isViolationsError) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (violationsData?.data.length !== 0) {
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
                violation?.region.name,
                violation?.place.name,
                violation?.zone.name,
                `Камера ${violation?.camera.purpose}`,
                dayjs(violation?.created_at)
                  .locale('ru')
                  .format('DD MMMM YYYY'),
                dayjs(violation?.created_at).format('HH:mm'),
                violation?.detection.object == 'rifle'
                  ? 'Винтовка'
                  : violation?.detection.object == 'knife'
                    ? 'Нож'
                    : 'Пистолет',
                violation?.detection.is_approved ? 'Подтверждено' : 'На рассмотрении'
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
