import { useRouter } from 'next/router'
import { useGetMobileGroup, useGetMobileGroups } from '../../hooks'
import { ErrorMessage, Header, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Image from 'next/image'

export const MobileGroupDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: mobileGroupsData,
    isLoading: isMobileGroupsLoading,
    isError: isMobileGroupsError
  } = useGetMobileGroup(id as string)

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
    if (mobileGroupsData !== null) {
      return (
        <div className="flex w-full flex-col gap-8">
          {mobileGroupsData.map((group) => (
            <div key={group.face_incident_id} className="flex w-full justify-between">
              <div className="h-80 w-[25%]">
                <div className="relative h-full w-full rounded-xl bg-gray-300">
                  <Image src={'data:image/jpeg;base64,' + group.content} alt="" fill />
                </div>
              </div>
              <HorizontalTable
                className="h-80"
                head={['Имя', 'Этап', 'Дата', 'Время', 'Статус распознавания']}
                data={[
                  group.person_name,
                  group.value,
                  dayjs(group.created_at).locale('ru').format('DD MMMM YYYY'),
                  dayjs(group.created_at).format('HH:mm'),
                  group.is_approved ? 'Подтверждено' : 'Не подтверждено'
                ]}
              />
            </div>
          ))}
        </div>
      )
    }
  }
}
