import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Corosseum" className="h-8 sm:h-10" />
            <span className="text-lg sm:text-xl font-bold text-white">COROSSEUM</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="/gallery" className="text-sm sm:text-base text-gray-300 hover:text-white">
              퀘스트 목록
            </Link>
            <Link to="/leaderboard" className="text-sm sm:text-base text-gray-300 hover:text-white">
              리더보드
            </Link>
            <Link to="/hall-of-fame" className="text-sm sm:text-base text-gray-300 hover:text-white">
              명예의 전당
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
