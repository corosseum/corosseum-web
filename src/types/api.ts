export interface ApiResponse<T> {
  timestamp: string
  message: string
  data: T
}

export interface QuestResponseDTO {
  id: string
  description: string
  questDate: string
}

export interface SubmissionResponseDTO {
  id: string
  questId: string
  userId: string
  code: string
  readabilityScore: number
  creativityScore: number
  inefficiencyScore: number
  reviewComment: string
  status: 'PENDING' | 'REVIEWED' | 'DELETED'
  createdAt: string
  questDescription: string
  totalVotes?: number
  disgustingVotes?: number
  geniusVotes?: number
  lolVotes?: number
}

export interface PagedResponseDTO<T> {
  page: number
  pageSize: number
  totalCount: number
  totalPage: number
  data: T[]
}

export interface VoteRequestDTO {
  userId: string
  voteType: 'DISGUSTING' | 'GENIUS' | 'LOL'
}

export interface SubmissionRequestDTO {
  userId: string
  code: string
}

export interface GuestAuthResponseDTO {
  uuid: string
}

export interface LeaderboardResponseDTO {
  submission: SubmissionResponseDTO
  totalVotes: number
  disgustingVotes: number
  geniusVotes: number
  lolVotes: number
}

