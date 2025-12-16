import apiClient from './client'
import type { GuestAuthResponseDTO } from '@/types/api'

export const authApi = {
  issueGuestToken: async (): Promise<GuestAuthResponseDTO> => {
    return apiClient.post('/auth/guest')
  },
}

