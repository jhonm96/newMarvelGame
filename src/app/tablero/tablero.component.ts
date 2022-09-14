import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Dashboard } from '../models/dashboard.model';
import { List } from '../models/list.model';
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
  board: Dashboard | null = null;
  isMainPlayer: boolean = false;

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
          this.isMainPlayer = res.jugadorPrincipalId == this.userId;
          this.board = res;
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

}
