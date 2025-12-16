import { useState, useEffect } from 'react'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import SubmissionCard from '@/components/SubmissionCard'
import SubmissionDetailModal from '@/components/SubmissionDetailModal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Leaderboard() {
  const {
    dailyLeaderboard,
    yesterdayTop,
    isLoading,
    fetchDailyLeaderboard,
    fetchYesterdayTop,
  } = useLeaderboard()
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('today')

  useEffect(() => {
    if (activeTab === 'today') {
      fetchDailyLeaderboard()
    } else if (activeTab === 'yesterday') {
      fetchYesterdayTop()
    }
  }, [activeTab, fetchDailyLeaderboard, fetchYesterdayTop])

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

  const renderLeaderboard = (items: typeof dailyLeaderboard, title: string) => {
    if (isLoading) {
      return <div className="text-center text-gray-400 py-8">Loading...</div>
    }

    if (!items || items.length === 0) {
      return <div className="text-center text-gray-400 py-8">{title} 데이터가 없습니다</div>
    }

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.submission.id} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg text-xl font-bold text-white">
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
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">리더보드</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">오늘의 TOP 10</TabsTrigger>
            <TabsTrigger value="yesterday">어제의 TOP 10</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-4">오늘 가장 많은 반응을 얻은 제출물</h2>
            {renderLeaderboard(dailyLeaderboard, '오늘의 리더보드')}
          </TabsContent>

          <TabsContent value="yesterday" className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-4">어제 가장 많은 반응을 얻은 제출물 TOP 10</h2>
            {renderLeaderboard(yesterdayTop, '어제의 TOP 10')}
          </TabsContent>
        </Tabs>

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

