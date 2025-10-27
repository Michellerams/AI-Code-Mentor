import React from 'react';
import { GenerationType } from '../types';
import { Loader } from './Loader';
import { CopyToClipboardButton } from './CopyToClipboardButton';

interface OutputSectionProps {
  isLoading: boolean;
  error: string | null;
  generatedContent: string | null;
  generationType: GenerationType;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    // Attempt to extract language from markdown code block for display
    const match = code.match(/```(\w+)\n/);
    const language = match ? match[1] : '';
    const cleanCode = code.replace(/```(\w+)?\n/, '').replace(/```$/, '');

    return (
        <pre className="bg-black/50 text-slate-200 rounded-lg p-4 font-mono text-sm overflow-x-auto relative">
            {language && <span className="absolute top-2 right-3 text-xs text-fuchsia-400 font-semibold uppercase">{language}</span>}
            <code>{cleanCode}</code>
        </pre>
    );
};

const renderContent = (
    content: string | null, 
    type: GenerationType
) => {
  if (!content) return null;

  if (type === GenerationType.CodeGenerator && typeof content === 'string') {
    return <CodeBlock code={content} />;
  }
  
  if (type === GenerationType.CodeExplainer && typeof content === 'string') {
    return <div className="prose prose-slate prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />;
  }
  
  return <p>Unsupported content format.</p>;
};

export const OutputSection: React.FC<OutputSectionProps> = ({
  isLoading,
  error,
  generatedContent,
  generationType,
}) => {
  const getCopyableText = () => {
    if (!generatedContent) return '';

    if (typeof generatedContent === 'string') {
        const cleanCode = generatedContent.replace(/```(\w+)?\n/, '').replace(/```$/, '');
        return cleanCode;
    }
    
    return JSON.stringify(generatedContent, null, 2);
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-3">AI Code Mentor's Response</h3>
      <div className="relative min-h-[200px] w-full p-4 border border-slate-700 bg-slate-900 rounded-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 rounded-lg z-20">
            <Loader />
          </div>
        )}
        {error && (
          <div className="text-red-400 bg-red-900/50 border border-red-800 p-3 rounded-md flex items-start space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p>{error}</p>
          </div>
        )}
        {generatedContent && !isLoading && !error && (
          <>
            <div className="absolute top-3 right-3 z-10">
              <CopyToClipboardButton textToCopy={getCopyableText()} />
            </div>
            <div>
              {renderContent(generatedContent, generationType)}
            </div>
          </>
        )}
        {!isLoading && !error && !generatedContent && (
          <div className="text-center text-slate-500 py-16">
             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             </svg>
            <p className="mt-2">Your generated code will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};