import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
listaUsuarios:Array<Usuario>=new Array <Usuario>();
  constructor(private user:UserService,private router:Router) { }

  ngOnInit(): void {
    this.user.listar().subscribe(user => {
      console.log(user);
      this.listaUsuarios=user
    });
  }
  crear(){
    this.router.navigate(['/juegos']);
    }

}
