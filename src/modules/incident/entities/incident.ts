import {
  ICamera,
  IDetection,
  IPlace,
  IProcessIncident,
  IRegion,
  IZone
} from '@/modules/core/entities'

export type IIncident = {
  created_at: string
  detection: IDetection
  process_incident: IProcessIncident
  camera: ICamera
  zone: IZone
  place: IPlace
  region: IRegion
}
