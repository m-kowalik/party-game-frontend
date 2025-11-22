import styled from "styled-components";

export const Input = styled.input`
    padding: 8px 12px;
    border: 1px solid var(--foreground);
    border-radius: 4px;
    font-size: 16px;
    color: var(--text);
    background-color: var(--background);
    
    &:focus {   
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(74, 143, 231, 0.3);
    }

    &::placeholder {
        color: var(--foreground);
        opacity: 0.6;
    }
`;