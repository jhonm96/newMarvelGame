import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AllDataBoard } from '../models/all.data.board';
import { Card } from '../models/card.model';
import { List } from '../models/list.model';
import { Round } from '../models/round.model';
import { AuthService } from '../modules/auth1/auth.service';
import { GameWsService } from '../services/game-ws.service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  private gameId!: string;
  private userId!: string;
  list: List | null = null;
  board: AllDataBoard | null = null;
  ronda:Round| null = null;
  isMainPlayer: boolean = false;
  cartasUser!:Card[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ws: GameWsService,
    private userService: UserService,
    private router: Router,
    private auth:AuthService
  ) {
    this.userId = this.auth.getMyUser()?.uid!;
  }


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.gameId = id;
          return this.ws.start(id);
        })
      )
      .subscribe(() => {
        console.log(this.gameId);
      });

    this.ws.start(this.gameId).subscribe((res) => {
    });
    this.getBoardId();

  }

  getBoardId() {
    this.ws.getBoard(this.gameId).subscribe({
      next: (res) => {
        if (res) {
          this.getMazoUser()
          this.board = res;
          console.log(this.board);
        } else {
          this.router.navigate(['/lobby']);
        }
      },
    });
  }

  initGame() {
    this.ws.startGame({ juegoId: this.gameId }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMazoUser(){
    this.ws.getMazoPlayer(this.userId,this.gameId).subscribe({
      next: (res) => {
        this.cartasUser= res.cartas;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
}


