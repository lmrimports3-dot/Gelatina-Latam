export enum AppStep {
  LANDING = 'LANDING',
  QUIZ = 'QUIZ',
  CALCULATING = 'CALCULATING',
  DIAGNOSIS = 'DIAGNOSIS',
  EXPERT_AUDIO = 'EXPERT_AUDIO',
  PRE_SALES_LOADING = 'PRE_SALES_LOADING',
  FINAL_PROOF = 'FINAL_PROOF'
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionHighlight?: string;
  subtext: string;
  options: {
    id: string;
    label: string;
    subtext?: string;
    icon?: string;
    image?: string;
  }[];
  type: 'text' | 'image' | 'weight_height' | 'goal';
}