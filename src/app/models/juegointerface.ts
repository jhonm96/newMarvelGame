import { JugadorSimple } from "./jugadorsimpleinterface";


export interface JuegoData {
    id: string;
    iniciado: boolean;
    finalizado: boolean;
    uid: string;
    cantidadJugadores: number;
    jugadores: { [key: string]: JugadorSimple };
    ganador: null;
}
