
export enum AppStep {
  LANDING = 'LANDING',
  TRANSITION = 'TRANSITION',
  QUIZ = 'QUIZ',
  CALCULATING = 'CALCULATING',
  ATTENTION_AUDIO = 'ATTENTION_AUDIO',
  RESULT = 'RESULT'
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}
