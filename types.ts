
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  WRITING = 'WRITING',
  READING = 'READING',
  SPEAKING = 'SPEAKING'
}

export interface Question {
  id: number;
  type: QuestionType;
  level: string;
  text: string;
  context?: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Answer {
  questionId: number;
  answer: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface EvaluationResult {
  level: string;
  score: number;
  feedback: string;
}
