import { Player } from "@/types/player";
import { Indicator, NickWrapper, Table, TableCell, TableRow } from "./PlayersTable.styled";

export function PlayerRow({nick, score}: {nick: string, score: number}) {
    return (
        <TableRow>
            <TableCell><NickWrapper><Indicator />{nick}</NickWrapper></TableCell>
            <TableCell align="right">{score}</TableCell>
        </TableRow>
    )
}

export default function PlayersTable({players}: {players: Player[]}) {
    return (
        <Table>
            <tbody>
               {players.map(player => (
                    <PlayerRow key={player.id} nick={player.nick} score={0} />
                ))}
            </tbody>
        </Table>
    );
}

