import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameWsService } from '../game-ws.service.service';
import { JuegoData } from '../models/juegointerface';
import { JugadorSimple } from '../models/jugadorsimpleinterface';

@Component({
  selector: 'app-createdgames',
  templateUrl: './createdgames.component.html',
  styleUrls: ['./createdgames.component.css']
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
      this.router.navigate(['/board']);
    }

    getNameCreator(dataGame: JuegoData) {
      return dataGame.jugadores[dataGame.uid].alias;
    }

    getNameJugadores(player: JugadorSimple) {
      return player.alias;
    }
  }
