import { MapContainer, Marker, Polyline } from 'react-leaflet'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'
import 'leaflet/dist/leaflet.css'
import { useGetMobileGroupLocations } from '../../hooks/useGetMobileGroupLocations'
import { ErrorMessage, Loading } from '@/shared/ui'
import { Icon, LatLngExpression } from 'leaflet'
import L from 'leaflet'

interface Props {
  tripId: string
}

const MobileGroupMap = ({ tripId }: Props) => {
  const {
    data: locationsData,
    isLoading: locationsLoading,
    isError: locationsError
  } = useGetMobileGroupLocations(tripId)

  if (locationsLoading) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <Loading />
      </div>
    )
  } else if (locationsError) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <ErrorMessage message="Произошла ошибка, попробуйте еще раз." />
      </div>
    )
  } else {
    if (locationsData.data && locationsData.data.length > 0 && locationsData.data[0].value.length > 0) {
      const paths = locationsData?.data.map((item) => item.value)
      const first = locationsData?.data.sort((a, b) => a.id - b.id)[0]
      const last = locationsData?.data.sort((a, b) => b.id - a.id)[0]
      return (
        <div className="mt-4 h-full w-full">
          <MapContainer
            className="relative h-full w-full"
            zoom={13}
            center={[51.089500263651125, 71.4166339959935]}
          >
            <ReactLeafletGoogleLayer
              apiKey="AIzaSyCvkFDUbjOjZGFOR2rdCcx2fHmeKFAeHqM"
              type={'satellite'}
              className="h-full w-full"
            />
            <Polyline
              pathOptions={{ color: 'red', weight: 4 }}
              positions={paths as LatLngExpression[]}
            />

            <Marker
              icon={L.icon({ iconUrl: '/start.svg', iconSize: [30, 30] })}
              position={first.value as LatLngExpression}
            />
            <Marker
              icon={L.icon({ iconUrl: '/end.svg', iconSize: [30, 30] })}
              position={last.value as LatLngExpression}
            />
          </MapContainer>
        </div>
      )
    } else {
      return <h2 className='mt-4 text-xl'>Нету данных по локациям...</h2>
    }

  }
}

export default MobileGroupMap
