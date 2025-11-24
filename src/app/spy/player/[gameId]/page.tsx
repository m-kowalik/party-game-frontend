'use client';

import { useLobbyHubConnection } from "@/hooks/useLobbyHubConnection";
import { useSpyGameHubConnection } from "@/hooks/useSpyGameHubConnection";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container, ContentWrapper, Question } from "./page.styled";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Indicator } from "@/components/PlayersTable/PlayersTable.styled";
import { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/utils/time";
import { ConnectionDot } from "@/components/ConnectionDot/ConnectionDot";
import SpyPicker from "@/components/SpyPicker/SpyPicker";

interface PageProps {
  params: {
    gameId: string;
  };
}

type View = 'JOIN' | 'WAITING' | 'GAME' | 'PICK_SPY' | 'GAME_END';

const PlayerPage = ({ params }: { params: Promise<{ gameId: string }> }) => {
    const { gameId } = useParams();
    const { 
        connection, 
        connected: gameConnected, 
        game, 
        role, 
        gameId: currentGameId, 
        playerId, 
        question, 
        time, 
        gameStarted, 
        answeringPlayer, 
        players
    } = useSpyGameHubConnection();
    const {secondsLeft} = useTimer(time ? time.endTime : null);
    const isCurrentAnswerer = answeringPlayer?.id === playerId;
    const [view, setView] = useState<View>('JOIN');
    const [isAnsweringPlayer, setIsAnsweringPlayer] = useState<boolean>(false);
    const nickRef = React.useRef<HTMLInputElement>(null);
    
    const otherPlayers = useMemo(() => players.filter(p => p.id !== playerId), [players, playerId]);

    useEffect(() => {
        if(!currentGameId) setView('JOIN');
        else if (!gameStarted) setView('WAITING');
        else setView('GAME');
    }, [currentGameId, gameStarted]);

    useEffect(() => {
        if(!connection) return;
        connection.on('GameEnded', () => setView('GAME_END'));
        connection.on('IsAnsweringPlayer', setIsAnsweringPlayer);
    }, [connection])


    const joinGame = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!connection) return;
        await connection.invoke("JoinGame", gameId, nickRef.current?.value);
    }

    const answered = async () => {
        if (!connection) return;
        await connection.invoke("Answered", gameId);
        setIsAnsweringPlayer(false);
    }

    const handlePickSpy = async (playerId: string) => {
        if (!connection) return;
        await connection.invoke("PickSpy", gameId, playerId);
    }


    return (
        <Container>
            <ConnectionDot $connected={gameConnected} style={{alignSelf: 'flex-start'}}/>
            <ContentWrapper>
            {view === 'JOIN' && (
                <form onSubmit={joinGame} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    <Input type="text" ref={nickRef} style={{marginBottom: '16px'}} placeholder="Nickname" autoFocus></Input>
                    <Button type="submit">Join Game</Button>
                </form>
            )}
            {view === 'WAITING' && (
                <>
                    <h1>Joined to game</h1>
                    <h2>Waiting for start...</h2>
                </>
            )}
            {view === 'GAME' && (
                <>
                    {secondsLeft && (
                        <h1>{formatTime(secondsLeft)}</h1>
                    )}
                    {role && <h2>{role}</h2>}
                    {question && <Question key={question}>{question}</Question>}
                    {role !== 'Spy' && <Button onClick={() => setView('PICK_SPY')}>Pick a spy</Button>}
                    {isAnsweringPlayer && <Button onClick={answered}>Answered</Button>}
                </>
            )}
            {view === 'PICK_SPY' && (
                <>
                    <h1>Pick a spy:</h1>
                    {players && <SpyPicker players={otherPlayers} onSubmit={handlePickSpy}/>}
                    <Button onClick={() => setView('GAME')}>Back</Button>
                </>
            )}
            {view === 'GAME_END' && (
                <>
                    <h1>Game end!</h1>
                </>
            )}

            </ContentWrapper>
        </Container>
    );
};

export default PlayerPage;