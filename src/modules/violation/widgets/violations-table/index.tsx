import { ErrorMessage, Loading } from '@/shared/ui'
import { useGetViolations } from '../../hooks'
import { EntityTable } from '@/modules/core/widgets'

export const ViolationTable = () => {
  const {
    data: violations,
    isLoading: isViolationsLoading,
    isError: isViolationsError
  } = useGetViolations()

  if (isViolationsLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isViolationsError) {
    return (
      <div className="flex h-32 items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (violations.length > 0) {
      return (
        <EntityTable
          type="violations"
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
          data={violations}
        />
      )
    } else {
      return <h2>Нету данных...</h2>
    }
  }
}
