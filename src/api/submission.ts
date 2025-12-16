import apiClient from './client'
import type { SubmissionResponseDTO, PagedResponseDTO, SubmissionRequestDTO } from '@/types/api'

export const submissionApi = {
  submitCode: async (
    questId: string,
    data: SubmissionRequestDTO
  ): Promise<void> => {
    // 코드 문자열을 JSON.stringify로 처리
    const payload = {
      ...data,
      code: JSON.stringify(data.code),
    }
    return apiClient.post(`/quests/${questId}/submissions`, payload)
  },

  getSubmissions: async (
    questId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PagedResponseDTO<SubmissionResponseDTO>> => {
    return apiClient.get(`/quests/${questId}/submissions`, {
      params: { page, pageSize },
    })
  },

  getSubmission: async (
    questId: string,
    submissionId: string
  ): Promise<SubmissionResponseDTO> => {
    return apiClient.get(`/quests/${questId}/submissions/${submissionId}`)
  },
}

