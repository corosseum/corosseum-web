import { useEffect, useState } from 'react'
import { authApi } from '@/api/auth'
import { storage } from '@/utils/storage'

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        // localStorage에 userId 확인
        let currentUserId = storage.getUserId()
        
        // 없으면 서버에서 발급
        if (!currentUserId) {
          const response = await authApi.issueGuestToken()
          currentUserId = response.uuid
          storage.setUserId(currentUserId)
        }
        
        setUserId(currentUserId)
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  return { userId, isLoading }
}

