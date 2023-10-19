import { useQuery } from '@tanstack/react-query'
import { getZones } from '@/modules/core/lib'

export const useGetViolations = () => {
  return useQuery(['violations'], async () => {
    const zones = await getZones()

    if (zones.length > 0) {
      const violations = zones.filter((zone) => zone.status === 'Распознано')
      return violations
    } else {
      return zones
    }
  })
}
