export enum GenerationType {
  CodeGenerator = 'codeGenerator',
  CodeExplainer = 'codeExplainer',
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  inputText: string;
  generationType: GenerationType;
  language: string;
  generatedContent: string;
}
