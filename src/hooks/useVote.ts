import { useState } from 'react'
import { voteApi } from '@/api/vote'
import { storage } from '@/utils/storage'
import { toast } from 'sonner'

export function useVote() {
  const [isVoting, setIsVoting] = useState(false)

  const vote = async (
    submissionId: string,
    voteType: 'DISGUSTING' | 'GENIUS' | 'LOL'
  ) => {
    const userId = storage.getUserId()
    if (!userId) {
      toast.error('사용자 정보를 찾을 수 없습니다')
      return false
    }

    try {
      setIsVoting(true)
      await voteApi.vote(submissionId, { userId, voteType })
      return true
    } catch (error: any) {
      if (error.response?.status === 400) {
        return false
      }
      console.error('Vote error:', error)
      return false
    } finally {
      setIsVoting(false)
    }
  }

  return { vote, isVoting }
}

