"use client"; 

import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Player } from "@/types/player";
import { Scores } from "@/types/score";

export function useLobbyHubConnection(hubUrl: string) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [connected, setConnected] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [scores, setScores] = useState<Scores>({});
  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    conn.start()
      .then(() => setConnected(true))
      .catch((err) => console.error("Connection error:", err));

    conn.on("PlayerListUpdated", (list: Player[]) => setPlayers(list));
    conn.on("ScoresUpdated", (s: Scores) => setScores(s));
    conn.on("LobbyCreated", (lobbyId: string) => {
      console.log("Lobby created:", lobbyId);
      setLobbyId(lobbyId);
    });
    conn.on("JoinedLobby", ({lobbyId, userId}: {lobbyId: string, userId: string}) => {
      setLobbyId(lobbyId);
      setUserId(userId);
    })

    connectionRef.current = conn;

    return () => {
      conn.stop();
    };
  }, [hubUrl]);

  return { connection: connectionRef.current, connected, players, scores, lobbyId, userId };
}