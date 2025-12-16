import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAuth } from './hooks/useAuth'
import Arena from './pages/Arena'
import Gallery from './pages/Gallery'
import QuestDetail from './pages/QuestDetail'
import Leaderboard from './pages/Leaderboard'
import HallOfFame from './pages/HallOfFame'
import Header from './components/Header'

function App() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<Arena />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:questId" element={<QuestDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
        </Routes>
        <Toaster position="top-right" theme="dark" />
      </div>
    </BrowserRouter>
  )
}

export default App
