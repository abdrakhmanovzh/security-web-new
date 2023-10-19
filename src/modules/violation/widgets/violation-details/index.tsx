import { useRouter } from 'next/router'
import { useGetViolation } from '../../hooks'
import { ErrorMessage, Loading } from '@/shared/ui'
import { HorizontalTable } from '@/modules/core/widgets'

export const ViolationDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: violation,
    isLoading: isViolationLoading,
    isError: isViolationError
  } = useGetViolation(id as string)

  if (isViolationLoading) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <Loading />
      </div>
    )
  } else if (isViolationError || violation === null) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (violation !== null) {
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
            data={Object.values(violation as Object).filter((value) => value !== '')}
          />
        </>
      )
    }
  }
}
