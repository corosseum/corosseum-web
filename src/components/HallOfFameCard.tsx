import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import SubmissionDetailModal from './SubmissionDetailModal'
import type { LeaderboardResponseDTO } from '@/types/api'

interface HallOfFameCardProps {
  title: string
  emoji: string
  data: LeaderboardResponseDTO
}

export default function HallOfFameCard({
  title,
  emoji,
  data,
}: HallOfFameCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getCodePreview = (code: string): string => {
    const lines = code.split('\n').slice(0, 5)
    return lines.join('\n') + (code.split('\n').length > 5 ? '\n...' : '')
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>{emoji}</span>
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-300">Code Snippet</h4>
            <pre className="text-xs bg-gray-900 p-3 rounded border border-gray-700 overflow-x-auto text-gray-300 font-mono">
              {getCodePreview(data.submission.code)}
            </pre>
          </div>
          <div className="text-sm text-gray-400">
            Total Votes: <span className="text-white font-semibold">{data.totalVotes}</span>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="w-full"
          >
            View Full Code
          </Button>
        </CardContent>
      </Card>
      <SubmissionDetailModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        questId={data.submission.questId}
        submissionId={data.submission.id}
        initialData={data.submission}
      />
    </>
  )
}

