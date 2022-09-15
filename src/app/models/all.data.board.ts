import { Board } from "./board.model";
import { Round } from "./round.model";


export interface AllDataBoard {
    tablero: Board;
    tiempo:  number;
    ronda:   Round;
}
