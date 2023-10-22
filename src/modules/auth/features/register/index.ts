import axios, { AxiosError } from 'axios'
import { IRegister, IRegisterResponse } from '../../entities'

export const register = async (data: IRegister) => {
  try {
    const response = await axios.post<IRegisterResponse>('http://10.3.31.196:8000/auth/register', {
      ...data
    })

    if (response.status === 201) {
      localStorage.setItem('userId', response.data.id.toString())
    }
  } catch (errorObject) {
    const error = errorObject as AxiosError
    if (error.response?.status === 400) {
      throw new Error('Пользователь с такими данными уже существует')
    } else if (error.response?.status === 422) {
      throw new Error('Неверный ИНН или пароль')
    } else {
      throw new Error('Что то пошло не так, попробуйте позже')
    }
  }
}
