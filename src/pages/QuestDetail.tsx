import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSubmissions } from '@/hooks/useSubmissions'
import { questApi } from '@/api/quest'
import SubmissionCard from '@/components/SubmissionCard'
import SubmissionDetailModal from '@/components/SubmissionDetailModal'
import QuestCard from '@/components/QuestCard'
import { Button } from '@/components/ui/button'
import type { QuestResponseDTO } from '@/types/api'

export default function QuestDetail() {
  const { questId } = useParams<{ questId: string }>()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quest, setQuest] = useState<QuestResponseDTO | null>(null)
  const [isLoadingQuest, setIsLoadingQuest] = useState(true)

  useEffect(() => {
    const fetchQuest = async () => {
      if (!questId) return
      try {
        setIsLoadingQuest(true)
        const quests = await questApi.getCompletedQuests(1, 100)
        const foundQuest = quests.data.find((q) => q.id === questId)
        setQuest(foundQuest || null)
      } catch (error) {
        console.error('Failed to fetch quest:', error)
      } finally {
        setIsLoadingQuest(false)
      }
    }
    fetchQuest()
  }, [questId])

  const { submissions, isLoading } = useSubmissions(questId || null, page, pageSize)

  const handleViewDetails = (submissionId: string, questId: string) => {
    setSelectedSubmissionId(submissionId)
    setSelectedQuestId(questId)
    setIsModalOpen(true)
  }

  const getCodePreview = (code: string): string => {
    const lines = code.split('\n').slice(0, 3)
    return lines.join('\n') + (code.split('\n').length > 3 ? '\n...' : '')
  }

  const getLanguageFromCode = (code: string): string => {
    if (code.includes('def ') || code.includes('import ')) return 'Python'
    if (code.includes('public class') || code.includes('import java')) return 'Java'
    return 'JavaScript'
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (submissions && page < submissions.totalPage) {
      setPage(page + 1)
    }
  }

  if (!questId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">퀘스트 ID가 없습니다</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/gallery')}>
            ← 뒤로가기
          </Button>
          <h1 className="text-2xl font-bold text-white">퀘스트 제출물</h1>
        </div>

        {isLoadingQuest ? (
          <div className="text-center text-gray-400 py-4">퀘스트 정보를 불러오는 중...</div>
        ) : quest ? (
          <QuestCard
            description={quest.description}
            date={quest.questDate}
            showDescriptionAsTitle={true}
          />
        ) : (
          <div className="text-center text-gray-400 py-4">퀘스트를 찾을 수 없습니다</div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">제출물 목록</h2>

          {isLoading ? (
            <div className="text-center text-gray-400 py-8">Loading...</div>
          ) : submissions && submissions.data.length > 0 ? (
            <>
              <div className="space-y-4">
                {submissions.data.map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    id={submission.id}
                    date={submission.createdAt}
                    language={getLanguageFromCode(submission.code)}
                    codePreview={getCodePreview(submission.code)}
                    comment={submission.reviewComment}
                    geniusVotes={submission.geniusVotes || 0}
                    disgustingVotes={submission.disgustingVotes || 0}
                    lolVotes={submission.lolVotes || 0}
                    questDescription={submission.questDescription || quest?.description || ''}
                    onViewDetails={() => handleViewDetails(submission.id, submission.questId)}
                  />
                ))}
              </div>

              {/* 페이징 컨트롤 */}
              {submissions.totalPage > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    이전
                  </Button>
                  <div className="text-gray-400">
                    {page} / {submissions.totalPage}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={page >= submissions.totalPage}
                  >
                    다음
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400 py-8">
              제출된 코드가 없습니다
            </div>
          )}
        </div>

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

