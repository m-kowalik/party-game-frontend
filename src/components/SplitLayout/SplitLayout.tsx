import { Container, LeftSide, RightSide } from "./SplitLayout.styled";


export default function SplitLayout({children}: {children: React.ReactNode}) {
    return (
        <Container>
            {children}
        </Container>
    )
}

SplitLayout.Left = function Left({children}: {children: React.ReactNode}) {
    return (
        <LeftSide>
            {children}
        </LeftSide>
    )
}

SplitLayout.Right = function Right({children}: {children: React.ReactNode}) {
    return (
        <RightSide>
            {children}
        </RightSide>
    )
}