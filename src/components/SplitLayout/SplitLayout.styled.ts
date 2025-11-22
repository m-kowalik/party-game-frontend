import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftSide = styled.div`
    width: 50%;
    @media (max-width: 768px) {
        width: 100%;
  }
`;

export const RightSide = styled.div`
    width: 50%;
    @media (max-width: 768px) {
        width: 100%;
  }
    `;