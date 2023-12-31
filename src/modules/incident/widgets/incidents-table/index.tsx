import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { ErrorMessage, Loading } from '@/shared/ui'
import { useGetIncidents } from '@/modules/incident/hooks'
import 'dayjs/locale/ru'

export const IncidentsTable = () => {
  const router = useRouter()

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

  const {
    data: incidentsData,
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
    if (incidentsData.data.length > 0) {

      const groups = incidentsData.data.sort((a, b)=> b.detection.id - a.detection.id)
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
            {groups.map((row, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handleRowClick(`/incidents/${row.detection.id}`)}
              >
                <td>{row.detection.id}</td>
                <td>{row.region.name}</td>
                <td>{row.place.name}</td>
                <td>{row.zone.name}</td>
                <td>Камера {row.camera.purpose}</td>
                <td>{dayjs(row.detection.created_at).locale('ru').format('DD MMMM YYYY')}</td>
                <td>{dayjs(row.detection.created_at).format('HH:mm')}</td>
                <td>Человек</td>
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
