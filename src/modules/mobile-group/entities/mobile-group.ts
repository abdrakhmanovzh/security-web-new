export type IMobileGroup = {
  created_at: string
  id: number
  face_incident_id: number
  is_approved: boolean
  stage: number
  content: string
  person_id: number
  person_name: string
}

export type IMmobileGroupLocation = {
  id: number
  created_at: string
  trip_id: number
  value: number[]
}
