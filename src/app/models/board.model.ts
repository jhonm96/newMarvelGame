import { Card } from "./card.model";

export interface Board {
  id: string;
  jugadores: string[];
  habilitado: boolean;
  cartas: Card;
}
