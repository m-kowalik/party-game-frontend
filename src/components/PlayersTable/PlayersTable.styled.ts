import styled from "styled-components";

export const Table = styled.table`
    border-spacing: 0 8px; 
    min-width: 200px;
`;

export const TableRow = styled.tr`
    background: var(--foreground-secondary);

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

export const TableCell = styled.td`
    padding: 8px;
    
`;

export const Indicator = styled.div`
    display: inline-block;
    width: 5px;
    height: 20px;
    background-color: red;
    margin-right: 8px;
`;

export const NickWrapper = styled.div`
    display: flex;
    align-items: center;
`;
