import apiClient from './client'
import type { QuestResponseDTO, PagedResponseDTO } from '@/types/api'

export const questApi = {
  getTodayQuest: async (): Promise<QuestResponseDTO> => {
    return apiClient.get('/quests/today')
  },

  getCompletedQuests: async (
    page: number = 1,
    pageSize: number = 10
  ): Promise<PagedResponseDTO<QuestResponseDTO>> => {
    return apiClient.get('/quests', {
      params: { page, pageSize },
    })
  },
}

