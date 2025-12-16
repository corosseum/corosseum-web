import { useNavigate } from 'react-router-dom'
import { useQuests } from '@/hooks/useQuests'
import QuestCard from '@/components/QuestCard'

export default function Gallery() {
  const navigate = useNavigate()
  const { quests, isLoading: questsLoading } = useQuests()

  const handleQuestClick = (questId: string) => {
    navigate(`/gallery/${questId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Gallery</h1>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">퀘스트 목록</h2>
          {questsLoading ? (
            <div className="text-center text-gray-400 py-4">퀘스트 목록을 불러오는 중...</div>
          ) : quests.length > 0 ? (
            <div className="space-y-2">
              {quests.map((q) => (
                <div
                  key={q.id}
                  onClick={() => handleQuestClick(q.id)}
                  className="cursor-pointer transition-all hover:bg-gray-800 rounded-lg"
                >
                  <QuestCard
                    description={q.description}
                    date={q.questDate}
                    showDescriptionAsTitle={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4">퀘스트가 없습니다</div>
          )}
        </div>
      </div>
    </div>
  )
}
