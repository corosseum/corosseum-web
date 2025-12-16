import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-white">
            COROSSEUM
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="/gallery" className="text-sm sm:text-base text-gray-300 hover:text-white">
              Gallery
            </Link>
            <Link to="/leaderboard" className="text-sm sm:text-base text-gray-300 hover:text-white">
              Leaderboard
            </Link>
            <Link to="/hall-of-fame" className="text-sm sm:text-base text-gray-300 hover:text-white">
              Hall of Fame
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
