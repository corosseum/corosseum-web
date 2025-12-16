import axios from 'axios'
import { toast } from 'sonner'
import { storage } from '@/utils/storage'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터: userId 헤더 추가
apiClient.interceptors.request.use(
  (config) => {
    const userId = storage.getUserId()
    if (userId) {
      config.headers['X-User-ID'] = userId
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터: ApiResponse 래퍼 제거 및 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    // ApiResponse 래퍼에서 data 추출
    // ApiResponse 형식: { timestamp, message, data }
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data
    }
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Connection failed'
    toast.error(message)
    return Promise.reject(error)
  }
)

export default apiClient
