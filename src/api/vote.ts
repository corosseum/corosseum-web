import apiClient from './client'
import type { VoteRequestDTO } from '@/types/api'

export const voteApi = {
  vote: async (submissionId: string, data: VoteRequestDTO): Promise<void> => {
    return apiClient.post(`/votes/${submissionId}`, data)
  },
}

