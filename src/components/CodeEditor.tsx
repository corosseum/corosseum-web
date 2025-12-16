import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  onLanguageChange?: (language: string) => void
}

export default function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  onLanguageChange,
}: CodeEditorProps) {
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [editorHeight, setEditorHeight] = useState('300px')

  useEffect(() => {
    const updateHeight = () => {
      setEditorHeight(window.innerWidth >= 640 ? '400px' : '300px')
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage)
    onLanguageChange?.(newLanguage)
  }

  return (
    <div className="space-y-2">
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
        </SelectContent>
      </Select>
      <div className="border border-gray-700 rounded-md overflow-hidden">
        <Editor
          height={editorHeight}
          defaultLanguage={currentLanguage}
          language={currentLanguage}
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  )
}
