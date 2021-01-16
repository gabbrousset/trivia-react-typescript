import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { Difficulty, QuestionState } from './API';
// Styles
import { GlobalStyle, Wrapper } from './assets/styles/App.styles';

export type AnswerObject = {
    question: string;
    userAnswer: string;
    correct: boolean;
    correctAnswer: string;
};

const TOTAL_QUESTIONS: number = 10;

const App = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(true);

    const startTrivia = async (): Promise<void> => {
        setLoading(true);
        setGameOver(false);

        const newQuestions: QuestionState[] = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const currentQuestion: QuestionState = questions[number];

        if (!gameOver && !loading) {
            const userAnswer: string = e.currentTarget.value;

            const correct: boolean =
                currentQuestion.correct_answer === userAnswer;

            if (correct) setScore((prev) => prev + 1);

            const answerObject: AnswerObject = {
                question: currentQuestion.question,
                userAnswer,
                correct,
                correctAnswer: currentQuestion.correct_answer,
            };

            setUserAnswers((prev) => [...prev, answerObject]);
        }
    };

    const nextQuestion = (): void => {
        setNumber((prev) => prev + 1);
    };

    return (
        <>
            <GlobalStyle />
            <Wrapper className='App'>
                <h1>QUIZ</h1>
                {!gameOver && <p className='score'>Score: {score}</p>}
                {loading && <p>Loading Questions...</p>}
                {!loading && !gameOver && (
                    <>
                        <QuestionCard
                            questionNumber={number + 1}
                            totalQuestions={TOTAL_QUESTIONS}
                            question={questions[number].question}
                            answers={questions[number].answers}
                            userAnswer={
                                userAnswers ? userAnswers[number] : undefined
                            }
                            callback={checkAnswer}
                        />
                        {userAnswers.length === number + 1 &&
                            number !== TOTAL_QUESTIONS - 1 && (
                                <button className='next' onClick={nextQuestion}>
                                    Next Question
                                </button>
                            )}
                    </>
                )}
                {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
                    <button className='start' onClick={startTrivia}>
                        Start
                    </button>
                )}
            </Wrapper>
        </>
    );
};

export default App;
