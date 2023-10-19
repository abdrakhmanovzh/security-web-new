import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.request.use(
  async (config) => {
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
