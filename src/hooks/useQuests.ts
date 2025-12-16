import { useState, useEffect } from 'react'
import { questApi } from '@/api/quest'
import type { QuestResponseDTO, PagedResponseDTO } from '@/types/api'

export function useQuests(page: number = 1, pageSize: number = 100) {
  const [quests, setQuests] = useState<QuestResponseDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data: PagedResponseDTO<QuestResponseDTO> = await questApi.getCompletedQuests(page, pageSize)
        setQuests(data.data)
        setTotalCount(data.totalCount)
        setTotalPage(data.totalPage)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch quests')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuests()
  }, [page, pageSize])

  return { quests, isLoading, error, totalCount, totalPage }
}



