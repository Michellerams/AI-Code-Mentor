import React from 'react';
import { GenerationType } from '../types';

interface InputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  generationType: GenerationType;
  setGenerationType: (type: GenerationType) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  setInputText,
  generationType,
  setGenerationType,
  selectedLanguage,
  setSelectedLanguage,
  onGenerate,
  isLoading,
}) => {
  const options = [
    { id: GenerationType.CodeGenerator, label: 'Code Generator', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { id: GenerationType.CodeExplainer, label: 'Code Explainer', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const languages = [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'HTML', 'CSS', 'SQL', 'Shell'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="input-text" className="block text-lg font-semibold text-slate-200 mb-2">
          What code can I help you with today?
        </label>
        <textarea
          id="input-text"
          rows={8}
          className="w-full p-3 border font-mono text-sm bg-slate-900 border-slate-600 text-slate-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-150 ease-in-out"
          placeholder="Describe the function for Code Generator, or paste code for the other tools..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {generationType === GenerationType.CodeGenerator && (
        <div>
          <label htmlFor="language-select" className="block text-lg font-semibold text-slate-200 mb-2">
            Select Language
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-3 border font-sans text-sm bg-slate-900 border-slate-600 text-slate-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-150 ease-in-out"
          >
            {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-3">Select a Tool</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="generationType"
                value={option.id}
                checked={generationType === option.id}
                onChange={() => setGenerationType(option.id)}
                className="sr-only"
              />
              <label
                htmlFor={option.id}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 h-full ${
                  generationType === option.id
                    ? 'border-fuchsia-600 bg-slate-700/50 text-fuchsia-400'
                    : 'border-slate-700 bg-slate-800 hover:bg-slate-700/50 text-slate-300'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={option.icon} />
                </svg>
                <span className="font-medium text-center">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={onGenerate}
          disabled={isLoading || !inputText}
          className="w-full flex justify-center items-center bg-fuchsia-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-fuchsia-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>
      </div>
    </div>
  );
};