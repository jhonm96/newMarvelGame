import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JuegoData } from '../models/juegointerface';
import { JugadorSimple } from '../models/jugadorsimpleinterface';
import { GameWsService } from '../services/game-ws.service.service';

@Component({
  selector: 'app-createdgames',
  templateUrl: './createdgames.component.html',
  styleUrls: ['./createdgames.component.scss']
})
export class CreatedgamesComponent implements OnInit {
    dataGames: any|null
    //juegos:Array<JuegoData>=new Array<JuegoData>();



    constructor(
      private router: Router,
      private ws: GameWsService,
    ) {
    }

    // ngOnInit(): void {
    //   this.ws.getGames().subscribe({
    //     next: (response) => {
    //       this.dataGames= response
    //       this.dataGames.forEach((game: any) =>{
    //         const obj={id: game.id,
    //         iniciado: game.iniciado,
    //         finalizado: game.finalizado,
    //         uid: game.uid,
    //         cantidadJugadores: game.cantidadJugadores,
    //         jugadores: game.jugadores,
    //         ganador: null,
    //         eliminado:false} as JuegoData
    //         this.juegos.push(obj);
    //       })
    //     },

    //     error: (error) => console.log(error)
    //   });
    // }

    ngOnInit(): void {
      this.ws.getGames().subscribe({
        next: (response) => {
          this.dataGames=response
          console.log(this.dataGames)
        },

        error: (error) => console.log(error)
      });
    }

    goToGame(idGame: string): void {
      this.ws.startGame({ juegoId: idGame }).subscribe({
        next: (res) => {
          this.ws.start(idGame).subscribe({
            next: (res) => console.log(res),
          });
        },
        complete: () => {
          this.router.navigate([`/tablero/${idGame}`]);
        },
      });
    }

    getNameCreator(dataGames: JuegoData) {
      return dataGames.jugadores[dataGames.uid].alias;
    }

    getNameJugadores(player: JugadorSimple) {
      return player.alias;
    }

    deleteGame(idGame: string){
    idGame
    }
  }
