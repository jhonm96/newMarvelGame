import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

constructor() { }

}
// import { HttpClient } from '@angular/common/http';
// import {Injectable} from '@angular/core';
// import {webSocket, WebSocketSubject} from 'rxjs/websocket';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {
// private socket!:WebSocketSubject<unknown>;

//   constructor(private client: HttpClient) { }

//   connect(idGame: string) {
//     this.socket= webSocket("ws://localhost:8081/retrieve/${idGame}")
//     return this.socket;

//   }
//   close() {
//     this.socket.unsubscribe();
//   }
//   crearjuego(){
//       this.client.post('')
//   }
// }
