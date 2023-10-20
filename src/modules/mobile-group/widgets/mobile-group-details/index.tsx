import { useRouter } from 'next/router'
import { useGetMobileGroups } from '../../hooks'
import { ErrorMessage, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export const MobileGroupDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: mobileGroupsData,
    isLoading: isMobileGroupsLoading,
    isError: isMobileGroupsError
  } = useGetMobileGroups()

  if (isMobileGroupsLoading) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isMobileGroupsError) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (mobileGroupsData?.data.length !== 0) {
      const group = mobileGroupsData.data.filter((item) => item.id === Number(id))

      return (
        <>
          <div className="h-96 w-[35%]">
            <div className="h-full w-full rounded-xl bg-gray-300"></div>
          </div>
          <HorizontalTable
            head={['#', 'Имя', 'Этап', 'Дата', 'Время', 'Статус распознавания']}
            data={[
              id,
              group[0].person_name,
              group[0].stage,
              dayjs(group[0].created_at).locale('ru').format('MMMM YYYY'),
              dayjs(group[0].created_at).format('HH:mm'),
              group[0].is_approved ? 'Подтверждено' : 'Не подтверждено'
            ]}
          />
        </>
      )
    }
  }
}
