import apiClient from './client'
import type { LeaderboardResponseDTO } from '@/types/api'

export const leaderboardApi = {
  getHallOfFame: async (): Promise<LeaderboardResponseDTO[]> => {
    return apiClient.get('/leaderboard/hall-of-fame')
  },

  getDailyLeaderboard: async (): Promise<LeaderboardResponseDTO[]> => {
    return apiClient.get('/leaderboard/daily')
  },

  getYesterdayTop: async (): Promise<LeaderboardResponseDTO[]> => {
    return apiClient.get('/leaderboard/yesterday-top')
  },
}

