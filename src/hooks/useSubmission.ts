import { useState, useEffect, useCallback } from 'react'
import { submissionApi } from '@/api/submission'
import type { SubmissionResponseDTO } from '@/types/api'

export function useSubmission(questId: string | null, submissionId: string | null) {
  const [submission, setSubmission] = useState<SubmissionResponseDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubmission = useCallback(async () => {
    if (!questId || !submissionId) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const data = await submissionApi.getSubmission(questId, submissionId)
      setSubmission(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submission')
    } finally {
      setIsLoading(false)
    }
  }, [questId, submissionId])

  useEffect(() => {
    fetchSubmission()
  }, [fetchSubmission])

  return { submission, isLoading, error, refetch: fetchSubmission }
}

