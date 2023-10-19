import axios from 'axios'
import { ILogin, ILoginResponse } from '@/modules/auth/entities'

export const login = async (data: ILogin) => {
  try {
    const response = await axios.post<ILoginResponse>('/auth/jwt/login', {
      ...data
    })

    if (response.status === 200) {
      localStorage.setItem('access_token', response.data.access_token)
    }

    if (response.status === 400 || response.status === 422) {
      throw new Error('Неправильные данные')
    }
  } catch (error) {
    throw new Error('Что то пошло не так, попробуйте позже')
  }
}
