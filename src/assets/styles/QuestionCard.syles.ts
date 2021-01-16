import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 1100px;
    min-width: 800px;
    background: #eeeeee;
    border-radius: 10px;
    padding: 20px;
    border: 3px solid #999999;
    text-align: center;

    p {
        font-size: 1em;
    }
`;

interface ButtonWrapperProps {
    correct: boolean;
    clicked: boolean;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;

    :hover {
        opacity: 0.8;
    }

    button {
        cursor: pointer;
        user-select: none;
        font-size: 0.8em;
        width: 100%;
        height: 40px;
        margin: 4px;
        border: 1px solid #444444;
        box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        color: #000000;
        text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
        background: ${({ correct, clicked }) =>
            correct ? '#338333' : clicked ? '#AA3C39' : '#eeeeee'};
    }
`;
