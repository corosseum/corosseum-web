import { useState, useEffect } from 'react'
import { submissionApi } from '@/api/submission'
import type { SubmissionResponseDTO, PagedResponseDTO } from '@/types/api'

export function useSubmissions(questId: string | null, page: number = 1, pageSize: number = 10) {
  const [submissions, setSubmissions] = useState<PagedResponseDTO<SubmissionResponseDTO> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!questId) {
      setIsLoading(false)
      return
    }

    const fetchSubmissions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await submissionApi.getSubmissions(questId, page, pageSize)
        setSubmissions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch submissions')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [questId, page, pageSize])

  return { submissions, isLoading, error }
}

