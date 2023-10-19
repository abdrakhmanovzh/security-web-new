import { IViolation } from '@/modules/violation/entities'
import { useRouter } from 'next/router'

interface Props {
  type: 'violations' | 'checkpoints' | 'mobile-groups' | 'incidents'
  head: string[]
  data: IViolation[]
}

export const EntityTable = ({ data, head, type }: Props) => {
  const router = useRouter()

  const handleRowClick = (path: string) => {
    router.push(path)
  }

  return (
    <table className="table w-full overflow-x-scroll bg-white">
      <thead className="text-sm text-black">
        <tr>
          {head.map((heading, index) => (
            <th key={index} className="col-span-1">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="hover:bg-blue-100"
            onClick={() => handleRowClick(`/${type}/${row.id}`)}
          >
            {Object.values(row).map((cell, index) => (
              <td key={index} className="cursor-pointer">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
