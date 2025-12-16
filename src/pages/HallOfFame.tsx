import { useState } from 'react'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import SubmissionCard from '@/components/SubmissionCard'
import SubmissionDetailModal from '@/components/SubmissionDetailModal'

export default function HallOfFame() {
  const { hallOfFame, isLoading } = useLeaderboard()
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getCodePreview = (code: string): string => {
    const lines = code.split('\n').slice(0, 3)
    return lines.join('\n') + (code.split('\n').length > 3 ? '\n...' : '')
  }

  const getLanguageFromCode = (code: string): string => {
    if (code.includes('def ') || code.includes('import ')) return 'Python'
    if (code.includes('public class') || code.includes('import java')) return 'Java'
    return 'JavaScript'
  }

  const handleViewDetails = (submissionId: string, questId: string) => {
    setSelectedSubmissionId(submissionId)
    setSelectedQuestId(questId)
    setIsModalOpen(true)
  }

  // totalVotes 기준으로 정렬 (이미 API에서 정렬되어 올 것으로 예상하지만, 안전을 위해 정렬)
  const sortedHallOfFame = [...hallOfFame].sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 10)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Hall of Fame</h1>
        <p className="text-gray-400">
          가장 많은 공감을 받은 상위 10개의 제출물
        </p>

        {sortedHallOfFame.length > 0 ? (
          <div className="space-y-4">
            {sortedHallOfFame.map((item, index) => (
              <div key={item.submission.id} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg text-xl font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <SubmissionCard
                    id={item.submission.id}
                    date={item.submission.createdAt}
                    language={getLanguageFromCode(item.submission.code)}
                    codePreview={getCodePreview(item.submission.code)}
                    comment={item.submission.reviewComment}
                    geniusVotes={item.geniusVotes || 0}
                    disgustingVotes={item.disgustingVotes || 0}
                    lolVotes={item.lolVotes || 0}
                    questDescription={item.submission.questDescription}
                    onViewDetails={() => handleViewDetails(item.submission.id, item.submission.questId)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            명예의 전당 데이터가 없습니다
          </div>
        )}

        {selectedQuestId && selectedSubmissionId && (
          <SubmissionDetailModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            questId={selectedQuestId}
            submissionId={selectedSubmissionId}
          />
        )}
      </div>
    </div>
  )
}
