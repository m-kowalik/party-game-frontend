'use client';

import { useLobbyHubConnection } from "@/hooks/useLobbyHubConnection";
import { useSpyGameHubConnection } from "@/hooks/useSpyGameHubConnection";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Container } from "./page.styled";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Indicator } from "@/components/PlayersTable/PlayersTable.styled";
import { ConnectionDot } from "../../host/page.styled";

interface PageProps {
  params: {
    gameId: string;
  };
}

const PlayerPage = ({ params }: { params: Promise<{ gameId: string }> }) => {
    const { gameId } = useParams();
    const { connection, connected: gameConnected, game, role, gameId: currentGameId, playerId, question, time } = useSpyGameHubConnection('http://localhost:5000/hubs/game/spy');

    const nickRef = React.useRef<HTMLInputElement>(null);


    const joinGame = async () => {
        if (!connection) return;
        await connection.invoke("JoinGame", gameId, nickRef.current?.value);
    }


    return <Container>
        <ConnectionDot connected={gameConnected} style={{position: 'absolute', top: 5, left: 10}}/>
        {!currentGameId ? (
            <>
                <Input type="text" ref={nickRef} style={{marginBottom: '16px'}} placeholder="Nickname"></Input>
                <Button onClick={joinGame}>Join Game</Button>
            </>
            
        ) :
        (
            <>
            <p>You have PlayerID: {playerId}</p>
            <p>Joined game: {currentGameId}</p>
            {time && time.endTime.getTime() - new Date().getTime() }
            {role && <p>Your role: {role}</p>}
            {question && <p>Question: {question}</p>}
           </>
        )}
    </Container>;
};

export default PlayerPage;