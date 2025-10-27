import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { GenerationType, HistoryItem } from './types';
import { generateCodeContent } from './services/geminiService';
import { HistorySidebar } from './components/HistorySidebar';
import { WelcomeAnimation } from './components/WelcomeAnimation';

const WELCOME_ANIMATION_TOTAL_TIME = 2500; // ms

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [generationType, setGenerationType] = useState<GenerationType>(GenerationType.CodeGenerator);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Python');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [isWelcomeAnimationActive, setIsWelcomeAnimationActive] = useState(
    !sessionStorage.getItem('welcomeAnimationShown')
  );

  useEffect(() => {
    if (isWelcomeAnimationActive) {
      const timer = setTimeout(() => {
        setIsWelcomeAnimationActive(false);
        sessionStorage.setItem('welcomeAnimationShown', 'true');
      }, WELCOME_ANIMATION_TOTAL_TIME);
      
      return () => clearTimeout(timer);
    }
  }, [isWelcomeAnimationActive]);


  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('ai-code-mentor-history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
    // Close sidebar on initial load on mobile
    if (window.innerWidth < 768) {
      setIsHistoryOpen(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ai-code-mentor-history', JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to get started.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const result = await generateCodeContent(inputText, generationType, selectedLanguage);
      setGeneratedContent(result);
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        inputText,
        generationType,
        language: generationType === GenerationType.CodeGenerator ? selectedLanguage : '',
        generatedContent: result,
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while generating content.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [inputText, generationType, selectedLanguage]);

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setInputText(item.inputText);
    setGenerationType(item.generationType);
    setSelectedLanguage(item.language || 'Python');
    setGeneratedContent(item.generatedContent);
    setError(null);
    setIsLoading(false);
    // On mobile, close sidebar after selection for better UX
    if (window.innerWidth < 768) {
        setIsHistoryOpen(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="bg-slate-900 font-sans text-slate-200">
      <WelcomeAnimation isActive={isWelcomeAnimationActive} />
      <div className={`transition-opacity duration-500 ${isWelcomeAnimationActive ? 'opacity-0' : 'opacity-100'}`}>
        <HistorySidebar
          history={history}
          onSelectItem={handleSelectHistoryItem}
          onClearHistory={handleClearHistory}
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
        />
        <div className={`relative min-h-screen flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out ${isHistoryOpen ? 'md:ml-80' : 'ml-0'}`}>
          <Header 
              onToggleHistory={() => setIsHistoryOpen(prev => !prev)}
              isHistoryOpen={isHistoryOpen}
          />
          <main className="flex-1 container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
            <div className="bg-slate-800 rounded-2xl shadow-2xl shadow-black/25 p-6 sm:p-8 space-y-8">
              <InputSection
                inputText={inputText}
                setInputText={setInputText}
                generationType={generationType}
                setGenerationType={setGenerationType}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
              <OutputSection
                isLoading={isLoading}
                error={error}
                generatedContent={generatedContent}
                generationType={generationType}
              />
            </div>
          </main>
          <footer className="text-center p-4 text-slate-400 text-sm">
            <p>AI Code Mentor helps you write better code. Always test generated code before use.</p>
            <p>Powered by the Gemini API.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;