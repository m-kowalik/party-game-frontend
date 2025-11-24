import styled from "styled-components";

export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    min-width: 200px;
`;

export const Row = styled.li`
    padding: 12px 20px;
    background: var(--foreground-secondary);
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #f5f5f522;
    }
`;