import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import ScoreBar from './ScoreBar'
import { useNavigate } from 'react-router-dom'

interface ResultModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  madness: number
  artistry: number
  chaos: number
  comment: string
}

export default function ResultModal({
  open,
  onOpenChange,
  madness,
  artistry,
  chaos,
  comment,
}: ResultModalProps) {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>AI Analysis Result</DialogTitle>
          <DialogDescription>코드 분석 결과입니다</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <ScoreBar label="가독성" value={madness} />
            <ScoreBar label="예술성" value={artistry} />
            <ScoreBar label="광기" value={chaos} />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-300">AI Comment</h4>
            <p className="text-sm text-gray-400 whitespace-pre-wrap">{comment}</p>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Close
          </Button>
          <Button onClick={() => navigate('/gallery')} className="w-full sm:w-auto">
            View Gallery
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
