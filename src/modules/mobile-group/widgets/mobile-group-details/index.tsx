import { useRouter } from 'next/router'
import { useGetMobileGroup } from '../../hooks'
import { ErrorMessage, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'

export const MobileGroupDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: mobileGroup,
    isLoading: isMobileGroupLoading,
    isError: isMobileGroupError
  } = useGetMobileGroup(id as string)

  if (isMobileGroupLoading) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isMobileGroupError || mobileGroup === null) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (mobileGroup !== null) {
      return (
        <>
          <div className="h-96 w-[35%]">
            <div className="h-full w-full rounded-xl bg-gray-300"></div>
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
              'Статус распознания'
            ]}
            data={Object.values(mobileGroup as Object).filter((value) => value !== '')}
          />
        </>
      )
    }
  }
}
