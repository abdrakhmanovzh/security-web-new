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

  const tableHead = ['#', 'Имя', 'Дата', 'Время', 'Статус верификации']

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
      const groups = mobileGroupsData.data.sort((a, b)=> dayjs(b.created_at).unix() - dayjs(a.created_at).unix())
     
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
                onClick={() => handleRowClick(`/mobile-groups/${row.id}`)}
              >
                <td>{row.id}</td>
                <td>{row.person_name}</td>
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
