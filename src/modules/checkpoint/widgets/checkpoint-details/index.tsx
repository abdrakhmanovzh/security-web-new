import { useRouter } from 'next/router'
import { useGetCheckpoint, useGetCheckpoints } from '../../hooks'
import { ErrorMessage, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Image from 'next/image'

export const CheckpointDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: checkpointData,
    isLoading: isCheckpointLoading,
    isError: isCheckpointError
  } = useGetCheckpoint(id as string)

  if (isCheckpointLoading) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isCheckpointError) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (checkpointData?.data !== null) {
      const checkpoint = checkpointData.data
      return (
        <>
          <div className="h-80 w-[25%]">
            <div className="relative h-full w-full rounded-xl bg-gray-300">
              <Image src={'data:image/jpeg;base64,' + checkpoint.content} alt="" fill />
            </div>
          </div>
          <HorizontalTable
            className="h-80"
            head={['Имя', 'КПП', 'Дата', 'Время', 'Статус нарушения']}
            data={[
              checkpoint.name,
              checkpoint.zone_id,
              dayjs(checkpoint.created_at).locale('ru').format('DD MMMM YYYY'),
              dayjs(checkpoint.created_at).format('HH:mm'),
              checkpoint.is_approved ? 'Подтверждено' : 'Не подтверждено'
            ]}
          />
        </>
      )
    }
  }
}
