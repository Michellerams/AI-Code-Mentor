import React from 'react';

interface WelcomeAnimationProps {
  isActive: boolean;
}

export const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ isActive }) => {
  return (
    <div className={`fixed inset-0 bg-slate-900 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center">
        <div style={{ animationDelay: '100ms' }} className="animate-fade-in-up opacity-0 mx-auto bg-fuchsia-600 p-4 rounded-2xl inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h1 style={{ animationDelay: '300ms' }} className="animate-fade-in-up opacity-0 text-5xl font-bold text-slate-100 mt-6">
          AI Code Mentor
        </h1>
        <p style={{ animationDelay: '500ms' }} className="animate-fade-in-up opacity-0 text-xl text-slate-400 mt-3">
          Your coding companion, powered by Gemini.
        </p>
      </div>
    </div>
  );
};