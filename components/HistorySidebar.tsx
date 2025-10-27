import React from 'react';
import { HistoryItem, GenerationType } from '../types';

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const HistoryItemCard: React.FC<{ item: HistoryItem; onSelect: () => void }> = ({ item, onSelect }) => {
  const getIcon = () => {
    if (item.generationType === GenerationType.CodeGenerator) {
      return <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />;
    }
    return <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
  };

  return (
    <button
      onClick={onSelect}
      className="w-full text-left p-3 rounded-lg hover:bg-slate-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
    >
      <div className="flex items-start space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {getIcon()}
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 truncate">{item.inputText}</p>
          <p className="text-xs text-slate-400 mt-1">
            {new Date(item.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </button>
  );
};

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelectItem, onClearHistory, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside className={`fixed top-0 left-0 h-full w-80 bg-slate-800/80 backdrop-blur-md border-r border-slate-700 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-100">History</h2>
          <button 
            onClick={onClearHistory}
            disabled={history.length === 0}
            className="text-sm text-slate-400 hover:text-fuchsia-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Clear history"
          >
            Clear
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {history.length > 0 ? (
            history.map(item => (
              <HistoryItemCard key={item.id} item={item} onSelect={() => onSelectItem(item)} />
            ))
          ) : (
            <div className="text-center text-slate-500 p-8 h-full flex items-center justify-center">
              <p>Your generation history will appear here.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
