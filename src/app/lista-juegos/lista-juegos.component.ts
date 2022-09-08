import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  tablero(){
    this.router.navigate(['/tablero']);
    }

}
