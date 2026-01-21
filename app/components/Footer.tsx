export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-6 py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm">
              H
            </div>
            <span className="text-gray-500 text-sm">
              © {currentYear} Haseeb. Built with Next.js & ❤️
            </span>
          </div>


          <div className="flex items-center gap-6">
            <a href="#about" className="text-gray-500 hover:text-white transition-colors text-sm">
              About
            </a>
            <a href="#contributions" className="text-gray-500 hover:text-white transition-colors text-sm">
              Work
            </a>
            <a href="#contact" className="text-gray-500 hover:text-white transition-colors text-sm">
              Contact
            </a>
          </div>


          <a
            href="#"
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-400 transition-colors text-sm group"
          >
            Back to top
            <svg 
              className="w-4 h-4 group-hover:-translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
