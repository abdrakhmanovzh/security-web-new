import { ErrorMessage, Loading } from '@/shared/ui'
import { useGetCheckpoints } from '../../hooks'
import { EntityTable } from '@/modules/core/widgets'

export const CheckpointsTable = () => {
  const {
    data: checkpoints,
    isLoading: isCheckpointsLoading,
    isError: isCheckpointsError
  } = useGetCheckpoints()

  if (isCheckpointsLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isCheckpointsError) {
    return (
      <div className="flex h-32 items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (checkpoints.length > 0) {
      return (
        <EntityTable
          type="checkpoints"
          head={[
            '#',
            'Регион',
            'Зона/Объект',
            'КПП',
            'Камера',
            'Дата',
            'Время',
            'Тип нарушения',
            'Статус распознавания'
          ]}
          data={checkpoints}
        />
      )
    } else {
      return <h2>Нету данных...</h2>
    }
  }
}
