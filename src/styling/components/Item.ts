import styled from 'styled-components';

export const StyledImage = styled.img`
    height: 200px;
    width: 200px;
`

const Button = styled.button`
    border-radius: 8px;
    border: 1px solid #d7d5dd;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: transparent;
    cursor: pointer;
    transition: border-color 0.25s;
`

export const StyledAddBtn = styled(Button)`
    color: green;
`

export const StyledRemoveBtn = styled(Button)`
    color: red;
`