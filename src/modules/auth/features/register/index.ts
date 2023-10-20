import axios, { AxiosError } from 'axios'
import { IRegister } from '../../entities'

export const login = async (data: IRegister) => {
  try {
    const response = await axios.post<ILoginResponse>('http://192.168.50.147:8000/auth/jwt/login', {
      ...data
    })

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
