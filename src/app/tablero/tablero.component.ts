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
  cartasUser:Card[] = [];
  time:number = 0;
  roundStarted!: boolean;
  roundNumber:any ;
  cardsBoard: Card[] = [];
  gamePlayers: any;
  winnerPlayers: string="";
  thereAWinner: boolean= false;
  roundWinner: any;
  cantPlayers:number = 0;
  cartaApostada:any;
  score:number=0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ws: GameWsService,
    private userService: UserService,
    private router: Router,
    private auth:AuthService
  ) {
    this.userId = this.auth.getMyUser()?.uid!;
  }


  ngOnInit() {

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => {
        this.gameId = id;
        this.getBoardId();
        this.getMazoUser()
        this.ws.startGame({ juegoId: this.gameId }).subscribe({});

        return this.ws.start(id);
      })
      ).subscribe({

        next: (event: any) => {
          console.log({type:event.type, event});

          switch (event.type) {

            case 'cardgame.tiempocambiadodeltablero':
              this.time = event.tiempo;
              if (this.time==3){
                this.apostarCarta(this.cartaApostada.cartaId)
              }
              break;

            case 'cardgame.rondainiciada':
              this.roundStarted = true;
              this.time = event.tiempo;
              this.roundNumber = event.numero;
              break;

            case 'cardgame.ponercartaentablero':
              this.cardsBoard.push({
                cartaId: event.carta.cartaId,
                jugadorId: this.userId,
                estaOculta: event.carta.estaOculta,
                estaHabilitada: event.carta.estaHabilitada,
                poder: event.carta.poder,
                uri: event.carta.uri,
                nombre: event.carta.nombre
              })
              break;

            case 'cardgame.cartaquitadadelmazo':
              this.cartasUser = this.cartasUser
                .filter((item) => item.cartaId !== event.carta.cartaId.uuid)
              break;

            case 'cardgame.rondacreada':
              this.time = event.tiempo;
              this.gamePlayers = event.ronda.jugadores.length
              this.roundNumber = event.ronda.numero;
              break;

            case 'cardgame.juegofinalizado':
              this.winnerPlayers = "Ganador:" + event.alias;
              this.thereAWinner = true;
              this.roundWinner = event.alias;
              alert("Ganador del Juego: " + this.roundWinner)

              //this.router.navigate(['listaJugadores']);

              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 600);
              break;

            case 'cardgame.rondaterminada':
              this.cardsBoard = [];
              this.OcultarCartaTablero();
              break;

            case 'cardgame.cartasasignadasajugador':

              if (event.ganadorId.uuid === this.userId) {
                this.score=this.score+500
                event.cartasApuesta.forEach((carta: any) => {
                  this.cartasUser.push({
                    cartaId: event.cartaId,
                    jugadorId: "",
                    estaOculta: event.estaOculta,
                    estaHabilitada: event.estaHabilitada,
                    poder: event.poder,
                    uri: event.uri,
                    nombre: event.nombre
                  });
                });

                alert("Ganaste papu! siuuuuuuuu!")

              } else alert("Nee ya valiste...")

              break;

          }
        }
      });
  }

  getBoardId() {
    this.ws.getBoard(this.gameId).subscribe({
      next: (res) => {
        if (res) {
          this.board = res;
          console.log(this.board);
          this.cantPlayers=this.board?.ronda.jugadores.length
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

  iniciar() {
    this.ws.iniciarRonda(this.gameId).subscribe({
      next: (ronda) => {
        console.log(ronda);
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('ronda Iniciada')
    });
  }

  MostrarCartaenTablero(){
   document.querySelectorAll(".px2").forEach((element)=>element.classList.add("show"));
    document.querySelectorAll(".card").forEach((element)=>element.classList.add("show1"));
  }

  OcultarCartaTablero(){
    document.querySelectorAll(".px2").forEach((element)=>element.classList.remove("show"));
    document.querySelectorAll(".card").forEach((element)=>element.classList.remove("show1"));
  }

  cartaDeApuesta(idCard: string){
    if(this.cartaApostada==null) {
        this.cartaApostada={
        jugadorId: this.userId,
        cartaId: idCard,
        juegoId: this.gameId
      }
    }
    console.log(this.cartaApostada)
  }

  eliminarCartaDeApuesta(){
    this.cartaApostada= null
    console.log(this.cartaApostada)
  }

  ponerCarta(idCard:string){
    this.MostrarCartaenTablero();
    this.cartaDeApuesta(idCard);
  }

  quitarCarta(){
    this.OcultarCartaTablero()
    this.eliminarCartaDeApuesta()

  }

  apostarCarta(idCard:string){
    const body = {
      jugadorId: this.userId,
      cartaId: idCard,
      juegoId: this.gameId
    }
    this.ws.putUserCardToBoard(body).subscribe({
      next: (res) => { console.log(res); }
    });
  }
}


