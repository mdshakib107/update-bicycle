import axios from 'axios'


const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    "Content-Type" : "application/json"
  }
})

axiosCommon.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const useAxiosCommon = () => {
    return axiosCommon
}

export default useAxiosCommon
