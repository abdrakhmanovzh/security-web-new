import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://10.3.31.196:8000/api'
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
