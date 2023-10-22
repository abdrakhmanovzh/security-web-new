import axios from 'axios'
import { IPerson, IPersonResponse } from '../../entities/person'

export const createPerson = async (data: any) => {
  try {
    const response = await axios.post<IPersonResponse>(
      'http://10.3.31.196:8000/api/persons/create',
      data
    )
    if (response.status === 200) {
      return response.data
    }
  } catch (errorObject) {
    throw new Error('Что то пошло не так, попробуйте позже')
  }
}
