import axios, { AxiosError } from 'axios'
import { ILogin, ILoginResponse } from '@/modules/auth/entities'

export const login = async (data: any) => {
  try {
    const response = await axios.post<ILoginResponse>('http://' + process.env.NEXT_PUBLIC_BACKEND_HOST + ':' + process.env.NEXT_PUBLIC_BACKEND_PORT + '/auth/jwt/login',
      data
    )

    if (response.status === 200) {
      localStorage.setItem('access_token', response.data.access_token)
    }
  } catch (errorObject) {
    const error = errorObject as AxiosError
    if (error.response?.status === 400 || error.response?.status === 422) {
      throw new Error('Неверный ИНН или пароль')
    } else {
      throw new Error('Что то пошло не так, попробуйте позже')
    }
  }
}
