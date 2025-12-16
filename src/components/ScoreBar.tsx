import { Progress } from './ui/progress'

interface ScoreBarProps {
  label: string
  value: number
  max?: number
}

export default function ScoreBar({ label, value, max = 100 }: ScoreBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">{value}</span>
      </div>
      <Progress value={(value / max) * 100} />
    </div>
  )
}

