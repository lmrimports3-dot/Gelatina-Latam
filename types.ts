
export enum AppStep {
  OPENING = 'OPENING',
  EMOTIONAL = 'EMOTIONAL',
  GENDER = 'GENDER',
  AGE = 'AGE',
  LEAD_CAPTURE = 'LEAD_CAPTURE',
  BELLY_TYPE = 'BELLY_TYPE',
  SLEEP = 'SLEEP',
  EDUCATION = 'EDUCATION',
  SOCIAL_PROOF = 'SOCIAL_PROOF',
  FINAL_GOAL = 'FINAL_GOAL',
  COMMITMENT = 'COMMITMENT',
  BIOMETRICS = 'BIOMETRICS',
  ANALYSIS = 'ANALYSIS',
  SPECIALIST_AUDIO = 'SPECIALIST_AUDIO',
  SALES = 'SALES'
}

export interface UserData {
  name: string;
  email: string;
  gender: string;
  age: string;
  emotional: string;
  bellyType: string;
  sleep: string;
  goal: string;
  weight: number;
  height: number;
  commitment: boolean;
}
