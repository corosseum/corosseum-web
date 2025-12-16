import { useState, useEffect } from 'react'
import { questApi } from '@/api/quest'
import type { QuestResponseDTO } from '@/types/api'

export function useQuest() {
  const [quest, setQuest] = useState<QuestResponseDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await questApi.getTodayQuest()
        setQuest(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch quest')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuest()
  }, [])

  return { quest, isLoading, error }
}

