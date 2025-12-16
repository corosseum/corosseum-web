import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Editor from '@monaco-editor/react'

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

// 언어 이름을 Monaco Editor 언어 코드로 변환
const getMonacoLanguage = (language: string): string => {
  const langMap: Record<string, string> = {
    'Python': 'python',
    'Java': 'java',
    'JavaScript': 'javascript',
  }
  return langMap[language] || 'javascript'
}

// 코드 줄 수에 따라 높이 계산 (최소 150px, 최대 400px)
const calculatePreviewHeight = (code: string): string => {
  if (!code) return '150px'
  const lines = code.split('\n').length
  const lineHeight = 20
  const padding = 40
  const minHeight = 150
  const maxHeight = 400
  const calculatedHeight = lines * lineHeight + padding
  
  if (calculatedHeight < minHeight) return `${minHeight}px`
  if (calculatedHeight > maxHeight) return `${maxHeight}px`
  return `${calculatedHeight}px`
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
  const parsedCode = codePreview.replace(/\\n/g, '\n')
  const editorHeight = calculatePreviewHeight(parsedCode)

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
        <div className="border border-gray-700 rounded-md overflow-hidden">
          {parsedCode && (
            <Editor
              height={editorHeight}
              language={getMonacoLanguage(language)}
              theme="vs-dark"
              value={parsedCode}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 12,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
              }}
            />
          )}
        </div>
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

