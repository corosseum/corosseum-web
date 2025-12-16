const USER_ID_KEY = 'userId'
const VOTED_SUBMISSIONS_KEY = 'votedSubmissions'

export const storage = {
  getUserId: (): string | null => {
    return localStorage.getItem(USER_ID_KEY)
  },

  setUserId: (userId: string): void => {
    localStorage.setItem(USER_ID_KEY, userId)
  },

  getVotedSubmissions: (): string[] => {
    const voted = localStorage.getItem(VOTED_SUBMISSIONS_KEY)
    return voted ? JSON.parse(voted) : []
  },

  addVotedSubmission: (submissionId: string): void => {
    const voted = storage.getVotedSubmissions()
    if (!voted.includes(submissionId)) {
      voted.push(submissionId)
      localStorage.setItem(VOTED_SUBMISSIONS_KEY, JSON.stringify(voted))
    }
  },

  hasVoted: (submissionId: string): boolean => {
    return storage.getVotedSubmissions().includes(submissionId)
  },
}

