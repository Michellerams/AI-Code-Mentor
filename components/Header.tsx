import React from 'react';

interface HeaderProps {
    onToggleHistory: () => void;
    isHistoryOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleHistory, isHistoryOpen }) => (
  <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-30">
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleHistory}
          className="p-2 rounded-md hover:bg-slate-700 transition-colors text-slate-400 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          aria-label={isHistoryOpen ? 'Close history panel' : 'Open history panel'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {isHistoryOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            )}
          </svg>
        </button>
        <div className="bg-fuchsia-600 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">AI Code Mentor</h1>
      </div>
    </div>
  </header>
);
