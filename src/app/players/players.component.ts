import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { AbstractControl, FormControl, FormGroup, NgModel, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { AuthService } from '../modules/auth1/auth.service';
import { v4 as uuidv4, v4 } from 'uuid';
import { GameWsService } from '../services/game-ws.service.service';



@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {

  jugadores!: Usuario[];
  formPlayers!: FormGroup;

  command: any;
  gameId: string;
  principalPlayer: User | null;

  constructor(
    private user:UserService,
    private router: Router,
    private auth: AuthService,
    private gameService: GameWsService) {

    this.formPlayers = new FormGroup({
      jugadores: new FormControl(
        "", [Validators.required, this.jugadoresMinimos]
      )
    });

        this.gameId = v4();

    this.principalPlayer = this.auth.getMyUser();
    this.command = {
      juegoId: this.gameId,
      jugadores: { [this.principalPlayer!.uid]: this.principalPlayer!.displayName },
      jugadorPrincipalId: this.principalPlayer!.uid
    }
  }

  jugadoresMinimos(control: AbstractControl): ValidationErrors | null {
    return control.value.length >= 2 ? null : { erro: "Debe seleccionar minimo dos jugadores" };
  }

  ngOnInit(): void {
    this.user.listar().subscribe({
      next: (res) => this.jugadores = res,
      error: (err) => console.log(err)
    })
  }

  goToCreateGame(): void {

    const jugadoresParaJugar = this.formPlayers.value.jugadores as User[];
    const playersSend = this.generatePlayersCommand(jugadoresParaJugar);
    console.log(playersSend)
    this.command = {
      ...this.command,
      jugadores: { ...this.command.jugadores, ...playersSend }
    }

    this.gameService.create(this.command).subscribe({
      next: (response) => console.log(response),
      error: (response) => console.log(response),
      complete: () => {
        this.router.navigate(['/lobby']);
      }
    })
  }

  private generatePlayersCommand(jugadores: User[]) {
    return jugadores.reduce((previous: any, current: any) => {
      return (previous = {
        ...previous,
        [current.id]: current.nombre,
      });
    }, {});
  }
}

