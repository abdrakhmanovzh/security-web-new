import { ErrorMessage, Loading } from '@/shared/ui'
import { useGetMobileGroups } from '../../hooks'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export const MobileGroupsTable = () => {
  const router = useRouter()

  const {
    data: mobileGroupsData,
    isLoading: isMobileGroupsLoading,
    isError: isMobileGroupsError
  } = useGetMobileGroups()

  const handleRowClick = (path: string) => {
    router.push(path)
  }

  const tableHead = ['#', 'Имя', 'Этап', 'Дата', 'Время', 'Статус распознавания']

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
    if (mobileGroupsData.data.length > 0) {
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
            {mobileGroupsData.data.map((row, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handleRowClick(`/mobile-groups/${row.id}`)}
              >
                <td>{row.id}</td>
                <td>{row.person_name}</td>
                <td>{row.stage}</td>
                <td>{dayjs(row.created_at).locale('ru').format('MMMM YYYY')}</td>
                <td>{dayjs(row.created_at).locale('ru').format('HH:mm')}</td>
                <td>{row.is_approved ? 'Подтверждено' : 'Не подтверждено'}</td>
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
