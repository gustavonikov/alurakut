import styled from 'styled-components'

export const TextArea = styled.textarea`
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10px;

    resize: vertical;

    min-height: 150px;
    max-height: 300px;

    outline: none;

    ::placeholder {
        color: #333333;
        opacity: 1;
    }
`