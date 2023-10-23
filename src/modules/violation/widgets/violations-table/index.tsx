import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { ErrorMessage, Loading } from '@/shared/ui'
import { useGetViolations } from '@/modules/violation/hooks'
import 'dayjs/locale/ru'

export const ViolationTable = () => {
  const router = useRouter()

  const {
    data: violationsData,
    isLoading: isViolationsLoading,
    isError: isViolationsError
  } = useGetViolations()

  const handleRowClick = (path: string) => {
    router.push(path)
  }

  const tableHead = [
    '#',
    'Регион',
    'Зона/Объект',
    'КПП',
    'Камера',
    'Дата',
    'Время',
    'Тип нарушения',
    'Статус нарушения'
  ]

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
    if (violationsData.data.length > 0) {
      return (
        <table className="table w-full overflow-x-scroll bg-white">
          <thead className="text-sm text-black">
            <tr>
              {tableHead.map((heading, index) => (
                <th key={index} className="col-span-1">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {violationsData.data.map((row, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handleRowClick(`/violations/${row.detection.id}`)}
              >
                <td>{row.detection.id}</td>
                <td>{row.region.name}</td>
                <td>{row.place.name}</td>
                <td>{row.zone.name}</td>
                <td>Камера {row.camera.purpose}</td>
                <td>{dayjs(row.created_at).locale('ru').format('DD MMMM YYYY')}</td>
                <td>{dayjs(row.created_at).format('HH:mm')}</td>
                <td>
                  {row.detection.object == 'rifle'
                    ? 'Винтовка'
                    : row.detection.object == 'knife'
                    ? 'Нож'
                    : 'Пистолет'}
                </td>
                <td>{row.detection.is_approved ? 'Подтверждено' : 'На рассмотрении'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else {
      return <h2>Нету данных...</h2>
    }
  }
}
