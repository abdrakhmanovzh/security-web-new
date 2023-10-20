import {
  ICamera,
  IDetection,
  IPlace,
  IProcessIncident,
  IRegion,
  IZone
} from '@/modules/core/entities'

export type IViolation = {
  detection: IDetection
  process_incident: IProcessIncident
  camera: ICamera
  zone: IZone
  place: IPlace
  region: IRegion
  created_at: string
}
