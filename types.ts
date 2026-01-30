
export enum AppStep {
  LANDING = 'LANDING',
  TRANSITION = 'TRANSITION',
  QUIZ = 'QUIZ',
  CALCULATING = 'CALCULATING',
  RESULT = 'RESULT'
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}
