import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ConnectionDot = styled.div<{ connected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.connected ? "var(--success)" : "var(--error)")};
  margin: 10px 0;
`;

export const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50%;
`;

export const QRCodeWrapper = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 8px;
`;