import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../modules/auth1/auth.service';
import { AllDataBoard } from '../models/all.data.board';
import { List } from '../models/list.model';


@Injectable({
  providedIn: 'root'
})
export class GameWsService {

  private URL_WS: String = "ws://localhost:8081/retrieve";
  private URL_HTTP: String = "http://localhost:8080";
  private webSocket!: WebSocketSubject<unknown>;



  constructor(private http: HttpClient,private auth: AuthService) { }

  start(idGame: string): WebSocketSubject<unknown> {
    this.webSocket = webSocket(`${this.URL_WS}/${idGame}`);
    return this.webSocket;
  }

  close() {
    this.webSocket.closed;
  }

  create(body: any): Observable<object> {
    return this.http.post(`${this.URL_HTTP}/juego/crear`, { ...body });
  }

  getGames(): Observable<object> {
    return this.http.get(`${this.URL_HTTP}/juego/listar/${this.auth.getMyUser()?.uid}`);
  }

  startGame(body: any) {
    return this.http.post(`${this.URL_HTTP}/juego/iniciar`, body);
  }

  getBoard(gameId:string):Observable<AllDataBoard>{
    return this.http.get<AllDataBoard>(`${this.URL_HTTP}/juego/${gameId}`)
  }

  getMazoPlayer(playerId: string, gameId: string): Observable<List> {
    return this.http.get<List>(`${this.URL_HTTP}/juego/mazo/${playerId}/${gameId}`);
  }
}
