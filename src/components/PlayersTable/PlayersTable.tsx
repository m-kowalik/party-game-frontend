
import { Player } from "@/types/spyGame";
import { Indicator, NickWrapper, Table, TableCell, TableRow } from "./PlayersTable.styled";

type PlayersTableProps = {
    players: Player[];
    answeringPlayer?: Player | null;
}

export function PlayerRow({nick, score, answering}: {nick: string, score: number, answering: boolean}) {
    return (
        <TableRow $answering={answering}>
            <TableCell><NickWrapper><Indicator />{nick}</NickWrapper></TableCell>
            <TableCell align="right">{score}</TableCell>
        </TableRow>
    )
}

export default function PlayersTable({players, answeringPlayer}: PlayersTableProps) {
    return (
        <Table>
            <tbody>
               {players.map(player => (
                    <PlayerRow 
                        key={player.id} 
                        nick={player.nick} 
                        score={player.score || 0} 
                        answering={player.id == answeringPlayer?.id}
                    />
                ))}
            </tbody>
        </Table>
    );
}

