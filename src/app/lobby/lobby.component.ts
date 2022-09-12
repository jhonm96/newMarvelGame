import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../modules/auth1/auth.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class lobbyComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.auth.logout()
   .then(response => {
   this.router.navigate(['/']);
   })
   .catch(error=> console.log(error))
     }
  crearJuego(){
    this.router.navigate(['/listado']);
    }

}
