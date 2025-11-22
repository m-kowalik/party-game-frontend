import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--foreground);
  color: var(--background);
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;


  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;  