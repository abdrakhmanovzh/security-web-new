import { useRouter } from 'next/router'
import { useGetCheckpoints } from '../../hooks'
import { ErrorMessage, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export const CheckpointDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: checkpointData,
    isLoading: isCheckpointLoading,
    isError: isCheckpointError
  } = useGetCheckpoints()

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
    if (checkpointData?.data.length !== 0) {
      const checkpoint = checkpointData.data.filter((item) => item.id === Number(id))
      return (
        <>
          <div className="h-96 w-[35%]">
            <div className="h-full w-full rounded-xl bg-gray-300"></div>
          </div>
          <HorizontalTable
            head={['Имя', 'КПП', 'Камера', 'Дата', 'Время', 'Статус распознавания']}
            data={[
              checkpoint[0].name,
              checkpoint[0].zone_id,
              `Камера ${checkpoint[0].camera_id}`,
              dayjs(checkpoint[0].created_at).locale('ru').format('MMMM YYYY'),
              dayjs(checkpoint[0].created_at).format('HH:mm'),
              checkpoint[0].is_approved ? 'Подтверждено' : 'Не подтверждено'
            ]}
          />
        </>
      )
    }
  }
}
