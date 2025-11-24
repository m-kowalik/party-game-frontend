import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 16px;
    align-items: center;
    text-align: center;
`;

export const Question = styled.span`
    opacity: 0;
    transform: translateY(50px);
    animation: fadeInUp 0.4s ease forwards;

    @keyframes fadeInUp {
        to {
        opacity: 1;
        transform: translateY(0);
        }
    }
`;