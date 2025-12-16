import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface QuestCardProps {
  title?: string
  description: string
  date: string
  showDescriptionAsTitle?: boolean
}

export default function QuestCard({ title, description, date, showDescriptionAsTitle }: QuestCardProps) {
  const displayTitle = showDescriptionAsTitle ? description : (title || '오늘의 퀘스트')
  const displayContent = showDescriptionAsTitle ? null : description

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`line-clamp-2 ${showDescriptionAsTitle ? 'text-base' : ''}`}>
          {displayTitle}
        </CardTitle>
        <div className="text-xs text-gray-500 mt-1">{date}</div>
      </CardHeader>
      {displayContent && (
        <CardContent>
          <p className="text-gray-300 whitespace-pre-wrap">{displayContent}</p>
        </CardContent>
      )}
    </Card>
  )
}

