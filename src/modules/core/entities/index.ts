export type IDetection = {
  object: string
  is_approved: boolean
  processed_incident_id: number
  bounding_box: number[]
  created_at: string
  id: number
}

export type IProcessIncident = {
  frame_id: number
  created_at: string
  id: number
}

export type ICamera = {
  purpose: number
  ip_address: string
  zone_id: number
  created_at: string
  id: number
}

export type IZone = {
  name: string
  place_id: number
  created_at: string
  id: number
}

export type IPlace = {
  name: string
  address_id: number
  created_at: string
  id: number
}

export type IRegion = {
  name: string
  created_at: string
  id: number
}
