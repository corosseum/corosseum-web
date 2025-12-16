import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import ScoreBar from './ScoreBar'
import Editor from '@monaco-editor/react'
import { useSubmission } from '@/hooks/useSubmission'
import { useVote } from '@/hooks/useVote'
import type { SubmissionResponseDTO } from '@/types/api'

// 코드 줄 수에 따라 높이 계산 (한 줄당 약 20px, 최소 120px, 최대 600px)
const calculateEditorHeight = (code: string): string => {
  if (!code) return '120px'
  const lines = code.split('\n').length
  const lineHeight = 20
  const padding = 40 // 상하 패딩 및 여백
  const minHeight = 120
  const maxHeight = 600
  const calculatedHeight = lines * lineHeight + padding
  
  if (calculatedHeight < minHeight) return `${minHeight}px`
  if (calculatedHeight > maxHeight) return `${maxHeight}px`
  return `${calculatedHeight}px`
}

interface SubmissionDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  questId: string
  submissionId: string
  initialData?: SubmissionResponseDTO
  onVoteUpdate?: () => void
}

export default function SubmissionDetailModal({
  open,
  onOpenChange,
  questId,
  submissionId,
  initialData,
  onVoteUpdate,
}: SubmissionDetailModalProps) {
  const { submission, isLoading, refetch } = useSubmission(questId, submissionId)
  const { vote, isVoting } = useVote()
  const [voteCounts, setVoteCounts] = useState({
    genius: 0,
    disgusting: 0,
    lol: 0,
  })
  const [currentVoteType, setCurrentVoteType] = useState<'DISGUSTING' | 'GENIUS' | 'LOL' | null>(null)

  const displayData = submission || initialData

  // 코드가 JSON.stringify로 저장되었을 수 있으므로 파싱 시도
  const getParsedCode = (code: string): string => {
    if (!code) return ''
    try {
      // JSON 문자열인 경우 파싱
      const parsed = JSON.parse(code)
      return typeof parsed === 'string' ? parsed : code
    } catch {
      // JSON이 아니면 문자열 \n을 실제 줄바꿈으로 변환
      return code.replace(/\\n/g, '\n')
    }
  }

  // 파싱된 코드와 높이 계산
  const parsedCode = displayData?.code ? getParsedCode(displayData.code) : ''
  const editorHeight = parsedCode ? calculateEditorHeight(parsedCode) : '120px'

  useEffect(() => {
    if (displayData) {
      setVoteCounts({
        genius: displayData.geniusVotes || 0,
        disgusting: displayData.disgustingVotes || 0,
        lol: displayData.lolVotes || 0,
      })
      setCurrentVoteType(null)
    }
  }, [displayData, submissionId])

  const handleVote = async (voteType: 'DISGUSTING' | 'GENIUS' | 'LOL') => {
    const success = await vote(submissionId, voteType)
    if (success) {
      // Optimistic update
      setVoteCounts((prev) => {
        const newCounts = { ...prev }
        const voteTypeKey = voteType === 'GENIUS' ? 'genius' : voteType === 'DISGUSTING' ? 'disgusting' : 'lol'
        
        // 같은 타입을 다시 클릭한 경우 취소
        if (currentVoteType === voteType) {
          newCounts[voteTypeKey] = Math.max(0, prev[voteTypeKey] - 1)
          return newCounts
        }
        
        // 이전 투표가 있고 새로운 투표와 다르면 이전 투표 -1
        if (currentVoteType && currentVoteType !== voteType) {
          const prevVoteTypeKey = currentVoteType === 'GENIUS' ? 'genius' : currentVoteType === 'DISGUSTING' ? 'disgusting' : 'lol'
          newCounts[prevVoteTypeKey] = Math.max(0, prev[prevVoteTypeKey] - 1)
        }
        
        // 새로운 투표 +1
        newCounts[voteTypeKey] = prev[voteTypeKey] + 1
        
        return newCounts
      })
      setCurrentVoteType(currentVoteType === voteType ? null : voteType)
      // 서버에서 최신 데이터 가져오기
      refetch()
      onVoteUpdate?.()
    }
  }

  if (isLoading || !displayData) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>로딩 중...</DialogTitle>
          </DialogHeader>
          <div className="text-center text-gray-400 py-4">로딩 중...</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription>코드 상세 정보</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-300">Code</h4>
            <div className="border border-gray-700 rounded-md overflow-hidden">
              {parsedCode && (
                <Editor
                  height={editorHeight}
                  language="javascript"
                  theme="vs-dark"
                  value={parsedCode}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-300">AI Analysis</h4>
            <div className="space-y-4">
              <ScoreBar label="가독성" value={displayData.readabilityScore} />
              <ScoreBar label="창의성" value={displayData.creativityScore} />
              <ScoreBar label="광기" value={displayData.inefficiencyScore} />
            </div>
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-gray-300">Comment</h5>
              <p className="text-sm text-gray-400 whitespace-pre-wrap">
                {displayData.reviewComment}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-300">Reactions</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => handleVote('GENIUS')}
                disabled={isVoting}
                className="flex-1"
              >
                🤩 {voteCounts.genius}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleVote('DISGUSTING')}
                disabled={isVoting}
                className="flex-1"
              >
                🤮 {voteCounts.disgusting}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleVote('LOL')}
                disabled={isVoting}
                className="flex-1"
              >
                🤣 {voteCounts.lol}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
