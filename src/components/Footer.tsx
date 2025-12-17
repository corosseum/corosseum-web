export default function Footer() {
  return (
    <footer className="border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
          <span>Developed by Seungwan Yoo</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ysw789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="mailto:ysw99@kakao.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

