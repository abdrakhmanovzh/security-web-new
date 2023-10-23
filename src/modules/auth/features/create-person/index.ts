import axios from 'axios'
import { IPerson, IPersonResponse } from '../../entities/person'

export const createPerson = async (data: any) => {
  try {
    const response = await axios.post<IPersonResponse>(
      'http://' + process.env.NEXT_PUBLIC_BACKEND_HOST + ':' + process.env.NEXT_PUBLIC_BACKEND_PORT +  '/api/persons/create',
      data
    )
    if (response.status === 200) {
      return response.data
    }
  } catch (errorObject) {
    throw new Error('Что то пошло не так, попробуйте позже')
  }
}
