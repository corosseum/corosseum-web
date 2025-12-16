import { useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { useQuest } from '@/hooks/useQuest'
import { submissionApi } from '@/api/submission'
import QuestCard from '@/components/QuestCard'
import CodeEditor from '@/components/CodeEditor'
import ResultModal from '@/components/ResultModal'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { SubmissionResponseDTO } from '@/types/api'

export default function Arena() {
  const { userId } = useAuth()
  const { quest, isLoading: questLoading } = useQuest()
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<SubmissionResponseDTO | null>(null)
  const [showResultModal, setShowResultModal] = useState(false)

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('코드를 입력해주세요')
      return
    }

    if (!quest || !userId) {
      toast.error('퀘스트 정보를 불러오는 중입니다')
      return
    }

    try {
      setIsSubmitting(true)
      await submissionApi.submitCode(quest.id, {
        userId,
        code,
      })

      // 제출 후 상세 정보 조회
      const submissions = await submissionApi.getSubmissions(quest.id, 1, 1)
      if (submissions.data.length > 0) {
        const submission = await submissionApi.getSubmission(quest.id, submissions.data[0].id)
        setResult(submission)
        setShowResultModal(true)
      }
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (questLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">Loading quest...</div>
      </div>
    )
  }

  if (!quest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">퀘스트를 불러올 수 없습니다</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <QuestCard description={quest.description} date={quest.questDate} />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">코드 작성</h2>
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {isSubmitting && (
          <div className="space-y-2">
            <Progress value={undefined} className="h-2" />
            <p className="text-sm text-gray-400 text-center">제출 중...</p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Code'}
        </Button>

        {result && (
          <ResultModal
            open={showResultModal}
            onOpenChange={setShowResultModal}
            madness={result.readabilityScore}
            artistry={result.creativityScore}
            chaos={result.inefficiencyScore}
            comment={result.reviewComment}
          />
        )}
      </div>
    </div>
  )
}
