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

    dataGames: any;

    constructor(
      private router: Router,
      private ws: GameWsService,
    ) {
      this.dataGames = [];
    }

    ngOnInit(): void {
      this.ws.getGames().subscribe({
        next: (response) => {
          this.dataGames = response;
          console.log(response);
        },
        error: (error) => console.log(error)
      });
    }

    goToGame(idGame: string): void {
      this.router.navigate(['/tablero']);
    }

    getNameCreator(dataGame: JuegoData) {
      return dataGame.jugadores[dataGame.uid].alias;
    }

    getNameJugadores(player: JugadorSimple) {
      return player.alias;
    }
  }
