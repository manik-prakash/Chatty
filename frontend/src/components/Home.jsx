import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl font-bold">Chatty</span>
        </div>
        <Link to="/login">
          <button
            className="bg-gray-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-600 transition-all hover:scale-105 shadow-lg"
          >
            Login
          </button>
        </Link>

      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="mb-8">
          <span className="inline-block bg-gray-800/50 backdrop-blur-sm text-gray-200 px-6 py-2 rounded-full text-sm font-semibold mb-8 border border-gray-700">
            Real-time messaging made simple
          </span>
        </div>

        <h1 className="text-white text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Connect, Chat,
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-300 via-gray-100 to-white">
            Collaborate
          </span>
        </h1>

        <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience seamless real-time communication with our modern chat platform.
          Create rooms, invite friends, and start conversations instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link to="/login">
            <button
              className="bg-gray-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-600 transition-all hover:scale-105 shadow-2xl"
            >
              Get Started
            </button>
          </Link>
          <Link to="https://github.com/manik-prakash">
            <button className="bg-gray-800/50 backdrop-blur-sm text-gray-200 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-800/70 transition-all border border-gray-700">
              Learn More
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="bg-gray-800/30 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:bg-gray-800/50 transition-all hover:scale-105 hover:shadow-2xl">
            <h3 className="text-white text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">
              Chat instantly with your study groups and classmates. Messages appear in real-time with no refresh needed.
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:bg-gray-800/50 transition-all hover:scale-105 hover:shadow-2xl">
            <h3 className="text-white text-xl font-bold mb-3">Easy Room Creation</h3>
            <p className="text-gray-400 text-sm">
              Create dedicated chat rooms for different subjects, projects, or friend groups in seconds.
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:bg-gray-800/50 transition-all hover:scale-105 hover:shadow-2xl">
            <h3 className="text-white text-xl font-bold mb-3">Simple & Clean</h3>
            <p className="text-gray-400 text-sm">
              No complicated features, just straightforward messaging. Perfect for quick discussions and collaborations.
            </p>
          </div>
        </div>

      </div>

      <footer className="relative z-10 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center gap-6 mb-6">
            <a
              href="https://github.com/manik-prakash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/manik-prakash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="https://x.com/manikprakash74"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="mailto:manikprakash74@gmail.com"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          <div className="text-center text-gray-400 text-sm mb-2">
            <p className="flex items-center justify-center gap-2">
              Created with
              <span className="text-red-500 animate-pulse">❤️</span>
              by
              <span className="text-white font-semibold">Manik</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage