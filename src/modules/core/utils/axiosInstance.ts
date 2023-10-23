import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://' + process.env.NEXT_PUBLIC_BACKEND_HOST + ':' + process.env.NEXT_PUBLIC_BACKEND_PORT +'/api'
})
console.log('http://' + process.env.NEXT_PUBLIC_BACKEND_HOST + ':' + process.env.NEXT_PUBLIC_BACKEND_PORT +'/api')
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
