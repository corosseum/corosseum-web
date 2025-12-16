import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface SubmissionCardProps {
  id: string
  date: string
  language: string
  codePreview: string
  comment?: string
  geniusVotes: number
  disgustingVotes: number
  lolVotes: number
  questDescription: string
  onViewDetails: () => void
}

export default function SubmissionCard({
  date,
  language,
  codePreview,
  geniusVotes,
  disgustingVotes,
  lolVotes,
  questDescription,
  onViewDetails,
}: SubmissionCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base line-clamp-2">{questDescription}</CardTitle>
          <span className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-300">
            {language}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="text-xs bg-gray-900 p-3 rounded border border-gray-700 overflow-x-auto text-gray-300 font-mono whitespace-pre-wrap">
          {codePreview.replace(/\\n/g, '\n')}
        </pre>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>🤩 {geniusVotes}</span>
          <span>🤮 {disgustingVotes}</span>
          <span>🤣 {lolVotes}</span>
        </div>
        <Button variant="outline" onClick={onViewDetails} className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

