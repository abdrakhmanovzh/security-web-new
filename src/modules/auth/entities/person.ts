export type IPerson = {
  id?: number
  name: string
  gov_id: string
  company_id: number
  address_name: string
  region_id: number
  phone_number: string
  user_id: number
  photo: File
}

export type IPersonResponse = {
  id: number
  name: string
  gov_id: string
  company_id: number
  address_name: string
  region_id: number
  phone_number: string
  user_id: number
  photo: string
}
