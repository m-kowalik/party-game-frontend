import styled from "styled-components";

export const ConnectionDot = styled.div<{ $connected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.$connected ? "var(--success)" : "var(--error)")};
  margin: 10px 0;
`;