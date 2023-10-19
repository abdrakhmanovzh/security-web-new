import { ErrorMessage, Loading } from '@/shared/ui'
import { useGetIncidents } from '../../hooks'
import { EntityTable } from '@/modules/core/widgets'

export const IncidentsTable = () => {
  const {
    data: incidents,
    isLoading: isIncidentsLoading,
    isError: isIncidentsError
  } = useGetIncidents()

  if (isIncidentsLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isIncidentsError) {
    return (
      <div className="flex h-32 items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (incidents.length > 0) {
      return (
        <EntityTable
          type="incidents"
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
          data={incidents}
        />
      )
    } else {
      return <h2>Нету данных...</h2>
    }
  }
}
