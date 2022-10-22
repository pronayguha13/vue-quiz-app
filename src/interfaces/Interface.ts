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
