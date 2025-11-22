"use client";

import { useLobbyHubConnection } from "@/hooks/useLobbyHubConnection";
import { useSpyGameHubConnection } from "@/hooks/useSpyGameHubConnection";
import { Player } from "@/types/player";
import { QRCodeSVG } from "qrcode.react";
import { use, useEffect, useState } from "react";
import { CenteredContent, ConnectionDot, Container, QRCodeWrapper } from "./page.styled";
import SplitLayout from "@/components/SplitLayout/SplitLayout";
import { Button } from "@/components/Button/Button";
import PlayersTable from "@/components/PlayersTable/PlayersTable";
import { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/utils/time";

export default function HostPage() {
  const { connection, connected, gameId, game, players, gameStarted, question, time } = useSpyGameHubConnection();
  const {secondsLeft} = useTimer(time ? time.endTime : null);

  const createGame = async () => {
    if (!connection) return;
    await connection.invoke("CreateGame");
  }

  const startGame = async () => {
    if (!connection) return;
    await connection.invoke("StartGame", gameId);
  }

  useEffect(() => {
    (async () => {
      if (!connection) return;
      if (!gameStarted) return;
      await connection.invoke("AssignRoles", gameId);
      await connection.invoke("GetQuestion", gameId);
    })();
  }, [connection, gameStarted]);

  const openGameInAnotherTab = () => {
    window.open(`http://localhost:3000/spy/player/${gameId}`, "_blank");
  }

  const getQuestion = async () => {
    if (!connection) return;
    if (!gameStarted) return;
    await connection.invoke("GetQuestion", gameId);
  }

  return (
    <Container>
      <SplitLayout>
        <SplitLayout.Left>
          <ConnectionDot connected={connected} /> 
          <CenteredContent>
            {!gameId &&
              <Button onClick={createGame}>Create game</Button>
            }

            {gameId && !gameStarted && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <QRCodeWrapper>
                  <QRCodeSVG value={`http://192.168.0.158:3000/spy/player/${gameId}`} width={200} height={200} />
                </QRCodeWrapper>
                <p>Game ID: {gameId}</p>
                <Button onClick={openGameInAnotherTab}>Open Game in new tab</Button>
                {!gameStarted && (
                  <Button onClick={startGame}>Start Game (SZPIEG)</Button>
                )}
              </div>
            )}

            {gameId && gameStarted && question && (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px'}}>
                {secondsLeft && <h1>{formatTime(secondsLeft)}</h1>}
                <h2>{question}</h2>
                <Button onClick={getQuestion}>Get Question</Button>
              </div>
            )}
          </CenteredContent>
        </SplitLayout.Left>
        <SplitLayout.Right>
          <h2 style={{marginTop: '40px', textAlign: 'center'}}>Players:</h2>
          <CenteredContent>
            <PlayersTable players={players}/>
          </CenteredContent>
        </SplitLayout.Right> 
      </SplitLayout>
      
      
    </Container>
  );
}