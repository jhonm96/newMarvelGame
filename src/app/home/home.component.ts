import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../modules/auth1/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    this.router.navigate(['/players']);
    }
    Juegos(){
      this.router.navigate(['/lobby']);
      }

}
