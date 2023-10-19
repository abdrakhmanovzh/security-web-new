import { ErrorMessage, Loading } from '@/shared/ui'
import { useGetMobileGroups } from '../../hooks'
import { EntityTable } from '@/modules/core/widgets'

export const MobileGroupsTable = () => {
  const {
    data: mobileGroups,
    isLoading: isMobileGroupsLoading,
    isError: isMobileGroupsError
  } = useGetMobileGroups()

  if (isMobileGroupsLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isMobileGroupsError) {
    return (
      <div className="flex h-32 items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (mobileGroups.length > 0) {
      return (
        <EntityTable
          type="mobile-groups"
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
          data={mobileGroups}
        />
      )
    } else {
      return <h2>Нету данных...</h2>
    }
  }
}
