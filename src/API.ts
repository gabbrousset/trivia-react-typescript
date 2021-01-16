import { shuffleArray } from './utils';

export interface Question {
    category: string;
    difficulty: string;
    question: string;
    type: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export const fetchQuizQuestions = async (
    amount: number = 10,
    difficulty: Difficulty = Difficulty.MEDIUM
): Promise<QuestionState[]> => {
    const endpoint: string = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&encode=base64`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
        ]),
    }));
};
