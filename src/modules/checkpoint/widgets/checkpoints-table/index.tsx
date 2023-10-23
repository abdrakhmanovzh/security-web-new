import { ErrorMessage, Loading } from '@/shared/ui'
import { useGetCheckpoints } from '../../hooks'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useRouter } from 'next/router'

export const CheckpointsTable = () => {
  const router = useRouter()

  const {
    data: checkpointsData,
    isLoading: isCheckpointsLoading,
    isError: isCheckpointsError
  } = useGetCheckpoints()

  const handleRowClick = (path: string) => {
    router.push(path)
  }

  const tableHead = ['#', 'Имя', 'КПП', 'Дата', 'Время', 'Статус верификации']

  console.log(checkpointsData?.data)

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
    if (checkpointsData.data.length > 0) {
      const checkpoints = checkpointsData.data.sort((a,b)=> b.id - a.id)
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
            {checkpoints.map((row, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handleRowClick(`/checkpoints/${row.id}`)}
              >
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.zone_id}</td>
                <td>{dayjs(row.created_at).locale('ru').format('DD MMMM YYYY')}</td>
                <td>{dayjs(row.created_at).locale('ru').format('HH:mm')}</td>
                <td>{row.is_approved ? 'Верифицировано' : 'Не верифицировано'}</td>
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
