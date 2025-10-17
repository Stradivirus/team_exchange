// src/lib/http.ts
import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  withCredentials: true, // 세션/쿠키 쓰면 true
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 400) {
      console.log("Request Error")
    }
    return Promise.reject(err)
  }
)
