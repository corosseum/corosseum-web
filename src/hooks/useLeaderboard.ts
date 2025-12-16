import { useState, useEffect, useCallback } from 'react'
import { leaderboardApi } from '@/api/leaderboard'
import type { LeaderboardResponseDTO } from '@/types/api'

export function useLeaderboard() {
  const [hallOfFame, setHallOfFame] = useState<LeaderboardResponseDTO[]>([])
  const [dailyLeaderboard, setDailyLeaderboard] = useState<LeaderboardResponseDTO[]>([])
  const [yesterdayTop, setYesterdayTop] = useState<LeaderboardResponseDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHallOfFame = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await leaderboardApi.getHallOfFame()
        setHallOfFame(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch hall of fame')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHallOfFame()
  }, [])

  const fetchDailyLeaderboard = useCallback(async () => {
    try {
      setError(null)
      const data = await leaderboardApi.getDailyLeaderboard()
      setDailyLeaderboard(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch daily leaderboard'
      setError(errorMessage)
      throw err
    }
  }, [])

  const fetchYesterdayTop = useCallback(async () => {
    try {
      setError(null)
      const data = await leaderboardApi.getYesterdayTop()
      setYesterdayTop(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch yesterday top'
      setError(errorMessage)
      throw err
    }
  }, [])

  return {
    hallOfFame,
    dailyLeaderboard,
    yesterdayTop,
    isLoading,
    error,
    fetchDailyLeaderboard,
    fetchYesterdayTop,
  }
}

