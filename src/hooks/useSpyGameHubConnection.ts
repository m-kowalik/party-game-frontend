"use client"; 

import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { GameTime, JoinedGameDto, Player, PlayerGameScore, SpyGame } from "@/types/spyGame";
import { start } from "repl";

const EXTERNAL_BACKEND_URL = "http://192.168.0.158:5000"
const INTERNAL_BACKEND_URL = "http://localhost:5000";
const HUB_BASE_URL = `${INTERNAL_BACKEND_URL}/hubs/game/spy`;

export function useSpyGameHubConnection(hubUrl: string = HUB_BASE_URL) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [connected, setConnected] = useState(false);
  const [gameId, setGameId] = useState<string | null>(null);
  const [game, setGame] = useState<SpyGame | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [question, setQuestion] = useState<string | null>(null);
  const [time, setTime] = useState<GameTime | null>(null);
  const [answeringPlayer, setAnsweringPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    conn.start()
      .then(() => setConnected(true))
      .then(() => console.log("Connected to Spy Game Hub"))
      .catch((err) => console.error("Connection error:", err));

    conn.on("GameCreated", (gameId: string) => {
      setGameId(gameId);
    });
    conn.on("JoinedGame", ({ gameId, playerId }: JoinedGameDto) => {
      setGameId(gameId);
      setPlayerId(playerId);
    });
    conn.on("GameStarted", () => {
      setGameStarted(true);
    })
    conn.on("RoleAssigned", (role: string) => {
      setRole(role);
    });
    conn.on("PlayerListUpdated", (playerList: Player[]) => {
      setPlayers(playerList);
    });
    conn.on("QuestionReceived", (question: string) => {
      setQuestion(question);
    })
    conn.on("TimeReceived", ({startTime, endTime}: {startTime: string, endTime: string}) => {
      setTime({startTime: new Date(startTime), endTime: new Date(endTime)});
    })
    conn.on("AnsweringPlayerReceived", (player: Player) => {
      setAnsweringPlayer(player);
    })
    conn.on("PlayerGameScoreReceived", (playerGameScore: PlayerGameScore) => {
      setPlayers(prev => 
        prev.map(player => player.id === playerGameScore.playerId ? {...player, score: playerGameScore.score} : player));
    })
    conn.on("GameEnded", () => {
        setGameStarted(false);
        setRole(null);
        setQuestion(null);
        setTime(null);
        setAnsweringPlayer(null);
    })
    conn.on("Error", (err) => console.error("Game hub error:", err));
    

    connectionRef.current = conn;

    return () => {
      conn.stop();
    };
  }, []);

  return { 
    connection: connectionRef.current, 
    connected, 
    gameId, 
    game, 
    role, 
    players, 
    playerId, 
    gameStarted, 
    question, 
    time,
    answeringPlayer
  };
}