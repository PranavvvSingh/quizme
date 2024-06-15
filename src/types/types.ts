interface OllamaResponseType {
   topic: string
   questions: QuestionType[]
}
interface QuestionType {
   id: number
   question: string
   options: string[]
   answer: number
}
interface QuestionResponseType extends QuestionType {
   response: number;
}

interface QuizResult {
   created_at: string;
   questions: QuestionResponseType[],
   score: number;
}

interface QuizData{
   id: number;
   user: string;
   topic: string;
   score: number;
   responses: number[];
   created_at: string;
}
