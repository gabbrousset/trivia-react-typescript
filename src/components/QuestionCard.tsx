import React from 'react';
// Types
import { AnswerObject } from '../App';
// Styles
import { Wrapper, ButtonWrapper } from '../assets/styles/QuestionCard.syles';

interface Props {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions,
}) => (
    <Wrapper>
        <p className='number'>
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p>{b64DecodeUnicode(question)}</p>
        <div>
            {answers.map((answer, i) => (
                <ButtonWrapper
                    key={`id_${i}`}
                    correct={userAnswer?.correctAnswer === answer}
                    clicked={userAnswer?.userAnswer === answer}
                >
                    <button
                        disabled={!!userAnswer}
                        value={answer}
                        onClick={callback}
                    >
                        <span>{b64DecodeUnicode(answer)}</span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

const b64DecodeUnicode = (str: string): string => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
        atob(str)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
};

export default QuestionCard;
