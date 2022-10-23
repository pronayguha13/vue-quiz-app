export interface QUESTION {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface RESPONSE {
  response_code: number;
  results: QUESTION[];
}

export interface SELECTEDQUESTION {
  index: number;
  question: QUESTION;
}

export interface Option {
  id: number;
  value: string;
  isCorrect: boolean;
}
