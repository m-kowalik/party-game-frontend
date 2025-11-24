import { Player } from "@/types/spyGame";
import { useState } from "react";
import { List, Row } from "./SpyPicker.styled";

type SpyPickerProps = {
    players: Player[];
    onSubmit?: (playerId: string) => {};
}

export default function SpyPicker({players, onSubmit}: SpyPickerProps) {
    return(
        <List>
            {players.map(player => (
                <Row key={player.id} onClick={() => onSubmit && onSubmit(player.id)}>
                    {player.nick}
                </Row>
            ))}
        </List>
    )
}