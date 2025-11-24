export type SpyGame = {
    id: string;
    players: Player[];
    started: boolean;
    place: string;
};

export type Player = {
    id: string;
    connectionId: string;
    nick: string;
    isSpy: boolean;
    isDisplay: boolean;
    score?: number;
};

export type PlayerGameScore = {
    id: string;
    gameId: string;
    playerId: string;
    score: number;
}

export type JoinedGameDto = {
    gameId: string;
    playerId: string;
}

export type GameTime = {
    startTime: Date;
    endTime: Date;
}